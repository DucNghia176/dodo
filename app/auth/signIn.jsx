import { View, Text, Image, StyleSheet, Pressable, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import { TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        let isValid = true;
        if (!email) {
            setEmailError(true);
            isValid = false;
        }
        if (!password) {
            setPasswordError(true);
            isValid = false;
        }
        return isValid;
    };

    const onSignInClick = () => {
        if (!validateInputs()) {
            ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.BOTTOM);
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (resp) => {
                const user = resp.user;
                console.log(user);
                await getUserDetail();
                setLoading(false);
                router.replace('/(tabs)/home');
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                ToastAndroid.show('Email hoặc mật khẩu không đúng', ToastAndroid.BOTTOM);
            });
    };

    const getUserDetail = async () => {
        const result = await getDoc(doc(db, 'users', email));
        console.log(result);
        setUserDetail(result.data());
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "android" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "android" ? 100 : 80}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Image
                    source={require("./../../assets/images/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Chào Mừng Đến Với DoDo</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nhập Email"
                        onChangeText={(value) => {
                            setEmail(value);
                            setEmailError(false);
                        }}
                        onBlur={() => setEmailError(!email)}
                        style={[styles.TextInput, emailError && styles.errorInput]}
                    />
                    {emailError && (
                        <Text style={styles.errorText}>Vui lòng không để trống</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder="Nhập Mật Khẩu"
                            onChangeText={(value) => {
                                setPassword(value);
                                setPasswordError(false);
                            }}
                            onBlur={() => setPasswordError(!password)}
                            secureTextEntry={!showPassword}
                            style={[styles.TextInput, passwordError && styles.errorInput]}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color={Colors.PRIMARY}
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError && (
                        <Text style={styles.errorText}>Vui lòng không để trống</Text>
                    )}
                </View>

                <TouchableOpacity
                    onPress={onSignInClick}
                    disabled={loading}
                    style={styles.button}
                >
                    {!loading ? (
                        <Text style={styles.buttonText}>Đăng Nhập</Text>
                    ) : (
                        <ActivityIndicator size={'large'} color={Colors.WHITE} />
                    )}
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={{ fontFamily: 'outfit' }}>Bạn chưa có tài khoản?</Text>
                    <Pressable onPress={() => router.push('/auth/signUp')}>
                        <Text style={styles.linkText}>Đăng Kí</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 180,
        height: 180,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Inter-bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: 340,
        marginVertical: 10,
    },
    TextInput: {
        borderWidth: 1,
        padding: 15,
        fontSize: 18,
        borderRadius: 8,
        width: '100%',
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Inter',
        marginLeft: 20,
        marginTop: 5,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: 340,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'outfit',
        fontSize: 20,
        color: Colors.WHITE,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 20,
    },
    linkText: {
        color: Colors.PRIMARY,
        fontFamily: 'Inter-bold',
    },
});
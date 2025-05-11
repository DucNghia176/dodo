import { View, Text, Image, StyleSheet, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from '../../context/UserDetailContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswords, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    const validateInputs = () => {
        let isValid = true;
        if (!fullName) {
            setFullNameError(true);
            isValid = false;
        }
        if (!email) {
            setEmailError(true);
            isValid = false;
        }
        if (!password) {
            setPasswordError(true);
            isValid = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordError(true);
            isValid = false;
        }
        return isValid;
    };

    const CreateNewAccount = () => {
        if (!validateInputs()) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (resp) => {
                const user = resp.user;
                console.log(user);
                await SaveUser(user);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const SaveUser = async (user) => {
        try {
            const data = {
                name: fullName,
                email: email,
                member: false,
                uid: user?.uid,
            };
            await setDoc(doc(db, "users", email), data);
            setUserDetail(data);
            router.push("/auth/signIn");
        } catch (error) {
            console.error("Lỗi khi lưu người dùng:", error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80} // Điều chỉnh offset
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <Image
                    source={require("./../../assets/images/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.title}>Tạo Tài Khoản Mới</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nhập Họ Và Tên"
                        onChangeText={(value) => {
                            setFullName(value);
                            setFullNameError(false);
                        }}
                        onBlur={() => setFullNameError(!fullName)}
                        style={[styles.TextInput, fullNameError && styles.errorInput]}
                    />
                    {fullNameError && (
                        <Text style={styles.errorText}>Vui lòng không để trống</Text>
                    )}
                </View>

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

                <View style={styles.inputContainer}>
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            placeholder="Nhập Lại Mật Khẩu"
                            onChangeText={(value) => {
                                setConfirmPassword(value);
                                setConfirmPasswordError(false);
                            }}
                            onBlur={() => setConfirmPasswordError(!confirmPassword)}
                            secureTextEntry={!showConfirmPassword}
                            style={[styles.TextInput, confirmPasswordError && styles.errorInput]}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showConfirmPassword ? "eye-off" : "eye"}
                                size={24}
                                color={Colors.PRIMARY}
                            />
                        </TouchableOpacity>
                    </View>
                    {confirmPasswordError && (
                        <Text style={styles.errorText}>Vui lòng không để trống</Text>
                    )}
                </View>

                <TouchableOpacity
                    onPress={CreateNewAccount}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Tạo Tài Khoản</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={{ fontFamily: 'Inter' }}>Bạn đã có tài khoản?</Text>
                    <Pressable onPress={() => router.push('/auth/signIn')}>
                        <Text style={styles.linkText}>Đăng Nhập</Text>
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
        justifyContent: 'center', // Căn giữa theo chiều dọc
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
        fontFamily: 'Inter',
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
import { View, Text, Image, StyleSheet, Pressable, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constants/Colors"; // Cập nhật đường dẫn
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; // Cập nhật đường dẫn
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext"; // Cập nhật đường dẫn
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from "../../config/firebaseConfig";

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
        <View
            style={{
                display: 'flex',
                alignItems: "center",
                paddingTop: 100,
                flex: 1,
                backgroundColor: Colors.WHITE
            }}
        >
            <Image
                source={require("./../../assets/images/logo.png")}
                style={{
                    width: 180,
                    height: 180,
                }}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "outfit-bold"
                }}
            >Chào Mừng Đến Với DoDo</Text>

            <View style={{ width: 340, marginTop: 20 }}>
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

            <View style={{ width: 340, marginTop: 20 }}>
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
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    width: 340,
                    marginTop: 25,
                    borderRadius: 10
                }}
            >
                {!loading ? (
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 20,
                        color: Colors.WHITE,
                        textAlign: 'center'
                    }}>Đăng Nhập</Text>
                ) : (
                    <ActivityIndicator size={'large'} color={Colors.WHITE} />
                )}
            </TouchableOpacity>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginTop: 20
            }}>
                <Text style={{ fontFamily: 'outfit' }}>Bạn chưa có tài khoản?</Text>
                <Pressable
                    onPress={() => router.push('/auth/signUp')}
                >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>Đăng Kí</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextInput: {
        borderWidth: 1,
        width: 340,
        padding: 15,
        fontSize: 18,
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 2
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'outfit',
        marginLeft: 20,
        marginTop: 5
    },
    eyeIcon: {
        position: 'absolute',
        right: 30,
        top: 18
    }
});
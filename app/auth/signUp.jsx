import { View, Text, Image, StyleSheet, Pressable, TextInput, TouchableOpacity } from "react-native";
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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext); // Fixed context usage

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
            >Tạo Tài Khoản Mới</Text>

            <View style={{ width: 340, marginTop: 20 }}>
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

            <View style={{ width: 340, marginTop: 20 }}>
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
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    width: 340,
                    marginTop: 25,
                    borderRadius: 10
                }}
            >
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.WHITE,
                    textAlign: 'center'
                }}>Tạo Tài Khoản</Text>
            </TouchableOpacity>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginTop: 20
            }}>
                <Text style={{ fontFamily: 'outfit' }}>Bạn đã có tài khoản?</Text>
                <Pressable
                    onPress={() => router.push('/auth/signIn')}
                >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>Đăng Nhập</Text>
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
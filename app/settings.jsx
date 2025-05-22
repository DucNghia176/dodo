import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserDetailContext } from '../context/UserDetailContext';
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export default function Settings() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const [name, setName] = useState(userDetail?.name || '');
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveProfile = async () => {
        try {
            // Cập nhật tên trong Firestore
            const userRef = doc(db, 'Users', userDetail.uid);
            await updateDoc(userRef, {
                name: name
            });

            // Cập nhật context
            setUserDetail(prev => ({
                ...prev,
                name: name
            }));

            setIsEditing(false);
            Alert.alert('Thành công', 'Tên đã được cập nhật');
        } catch (error) {
            console.error("Error updating name:", error);
            Alert.alert('Lỗi', 'Không thể cập nhật tên. Vui lòng thử lại sau');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        try {
            // Xác thực lại người dùng trước khi đổi mật khẩu
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Đổi mật khẩu
            await updatePassword(auth.currentUser, newPassword);

            Alert.alert('Thành công', 'Mật khẩu đã được thay đổi');
            setIsChangingPassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error changing password:", error);
            if (error.code === 'auth/wrong-password') {
                Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng');
            } else {
                Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu. Vui lòng thử lại sau');
            }
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            <View style={{ padding: 20 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                    <Text style={{
                        marginLeft: 15,
                        fontSize: 24,
                        fontFamily: 'Inter-bold'
                    }}>Cài đặt</Text>
                </View>

                {/* Thông tin cá nhân */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Inter-bold',
                        marginBottom: 15
                    }}>Thông tin cá nhân</Text>

                    <View style={{
                        backgroundColor: Colors.BG_GRAY,
                        padding: 15,
                        borderRadius: 10
                    }}>
                        {isEditing ? (
                            <View>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Colors.BLUE,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={handleSaveProfile}
                                    style={{
                                        backgroundColor: Colors.BLUE,
                                        padding: 10,
                                        borderRadius: 5,
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={{ color: Colors.WHITE }}>Lưu</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text style={{ fontSize: 16 }}>Tên: {userDetail?.name}</Text>
                                <Text style={{ fontSize: 16, marginTop: 5 }}>Email: {userDetail?.email}</Text>
                                <TouchableOpacity
                                    onPress={() => setIsEditing(true)}
                                    style={{
                                        backgroundColor: Colors.BLUE,
                                        padding: 10,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                        marginTop: 10
                                    }}
                                >
                                    <Text style={{ color: Colors.WHITE }}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {/* Đổi mật khẩu */}
                <View style={{ marginBottom: 30 }}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Inter-bold',
                        marginBottom: 15
                    }}>Đổi mật khẩu</Text>

                    <View style={{
                        backgroundColor: Colors.BG_GRAY,
                        padding: 15,
                        borderRadius: 10
                    }}>
                        {isChangingPassword ? (
                            <View>
                                <TextInput
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    placeholder="Mật khẩu hiện tại"
                                    secureTextEntry
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Colors.BLUE,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10
                                    }}
                                />
                                <TextInput
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    placeholder="Mật khẩu mới"
                                    secureTextEntry
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Colors.BLUE,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10
                                    }}
                                />
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Xác nhận mật khẩu mới"
                                    secureTextEntry
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Colors.BLUE,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 10
                                    }}
                                />
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <TouchableOpacity
                                        onPress={handleChangePassword}
                                        style={{
                                            flex: 1,
                                            backgroundColor: Colors.BLUE,
                                            padding: 10,
                                            borderRadius: 5,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ color: Colors.WHITE }}>Lưu</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsChangingPassword(false);
                                            setCurrentPassword('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                        }}
                                        style={{
                                            flex: 1,
                                            backgroundColor: Colors.GRAY,
                                            padding: 10,
                                            borderRadius: 5,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ color: Colors.WHITE }}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setIsChangingPassword(true)}
                                style={{
                                    backgroundColor: Colors.BLUE,
                                    padding: 10,
                                    borderRadius: 5,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{ color: Colors.WHITE }}>Đổi mật khẩu</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Inter-bold',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Inter-bold',
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingInfo: {
        flex: 1,
        marginRight: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontFamily: 'Inter',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: '#666',
    },
}); 
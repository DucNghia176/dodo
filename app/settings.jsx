import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserDetailContext } from '../context/UserDetailContext';
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Settings() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const [name, setName] = useState(userDetail?.name || '');
    const [isEditing, setIsEditing] = useState(false);

    const themeColors = [
        { name: 'Xanh dương', color: '#007AFF' },
        { name: 'Tím', color: '#5856D6' },
        { name: 'Hồng', color: '#FF2D55' },
        { name: 'Cam', color: '#FF9500' },
        { name: 'Xanh lá', color: '#34C759' },
    ];

    const handleSaveProfile = () => {
        setUserDetail(prev => ({
            ...prev,
            name: name
        }));
        setIsEditing(false);
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

                {/* Màu nền */}
                <View>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: 'Inter-bold',
                        marginBottom: 15
                    }}>Màu nền</Text>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10
                    }}>
                        {themeColors.map((theme, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: theme.color,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: Colors.WHITE,
                                    fontFamily: 'Inter-bold'
                                }}>{theme.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
} 
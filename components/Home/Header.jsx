import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from '../../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const router = useRouter();

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 25,
                    color: Colors.WHITE
                }}>Xin chào, {userDetail?.name}</Text>
                <Text style={{
                    fontFamily: 'Inter',
                    fontSize: 17,
                    color: Colors.WHITE
                }}>Bạn đã sẵn sàng chưa?</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/settings')}>
                <Ionicons name="settings-outline" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
        </View>
    )
}
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from '../../context/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';


export default function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
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
            <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
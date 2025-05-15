import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Tabs, useRouter } from "expo-router";
import { UserDetailContext } from "../../context/UserDetailContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export default function Profile() {
    const route = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const onMenuClick = (menu) => {
        if (menu.name == 'Logout') {
            signOut(auth).then(() => {
                setUserDetail(null)
                route.push('/');
            }).catch((error) => {

            });
        }
        else {
            route.push(menu.path)
        }
    }
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}
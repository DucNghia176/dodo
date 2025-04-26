import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false
        }}>
            <Tabs.Screen name="home"
                options={{
                    tabBarIcon: ({ color, size }) => <AntDesign name="home" size={24} color="black" />,
                    tabBarLabel: 'Trang chủ'
                }}
            />
            <Tabs.Screen name="explore"
                options={{
                    tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={24} color="black" />,
                    tabBarLabel: 'Khám phá'
                }}
            />
            <Tabs.Screen name="progress"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="analytics" size={24} color="black" />,
                    tabBarLabel: 'Tiến độ'
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={24} color="black" />,
                    tabBarLabel: ' Hồ sơ'
                }}
            />
        </Tabs>
    )

}
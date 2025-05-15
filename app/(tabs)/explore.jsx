import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { CourseCategory } from "../../constants/Option";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";

export default function Explore() {
    return (
        <FlatList data={[]}
            style={{
                flex: 1,
                backgroundColor: Colors.WHITE,
            }}
            ListHeaderComponent={
                <View style={{
                    padding: 25,
                    backgroundColor: Colors.WHITE,
                    height: '100%'
                }} >
                    <Text style={{
                        fontFamily: 'Inter-bold',
                        fontSize: 30,
                    }}>Khám phá khóa học</Text>

                    {CourseCategory.map((item, index) => (
                        <View key={index} style={{
                            marginTop: 10
                        }}>
                            {/* <Text style={{
                        fontFamily: 'Inter-bold',
                        fontSize: 20
                    }}>{item}</Text> */}
                            <CourseListByCategory category={item} />
                        </View>
                    ))}
                </View>} />
    )
}
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../components/CourseView/Intro';
import Colors from '../../constants/Colors';
import Chapters from '../../components/CourseView/Chapters';

export default function CourseView() {
    const { courseParams } = useLocalSearchParams();

    let course;
    try {
        console.log("Nhận được courseParams:", courseParams); // Ghi log để gỡ lỗi
        course = JSON.parse(courseParams);
    } catch (error) {
        console.error("Lỗi khi phân tích courseParams:", error, "Nhận được:", courseParams);
        return (
            <View style={{ flex: 1, padding: 20, backgroundColor: Colors.WHITE }}>
                <Text>Lỗi khi tải dữ liệu khóa học. Vui lòng thử lại.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                    <Intro course={course} />
                    <Chapters course={course} />
                </View>
            }
        />
    );
}
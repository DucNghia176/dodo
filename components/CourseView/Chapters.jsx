import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Chapters({ course }) {
    const router = useRouter();

    const isChapterComplete = (index) => {
        // Kiểm tra course và completeChapter có tồn tại và là mảng
        if (!course || !Array.isArray(course.completeChapter)) {
            return false;
        }
        return course.completeChapter.find(item => item === index) !== undefined;
    };

    // Kiểm tra course và chapters trước khi render FlatList
    if (!course || !Array.isArray(course.chapters)) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'Inter-bold', fontSize: 25 }}>Chương</Text>
                <Text>Đang tải hoặc không có dữ liệu</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'Inter-bold', fontSize: 25 }}>Chương</Text>

            <FlatList
                data={course.chapters}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log(item);
                            router.push({
                                pathname: '/ChapterView',
                                params: {
                                    chapterParams: JSON.stringify(item),
                                    docId: course?.docId,
                                    chapterIndex: index,
                                },
                            });
                        }}
                        style={{
                            padding: 18,
                            borderWidth: 0.5,
                            borderRadius: 15,
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text style={styles.chapterText}>{index + 1}</Text>
                            <Text style={styles.chapterText}>{item?.chapterName || 'Không có tên'}</Text>
                        </View>
                        {isChapterComplete(index) ? (
                            <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
                        ) : (
                            <Ionicons name="play" size={24} color={Colors.PRIMARY} />
                        )}
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    chapterText: {
        fontFamily: 'Inter',
        fontSize: 20,
    },
});
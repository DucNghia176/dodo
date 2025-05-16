import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Chapters({ course }) {
    const router = useRouter();
    const [courseData, setCourseData] = useState(course);

    useEffect(() => {
        if (course?.docId) {
            const unsubscribe = onSnapshot(doc(db, 'Courses', course.docId), (doc) => {
                if (doc.exists()) {
                    setCourseData(doc.data());
                }
            });

            return () => unsubscribe();
        }
    }, [course?.docId]);

    const isChapterComplete = (index) => {
        if (!courseData || !Array.isArray(courseData.completeChapter)) {
            return false;
        }
        return courseData.completeChapter.includes(index);
    };

    // Kiểm tra courseData và chapters trước khi render FlatList
    if (!courseData || !Array.isArray(courseData.chapters)) {
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
                data={courseData.chapters}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname: '/ChapterView',
                                params: {
                                    chapterParams: JSON.stringify(item),
                                    docId: courseData?.docId,
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
                        <View style={{ flexDirection: 'row', gap: 10, flex: 1, alignItems: 'center' }}>
                            <Text style={styles.chapterText}>{index + 1}</Text>
                            <Text
                                style={[styles.chapterText, { flex: 1, flexWrap: 'wrap' }]}
                            >
                                {item?.chapterName || 'Không có tên'}
                            </Text>
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
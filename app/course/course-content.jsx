import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserDetailContext } from '../../context/UserDetailContext';
import * as Progress from 'react-native-progress';

export default function CourseContent() {
    const router = useRouter();
    const { courseParams } = useLocalSearchParams();
    const { userDetail } = useContext(UserDetailContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (courseParams) {
            setCourse(JSON.parse(courseParams));
        }
    }, [courseParams]);

    const getProgress = (chapter) => {
        if (!chapter?.lessons || chapter.lessons.length === 0) {
            return 0;
        }
        const uniqueCompletedLessons = [...new Set(chapter?.completeLesson || [])];
        const completedLessonCount = Math.min(uniqueCompletedLessons.length, chapter.lessons.length);
        return completedLessonCount / chapter.lessons.length;
    };

    const handleChapterPress = (chapter) => {
        router.push({
            pathname: '/chapterView/' + chapter.id,
            params: {
                chapterParams: JSON.stringify(chapter)
            }
        });
    };

    if (!course) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{course.courseTitle}</Text>
            </View>

            <ScrollView style={styles.content}>
                {course.chapters && course.chapters.length > 0 ? (
                    course.chapters.map((chapter, index) => (
                        <TouchableOpacity
                            key={chapter.id}
                            style={styles.chapterCard}
                            onPress={() => handleChapterPress(chapter)}
                        >
                            <View style={styles.chapterInfo}>
                                <Text style={styles.chapterTitle}>
                                    Chương {index + 1}: {chapter.title}
                                </Text>
                                <View style={styles.progressContainer}>
                                    <Progress.Bar
                                        progress={getProgress(chapter)}
                                        width={200}
                                        color={Colors.PRIMARY}
                                        height={8}
                                        borderRadius={4}
                                    />
                                    <Text style={styles.progressText}>
                                        {Math.min([...new Set(chapter?.completeLesson || [])].length, chapter?.lessons?.length || 0)}/{chapter?.lessons?.length || 0} Bài học
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={Colors.GRAY} />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noChapters}>Không có chương nào trong khóa học này</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BG_GRAY,
        backgroundColor: Colors.WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BLACK,
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    chapterCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.BG_GRAY,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    chapterInfo: {
        flex: 1,
        marginRight: 16,
    },
    chapterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    progressContainer: {
        marginTop: 8,
    },
    progressText: {
        fontSize: 14,
        color: Colors.GRAY,
        marginTop: 4,
    },
    noChapters: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.GRAY,
        marginTop: 20,
    },
}); 
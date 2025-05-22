import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserDetailContext } from '../../context/UserDetailContext';
import * as Progress from 'react-native-progress';
import { imageAssets } from '../../constants/Option';

export default function MyCourse() {
    const router = useRouter();
    const { userDetail } = useContext(UserDetailContext);
    const [courses, setCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userDetail) {
            fetchCourses();
        }
    }, [userDetail]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, 'Courses'),
                where("createdBy", '==', userDetail?.email)
            );
            const querySnapshot = await getDocs(q);
            const coursesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const groupedCourses = coursesList.reduce((acc, course) => {
                const category = course.category || 'Khác';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(course);
                return acc;
            }, {});

            setCourses(groupedCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
    };

    const handleCoursePress = (course) => {
        router.push({
            pathname: '/courseView/' + course.id,
            params: {
                courseParams: JSON.stringify(course)
            }
        });
    };

    const handleDeleteCourse = async (courseId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa khóa học này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'Courses', courseId));
                            // Refresh course list after deletion
                            fetchCourses();
                        } catch (error) {
                            console.error('Error deleting course:', error);
                            Alert.alert("Lỗi", "Không thể xóa khóa học. Vui lòng thử lại.");
                        }
                    }
                }
            ]
        );
    };

    const getProgress = (course) => {
        if (!course?.chapters || course.chapters.length === 0) {
            return 0;
        }
        const uniqueCompletedChapters = [...new Set(course?.completeChapter || [])];
        const completedChapterCount = Math.min(uniqueCompletedChapters.length, course.chapters.length);
        return completedChapterCount / course.chapters.length;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {selectedCategory ? (
                    <TouchableOpacity
                        onPress={() => setSelectedCategory(null)}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>
                    {selectedCategory ? selectedCategory : 'Khóa học của tôi'}
                </Text>
            </View>

            <ScrollView style={styles.content}>
                {!selectedCategory ? (
                    // Show categories
                    Object.keys(courses).length > 0 ? (
                        Object.entries(courses).map(([category, categoryCourses]) => (
                            <TouchableOpacity
                                key={category}
                                style={styles.categoryCard}
                                onPress={() => handleCategoryPress(category)}
                            >
                                <View style={styles.categoryInfo}>
                                    <Text style={styles.categoryTitle}>{category}</Text>
                                    <Text style={styles.courseCount}>
                                        {categoryCourses.length} khóa học
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color={Colors.GRAY} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noCourses}>Không có khóa học nào</Text>
                    )
                ) : (
                    // Show courses in selected category
                    courses[selectedCategory]?.length > 0 ? (
                        courses[selectedCategory].map((course) => (
                            <TouchableOpacity
                                key={course.id}
                                style={styles.courseCard}
                                onPress={() => handleCoursePress(course)}
                            >
                                <Image
                                    source={imageAssets[course.banner_image]}
                                    style={styles.courseImage}
                                />
                                <View style={styles.courseInfo}>
                                    <Text style={styles.courseTitle}>{course.courseTitle}</Text>
                                    <View style={styles.progressContainer}>
                                        <Progress.Bar
                                            progress={getProgress(course)}
                                            width={200}
                                            color={Colors.PRIMARY}
                                            height={8}
                                            borderRadius={4}
                                        />
                                        <Text style={styles.progressText}>
                                            {Math.min([...new Set(course?.completeChapter || [])].length, course?.chapters?.length || 0)}/{course?.chapters?.length || 0} Chương
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleDeleteCourse(course.id)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="trash-outline" size={24} color={Colors.RED} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noCourses}>Không có khóa học nào trong danh mục này</Text>
                    )
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
    categoryCard: {
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
    categoryInfo: {
        flex: 1,
        marginRight: 16,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.BLACK,
        marginBottom: 4,
    },
    courseCount: {
        fontSize: 14,
        color: Colors.GRAY,
    },
    courseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BG_GRAY,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    courseImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    courseInfo: {
        flex: 1,
        marginRight: 8,
    },
    courseTitle: {
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
    noCourses: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.GRAY,
        marginTop: 20,
    },
    deleteButton: {
        padding: 8,
    },
}); 
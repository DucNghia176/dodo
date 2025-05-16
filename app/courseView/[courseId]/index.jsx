import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import Colors from '../../../constants/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { db } from './../../../config/firebaseConfig'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function CourseView() {
    const { courseParams, courseId, enroll } = useLocalSearchParams();
    const [course, setCourse] = useState([]);
    const router = useRouter();

    useEffect(() => {
        let unsubscribe;

        if (!courseParams) {
            // Subscribe to real-time updates
            unsubscribe = onSnapshot(doc(db, 'Courses', courseId), (doc) => {
                if (doc.exists()) {
                    setCourse(doc.data());
                }
            });
        } else {
            setCourse(JSON.parse(courseParams));
        }

        // Cleanup subscription
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [courseId]);

    return course && (
        <FlatList
            data={[]}
            ListHeaderComponent={
                <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                    <Intro course={course} enroll={enroll} />
                    <Chapters course={course} />
                </View>
            }
        />
    );
}
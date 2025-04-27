import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Intro from '../../../components/CourseView/Intro';
import Colors from '../../../constants/Colors';
import Chapters from '../../../components/CourseView/Chapters';
import { db } from './../../../config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore';

export default function CourseView() {
    const { courseParams, courseId } = useLocalSearchParams();
    const [course, setCourse] = useState([]);
    // let course;
    // course = JSON.parse(courseParams);

    useEffect(() => {
        if (!courseParams) {
            GetCourseById();
        }
        else {
            setCourse(JSON.parse(courseParams));
        }
    }, [courseId])

    const GetCourseById = async () => {
        const docRef = await getDoc(doc(db, 'Courses', courseId))
        const courseData = docRef.data();
        setCourse(courseData)
    }
    console.log(courseId);
    return course && (
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
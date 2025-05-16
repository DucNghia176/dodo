import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PracticeOption } from '../../../constants/Option';
import Colors from '../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from './../../../config/firebaseConfig';
import { collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { UserDetailContext } from './../../../context/UserDetailContext'
import CourseListGrid from '../../../components/PractiveScreen/CourseListGrid';

export default function PracticeType() {
    const { type } = useLocalSearchParams();
    const option = PracticeOption.find(item => item.name == type);
    console.log('=== DEBUG PracticeType ===');
    console.log('Type:', type);
    console.log('Option:', option);
    const router = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    console.log('UserDetail:', userDetail);
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered, userDetail:', userDetail);
        userDetail && GetCourseList();
    }, [userDetail])

    const GetCourseList = async () => {
        console.log('GetCourseList started');
        setLoading(true);
        setCourseList([]);
        try {
            const q = query(collection(db, 'Courses'),
                where('createBy', '==', userDetail?.email),
                orderBy('createdOn', 'desc'));
            console.log('Query created with email:', userDetail?.email);

            const querySnapshot = await getDocs(q);
            console.log('Query snapshot size:', querySnapshot.size);

            querySnapshot.forEach((doc) => {
                console.log('Course data:', doc.data());
                setCourseList(prev => [...prev, doc.data()]);
            });
            setLoading(false);
        } catch (e) {
            console.log('Error in GetCourseList:', e);
            setLoading(false);
        }
    }

    return (
        <View>
            <Image source={option.image}
                style={{
                    height: 200,
                    width: '100%'
                }}
            />
            <View style={{
                position: 'absolute',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black"
                        style={{
                            backgroundColor: Colors.WHITE,
                            padding: 8,
                            borderRadius: 10
                        }}
                    /></Pressable>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 25,
                    color: Colors.WHITE
                }}>{type}</Text>
            </View>
            {loading && <ActivityIndicator size={'large'}
                style={{
                    marginTop: 150,
                }}
                color={Colors.PRIMARY} />}
            <CourseListGrid courseList={courseList}
                option={option}
            />
        </View>
    )
}
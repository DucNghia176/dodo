import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { imageAssets } from '../../constants/Option'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Button from '../Shared/Button'
import { router, useRouter } from 'expo-router'
import { UserDetailContext } from './../../context/UserDetailContext'
import { doc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'

export default function Intro({ course, enroll }) {

    const route = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        const docId = Date.now().toString();
        setLoading(true);
        const data = {
            ...course,
            createdBy: userDetail?.email,
            createdOn: new Date(),
            enrolled: true
        }
        await setDoc(doc(db, 'Courses', docId), data)
        route.push({
            pathname: '/courseView/' + docId,
            params: {
                courseParams: JSON.stringify(data),
                enroll: false
            }
        })
        setLoading(false);
    }
    return (
        <View>

            <Image source={imageAssets[course?.banner_image]}
                style={{
                    width: '100%',
                    height: 280
                }}
            />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 25
                }}>{course?.courseTitle}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    marginTop: 5
                }}>
                    <Ionicons name="book-outline" size={24} color="black" />
                    <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 18
                    }}>
                        {course?.chapters?.length} Chương</Text>
                </View>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 20,
                    marginTop: 10
                }}>Mô Tả:</Text>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 18,
                    color: Colors.GRAY
                }}>{course?.description}</Text>
                {enroll == 'true' ? <Button text="Đăng ký ngay"
                    loading={loading}
                    onPress={() => onEnrollCourse()}
                /> :
                    <Button text={'Bắt đầu ngay'}
                        onPress={() => console.log('')} />}
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 10
            }} onPress={() => router.back()
                // replace('/(tabs)/home')
            }>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>

        </View>
    )
}
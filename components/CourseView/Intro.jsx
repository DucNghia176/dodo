import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { imageAssets } from '../../constants/Option'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Button from '../Shared/Button'
import { router, useRouter } from 'expo-router'
import { UserDetailContext } from './../../context/UserDetailContext'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'

export default function Intro({ course, enroll }) {
    const route = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const [loading, setLoading] = useState(false);

    const onEnrollCourse = async () => {
        try {
            setLoading(true);
            const docId = Date.now().toString();
            const data = {
                ...course,
                createdBy: userDetail?.email,
                createdOn: new Date(),
                enrolled: true,
                completeChapter: []
            }

            await setDoc(doc(db, 'Courses', docId), data);

            const updatedDoc = await getDoc(doc(db, 'Courses', docId));
            const updatedData = updatedDoc.data();

            route.push({
                pathname: '/courseView/' + docId,
                params: {
                    courseParams: JSON.stringify(updatedData),
                    enroll: false
                }
            });
        } catch (error) {
            console.error("Error enrolling course:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <View style={{ position: 'relative' }}>
                <Image
                    source={imageAssets[course?.banner_image]}
                    style={{
                        width: '100%',
                        height: 280
                    }}
                />
                <Pressable
                    style={{
                        position: 'absolute',
                        top: 40,
                        left: 20,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 20,
                        padding: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
                </Pressable>
            </View>

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
                {enroll == 'true' ?
                    <Button
                        text="Đăng ký ngay"
                        loading={loading}
                        onPress={() => onEnrollCourse()}
                    /> :
                    <Button
                        text={'Bắt đầu ngay'}
                        onPress={() => console.log('')}
                    />
                }
            </View>
        </View>
    )
}
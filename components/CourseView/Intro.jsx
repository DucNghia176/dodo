import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Button from '../Shared/Button'
import { router, useRouter } from 'expo-router'

export default function Intro({ course }) {

    const route = useRouter();
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

                <Button text={'Bắt đầu ngay'}
                    onPress={() => console.log('')} />
            </View>
            <Pressable style={{
                position: 'absolute',
                padding: 10
            }} onPress={() => router.replace('/(tabs)/home')}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>

        </View>
    )
}
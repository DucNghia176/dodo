import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Shared/Button'
import { useRouter } from 'expo-router'

export default function NoCourse() {
    const router = useRouter();
    return (
        <View style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center'
        }}>
            <Image source={require('../../assets/images/book.png')}
                style={{
                    height: 200,
                    width: 200
                }}
            />
            <Text style={{
                fontFamily: 'Inter-bold',
                fontSize: 25,
                textAlign: 'center'
            }}>Bạn chưa có khóa học nào</Text>

            <Button text={'+ Tạo khóa học mới'} onPress={() => router.push('/addCourse')} />
            <Button text={'Khám phá khóa học hiện có'}
                type='outline'
                onPress={() => router.push('/(tabs)/explore')}
            />
        </View>
    )
}
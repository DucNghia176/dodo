import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { PracticeOption } from '../../constants/Option'
import Colors from '../../constants/Colors'
import { Touchable } from 'react-native'
import { useRouter } from 'expo-router'

export default function PraticeSection() {
    const router = useRouter();
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'Inter-bold',
                fontSize: 25
            }}>Luyện Tập</Text>

            <View>
                <FlatList
                    data={PracticeOption}
                    numColumns={3}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => router.push('/practice/' + item.name)} key={index}
                            style={{
                                flex: 1,
                                margin: 5,
                                aspectRatio: 1
                            }}
                        >
                            <Image source={item?.image} style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: 160,
                                borderRadius: 15,
                                flex: 1
                            }} />

                            <Text style={{
                                position: 'absolute',
                                padding: 15,
                                fontFamily: 'Inter',
                                fontSize: 15,
                                color: Colors.WHITE
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}
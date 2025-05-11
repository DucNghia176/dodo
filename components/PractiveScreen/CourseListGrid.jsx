import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function CourseListGrid({ courseList, option }) {
    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({ item, index }) => (
                    <View key={index}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 15,
                            backgroundColor: Colors.WHITE,
                            margin: 7,
                            borderRadius: 15
                        }}
                    >
                        <Image source={option.icon}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: 'contain'
                            }}
                        />
                        <Text>{item.courseTitle}</Text>
                    </View>
                )}

            />
        </View>
    )
}
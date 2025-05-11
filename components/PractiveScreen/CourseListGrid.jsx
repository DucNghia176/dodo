import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

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
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image source={option?.icon}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: 'contain'
                            }}
                        />
                    </View>
                )}
            />
        </View>
    )
}
import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function CourseList({ courseList }) {
    return (
        <View style={{
            marginTop: 15
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>CourseList</Text>

            <FlatList
                data={courseList}
                renderItem={({ item, index }) => {
                    <View key={index}>
                        <Text>{item?.courseTitle}</Text>
                    </View>
                }}
            />
        </View>
    )
}
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { imageAssets } from '../../constants/Option';
import Colors from '../../constants/Colors';
import CourseProgressCard from '../Shared/CourseProgressCard';

export default function CourseProgress({ courseList }) {


    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'Inter-bold',
                fontSize: 25,
                color: Colors.WHITE
            }}>Tiến độ</Text>

            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <CourseProgressCard item={item} />
                    </View>
                )}
            />
        </View>
    );
}
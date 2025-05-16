import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function CourseListGrid({ courseList, option }) {
    console.log('=== DEBUG CourseListGrid ===');
    console.log('Full option object:', JSON.stringify(option, null, 2));
    console.log('CourseList length:', courseList?.length);
    console.log('First course item:', courseList?.[0]);

    return (
        <View>
            <FlatList
                data={courseList}
                numColumns={2}
                style={{
                    padding: 20
                }}
                renderItem={({ item, index }) => {
                    console.log(`Rendering item ${index}:`, JSON.stringify(item, null, 2));
                    return (
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
                            {option?.icon && (
                                <Image
                                    source={option.icon}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: 'contain'
                                    }}
                                    onError={(error) => console.log('Image loading error:', error.nativeEvent)}
                                />
                            )}
                            <Text>{item.courseTitle}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}
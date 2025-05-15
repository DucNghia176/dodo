import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CourseList({ courseList, heading = 'Khóa Học', enroll = false }) {

    const route = useRouter();
    return (
        <View style={{
            marginTop: 15
        }}>
            <Text style={{
                fontFamily: 'Inter-bold',
                fontSize: 25
            }}>{heading}</Text>

            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => route.push({
                            pathname: '/courseView/' + item?.docId,
                            params: {
                                courseParams: JSON.stringify(item),
                                enroll: enroll
                            }
                        })}
                        key={index} style={styles.courseContainer}>
                        <Image source={imageAssets[item.banner_image]}
                            style={{
                                width: '100%',
                                height: 150,
                                borderRadius: 15
                            }}
                        />
                        <Text style={{
                            fontFamily: 'Inter-bold',
                            fontSize: 18,
                            marginTop: 10
                        }}>{item?.courseTitle}</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Ionicons name="book-outline" size={24} color={Colors.BLUE} />
                            <Text style={{
                                fontFamily: 'Inter',
                                color: Colors.BLUE,
                            }}>
                                {item?.chapters?.length} Chương</Text>
                        </View>
                    </TouchableOpacity>
                )
                }
            />
        </View >
    )
}

const styles = StyleSheet.create({
    courseContainer: {
        padding: 10,
        backgroundColor: Colors.BG_GRAY,
        margin: 6,
        borderRadius: 15,
        width: 260,
        elevation: 1,
        borderWidth: 0.2
    }
})
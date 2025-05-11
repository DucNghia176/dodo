import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { imageAssets } from '../../constants/Option';
import Colors from '../../constants/Colors';
import * as Progress from 'react-native-progress';

export default function CourseProgress({ courseList }) {
    const GetCompletedChapters = (course) => {
        if (!course?.chapters || course.chapters.length === 0) {
            return 0;
        }
        // Loại bỏ các chapter hoàn thành trùng lặp
        const uniqueCompletedChapters = [...new Set(course?.completeChapter || [])];
        // Đảm bảo số chương hoàn thành không vượt quá tổng số chương
        const completedChapterCount = Math.min(uniqueCompletedChapters.length, course.chapters.length);
        const perc = completedChapterCount / course.chapters.length;
        return perc;
    };

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
                    <View style={{
                        margin: 7,
                        padding: 7,
                        backgroundColor: Colors.BG_GRAY,
                        borderRadius: 8,
                        width: 280
                    }}>
                        <View key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 8
                            }}>
                            <Image source={imageAssets[item?.banner_image]}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 8
                                }} />
                            <View style={{
                                flex: 1
                            }}>
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontFamily: 'Inter-bold',
                                        fontSize: 19,
                                        flexWrap: 'wrap'
                                    }}>{item?.courseTitle}</Text>
                                <Text style={{
                                    fontFamily: 'Inter',
                                    fontSize: 15
                                }}>{item?.chapters?.length} Chương</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <Progress.Bar progress={GetCompletedChapters(item)} width={250} />
                            <Text style={{
                                fontFamily: 'Inter',
                                marginTop: 2
                            }}>
                                {Math.min([...new Set(item?.completeChapter || [])].length, item?.chapters?.length || 0)}/{item?.chapters?.length || 0} Chương đã hoàn thành
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
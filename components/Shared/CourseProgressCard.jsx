import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import * as Progress from 'react-native-progress';
import { imageAssets } from '../../constants/Option';

export default function CourseProgressCard({ item, width = 280 }) {
    const GetCompletedChapters = (course) => {
        if (!course?.chapters || course.chapters.length === 0) {
            return 0;
        }
        const uniqueCompletedChapters = [...new Set(course?.completeChapter || [])];
        const completedChapterCount = Math.min(uniqueCompletedChapters.length, course.chapters.length);
        const perc = completedChapterCount / course.chapters.length;
        return perc;
    };

    return (
        <View style={{
            margin: 7,
            padding: 7,
            backgroundColor: Colors.BG_GRAY,
            borderRadius: 8,
            width: width
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8
            }}>
                <Image
                    source={imageAssets[item?.banner_image]}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8
                    }}
                />
                <View style={{
                    flex: 1
                }}>
                    <Text
                        numberOfLines={3}
                        style={{
                            fontFamily: 'Inter-bold',
                            fontSize: 19,
                            flexWrap: 'wrap'
                        }}
                    >
                        {item?.courseTitle}
                    </Text>
                    <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 15
                    }}>
                        {item?.chapters?.length} Chương
                    </Text>
                </View>
            </View>

            <View style={{
                marginTop: 10
            }}>
                <Progress.Bar progress={GetCompletedChapters(item)} width={width - 30} />
                <Text style={{
                    fontFamily: 'Inter',
                    marginTop: 2
                }}>
                    {Math.min([...new Set(item?.completeChapter || [])].length, item?.chapters?.length || 0)}/{item?.chapters?.length || 0} Chương đã hoàn thành
                </Text>
            </View>
        </View>
    );
}
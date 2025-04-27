import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import * as Progress from 'react-native-progress';

export default function CourseProgress({ courseList }) {
    return (
        <View style={{
            marginTop: 10
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
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
                        <View style={{
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
                                    numberOfLines={2}
                                    style={{
                                        fontFamily: 'outfit-bold',
                                        fontSize: 19,
                                        flexWrap: 'wrap'
                                    }}>{item?.courseList}</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 15
                                }}>{item?.chapters?.length} Chương</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <Progress.Bar progress={0.3} width={250} />
                            <Text style={{
                                fontFamily: 'outfit',
                                marginTop: 2
                            }}>3/5 Chương đã hoàn thành</Text>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}
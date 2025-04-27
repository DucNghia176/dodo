import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useRouter } from 'expo-router';

export default function Chapters({ course }) {
    const router = useRouter();
    const isChapterComplete = (index) => {
        const isComplete = course?.completeChapter.find(item => item == index)
        return isComplete ? true : false
    }
    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Chương</Text>

            <FlatList
                data={course?.chapters}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        console.log(item);
                        router.push({
                            pathname: '/ChapterView',
                            params: {
                                chapterParams: JSON.stringify(item),
                                docId: course?.docId,
                                chapterIndex: index
                            }
                        })
                    }} style={{
                        padding: 18,
                        borderWidth: 0.5,
                        borderRadius: 15,
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                            <Text style={styles.chapterText}>{index + 1}</Text>
                            <Text style={styles.chapterText}>{item?.chapterName}</Text>
                        </View>
                        {isChapterComplete(index) ?
                            <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} />
                            : <Ionicons name="play" size={24} color={Colors.PRIMARY} />}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    chapterText: {
        fontFamily: 'outfit',
        fontSize: 20
    }
})
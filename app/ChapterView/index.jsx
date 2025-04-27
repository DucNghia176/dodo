import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { db } from '../../config/firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function ChapterView() {
    const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
    const chapters = JSON.parse(chapterParams);

    const [currentPage, setCurrentPage] = useState(0);
    const [loader, setLoader] = useState(false);
    const GetProgress = (currentPage) => {
        const perc = (currentPage / chapters?.content?.length);
        return perc;

    }
    const onChapterComplete = async () => {
        console.log("Đang lưu chương học...");
        setLoader(true);

        await updateDoc(doc(db, 'Courses', docId), {
            completeChapter: arrayUnion(chapterIndex)
        });
        console.log("Lưu thành công!");

        setLoader(false);
        router.replace('/courseView');
    }
    return (
        <View style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1
        }}>
            <Progress.Bar progress={GetProgress(currentPage)}
                width={Dimensions.get('screen').width * 0.85} />

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>{chapters?.content[currentPage]?.topic}</Text>

                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    marginTop: 7
                }}>{chapters?.content[currentPage]?.explain}</Text>

                {chapters?.content[currentPage]?.code &&
                    <Text style={[styles.codeExampleText, { backgroundColor: Colors.BLACK, color: Colors.WHITE }]}>{chapters?.content[currentPage]?.code}</Text>}

                {chapters?.content[currentPage]?.example &&
                    <Text style={styles.codeExampleText}>{chapters?.content[currentPage]?.example}</Text>}
            </View>

            <View style={{
                position: 'absolute',
                bottom: 15,
                width: '100%',
                left: 25
            }}>
                {chapters?.content?.length - 1 != currentPage ?
                    <Button text={'Tiếp'} onPress={() => setCurrentPage(currentPage + 1)} /> :
                    <Button text={'Hoàn Thành'} onPress={() => onChapterComplete()} loading={loader} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15
    }
})
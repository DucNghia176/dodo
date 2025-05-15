import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { db } from '../../config/firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function ChapterView() {
    const { chapterParams, docId, chapterIndex, courseParams } = useLocalSearchParams();

    // Kiểm tra dữ liệu đầu vào
    if (!chapterParams || typeof chapterParams !== 'string' || !docId || !chapterIndex) {
        console.error("Dữ liệu không hợp lệ:", { chapterParams, docId, chapterIndex });
        return (
            <View style={styles.container}>
                <Text>Lỗi: Dữ liệu chương hoặc khóa học không hợp lệ.</Text>
            </View>
        );
    }

    let chapters;
    try {
        // console.log("Nhận được chapterParams:", chapterParams);
        chapters = JSON.parse(chapterParams);
    } catch (error) {
        console.error("Lỗi khi phân tích chapterParams:", error, "Nhận được:", chapterParams);
        return (
            <View style={styles.container}>
                <Text>Lỗi khi tải dữ liệu chương. Vui lòng thử lại.</Text>
            </View>
        );
    }

    const [currentPage, setCurrentPage] = useState(0);
    const [loader, setLoader] = useState(false);

    const GetProgress = (currentPage) => {
        const perc = chapters?.content?.length ? currentPage / chapters.content.length : 0;
        return perc;
    };

    const onChapterComplete = async () => {
        console.log("Đang lưu chương học...");
        setLoader(true);

        const parsedChapterIndex = parseInt(chapterIndex);
        if (!docId || isNaN(parsedChapterIndex)) {
            console.error("docId hoặc chapterIndex không hợp lệ:", { docId, chapterIndex });
            setLoader(false);
            return;
        }

        try {
            const courseDocRef = doc(db, 'Courses', docId);
            await updateDoc(courseDocRef, {
                completeChapter: arrayUnion(parsedChapterIndex),
            });
            console.log("Lưu thành công!");
            // Quay lại trang trước
            router.back();
            // router.replace('/courseView/' + docId)
        } catch (error) {
            console.error("Lỗi khi lưu chương vào Firestore:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <View style={styles.container}>
            <Progress.Bar
                progress={GetProgress(currentPage)}
                width={Dimensions.get('screen').width * 0.85}
            />

            <View style={styles.content}>
                <Text style={styles.topic}>{chapters?.content[currentPage]?.topic}</Text>
                <Text style={styles.explain}>{chapters?.content[currentPage]?.explain}</Text>

                {chapters?.content[currentPage]?.code && (
                    <Text style={[styles.codeExampleText, styles.code]}>
                        {chapters?.content[currentPage]?.code}
                    </Text>
                )}

                {chapters?.content[currentPage]?.example && (
                    <Text style={styles.codeExampleText}>
                        {chapters?.content[currentPage]?.example}
                    </Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                {chapters?.content?.length - 1 !== currentPage ? (
                    <Button text={'Tiếp'} onPress={() => setCurrentPage(currentPage + 1)} />
                ) : (
                    <Button text={'Hoàn Thành'} onPress={onChapterComplete} loading={loader} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
    },
    content: {
        marginTop: 20,
    },
    topic: {
        fontFamily: 'Inter-bold',
        fontSize: 20,
    },
    explain: {
        fontFamily: 'Inter',
        fontSize: 20,
        marginTop: 7,
    },
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        fontFamily: 'Inter',
        fontSize: 18,
        marginTop: 15,
    },
    code: {
        backgroundColor: Colors.BLACK,
        color: Colors.WHITE,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        left: 25,
    },
});
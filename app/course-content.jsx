import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CourseContent() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        if (params.chapter) {
            setChapter(JSON.parse(params.chapter));
        }
    }, [params.chapter]);

    if (!chapter) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{chapter.chapterName}</Text>
            </View>

            <ScrollView style={styles.content}>
                {chapter.content.map((item, index) => (
                    <View key={index} style={styles.contentItem}>
                        <Text style={styles.topic}>{item.topic}</Text>
                        <Text style={styles.explain}>{item.explain}</Text>

                        {item.example && (
                            <View style={styles.exampleContainer}>
                                <Text style={styles.exampleTitle}>Ví dụ:</Text>
                                <Text style={styles.example}>{item.example}</Text>
                            </View>
                        )}

                        {item.code && (
                            <View style={styles.codeContainer}>
                                <Text style={styles.codeTitle}>Code:</Text>
                                <Text style={styles.code}>{item.code}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BG_GRAY,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    contentItem: {
        marginBottom: 24,
    },
    topic: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    explain: {
        fontSize: 16,
        color: Colors.BLACK,
        lineHeight: 24,
        marginBottom: 16,
    },
    exampleContainer: {
        backgroundColor: Colors.BG_GRAY,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    exampleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.PRIMARY,
        marginBottom: 8,
    },
    example: {
        fontSize: 15,
        color: Colors.BLACK,
        lineHeight: 22,
    },
    codeContainer: {
        backgroundColor: Colors.BG_GRAY,
        padding: 16,
        borderRadius: 8,
    },
    codeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.PRIMARY,
        marginBottom: 8,
    },
    code: {
        fontSize: 15,
        color: Colors.BLACK,
        fontFamily: 'monospace',
        lineHeight: 22,
    },
}); 
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constants/Colors';
import Button from '../../components/Shared/Button';
import { GeneraCourseAIModel, GeneraTopicsAIModel } from '../../config/AiModel';
import Prompt from '../../constants/Prompt';
import { db } from './../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; // Import setDoc và doc
import { UserDetailContext } from '../../context/UserDetailContext';
import { useRouter } from 'expo-router';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopics] = useState([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const onTopicselect = (topic) => {
        const isAlreadyExists = selectedTopic.find((item) => item === topic);
        if (!isAlreadyExists) {
            setSelectedTopics((prev) => [...prev, topic]);
        } else {
            const updatedTopics = selectedTopic.filter((item) => item !== topic);
            setSelectedTopics(updatedTopics);
        }
    };

    const onGeneraTopic = async () => {
        if (!userInput || userInput.trim() === '') {
            alert('Vui lòng nhập chủ đề trước!');
            return;
        }
        try {
            setLoading(true);
            const PROMPT = userInput + Prompt.IDEA;
            const aiResp = await GeneraTopicsAIModel.sendMessage(PROMPT);
            const responseText = aiResp.response.text();
            console.log('Raw AI Response:', responseText); // Debug
            const topicIdea = JSON.parse(responseText);
            console.log('AI Response:', topicIdea); // Debug
            setTopics(topicIdea);
        } catch (error) {
            console.error('Lỗi khi gọi AI:', error);
            alert('Không thể tạo chủ đề. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const onGenerateCourse = async () => {
        if (selectedTopic.length === 0) {
            alert('Vui lòng chọn ít nhất một chủ đề!');
            return;
        }
        try {
            setLoading(true);
            const topicsString = selectedTopic.join(', ');
            const PROMPT = `${topicsString}${Prompt.COURSE}`;
            console.log('Course Prompt:', PROMPT); // Debug
            const aiResp = await GeneraCourseAIModel.sendMessage(PROMPT);
            const courses = resp.courses;
            const responseText = aiResp.response.text();
            console.log('Raw Course Response:', responseText); // Debug
            if (!responseText || !responseText.trim()) {
                throw new Error('Phản hồi từ API rỗng hoặc không hợp lệ');
            }
            const course = JSON.parse(responseText);
            console.log('Parsed Course:', course); // Debug

            // Kiểm tra xem course là mảng hay object
            const coursesArray = Array.isArray(course) ? course : [course];

            // Lưu từng khóa học vào Firestore
            for (const courseItem of coursesArray) {
                await setDoc(doc(db, 'Courses', Date.now().toString()), {
                    ...courseItem,
                    createdOn: new Date(),
                    createdBy: userDetail?.email || 'unknown',
                });
            }

            alert('Khóa học đã được tạo thành công!');
            router.push('/(tabs)/home');
        } catch (error) {
            console.error('Lỗi khi tạo khóa học:', error);
            alert('Không thể tạo khóa học. Vui lòng thử lại! Chi tiết lỗi: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const isTopicSelected = (topic) => {
        return !!selectedTopic.find((item) => item === topic);
    };

    return (
        <ScrollView style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30
            }}>Tạo khóa học mới</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 25
            }}>Hôm nay bạn muốn học điều gì?</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                marginTop: 8,
                color: Colors.GRAY
            }}>Bạn muốn tạo khóa học nào? (Học Python, Marketing kỹ thuật số, Các chương trong chương trình Khoa học lớp 10, v.v...)</Text>
            <TextInput
                placeholder='Python,...'
                style={styles.textInput}
                numberOfLines={3}
                multiline={true}
                onChangeText={(value) => setUserInput(value)}
                value={userInput}
            />

            <Button
                text={'Tạo chủ đề'}
                type='outfit'
                onPress={() => onGeneraTopic()}
                loading={loading}
            />

            <View style={{
                marginTop: 15,
                marginBottom: 10
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                }}>Chọn tất cả các chủ đề bạn muốn thêm vào khóa học</Text>
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 6
            }}>
                {Array.isArray(topics) && topics.length > 0 ? (
                    topics.map((item, index) => (
                        <Pressable key={index} onPress={() => onTopicselect(item)}>
                            <Text style={{
                                padding: 7,
                                borderWidth: 0.4,
                                borderRadius: 99,
                                paddingHorizontal: 15,
                                backgroundColor: isTopicSelected(item) ? Colors.PRIMARY : null,
                                color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY
                            }}>{item}</Text>
                        </Pressable>
                    ))
                ) : (
                    <Text>Không có chủ đề nào để hiển thị</Text>
                )}
            </View>

            {selectedTopic?.length > 0 && (
                <Button
                    text={'Tạo Khóa Học'}
                    onPress={() => onGenerateCourse()}
                    loading={loading}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        marginTop: 10,
        alignItems: 'flex-start',
        fontSize: 18
    }
});
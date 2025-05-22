import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { imageAssets } from '../../constants/Option';
import Colors from '../../constants/Colors';
import CourseList from '../Home/CourseList';

// Hàm chuẩn hóa chuỗi, loại bỏ dấu tiếng Việt
const removeVietnameseDiacritics = (str) => {
    if (!str) return '';
    str = str.normalize('NFD').replace(/\u0300-\u036f/g, '');
    return str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
};

// Component hiển thị danh sách khóa học theo danh mục
export default function CourseListByCategory({ category, searchQuery, onResultsFound }) {
    // State lưu trữ danh sách khóa học
    const [courseList, setCourseList] = useState([]);
    // State lưu trạng thái loading
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    // Effect để lấy danh sách khóa học khi category thay đổi
    useEffect(() => {
        GetCourseListByCategory();
    }, [category])

    // Hàm lấy danh sách khóa học từ Firestore theo danh mục
    const GetCourseListByCategory = async () => {
        setCourseList([]); // Reset danh sách
        setLoading(true); // Bật loading
        const q = query(collection(db, 'Courses'),
            where('category', '==', category)); // Query theo category

        const querySnapshot = await getDocs(q);
        const fetchedCourses = [];

        // Lặp qua kết quả và thêm vào danh sách
        querySnapshot?.forEach((doc) => {
            fetchedCourses.push(doc.data());
        })
        setCourseList(fetchedCourses); // Cập nhật danh sách khóa học
        setLoading(false); // Tắt loading
    }

    // Lọc danh sách khóa học dựa trên từ khóa tìm kiếm trong cả tên danh mục và tên khóa học
    const filteredCourseList = courseList.filter(course => {
        // Nếu không có từ khóa tìm kiếm, hiển thị tất cả khóa học trong danh mục này
        if (!searchQuery) {
            return true;
        }

        // Chuẩn hóa và chuyển về chữ thường cho từ khóa tìm kiếm, tên danh mục và tên khóa học
        const normalizedSearchQuery = removeVietnameseDiacritics(searchQuery).toLowerCase();
        const normalizedCategory = removeVietnameseDiacritics(category).toLowerCase();
        const normalizedCourseTitle = typeof course.courseTitle === 'string' ? removeVietnameseDiacritics(course.courseTitle).toLowerCase() : '';

        // Kiểm tra nếu tên danh mục (đã chuẩn hóa) hoặc tên khóa học (đã chuẩn hóa) chứa từ khóa tìm kiếm (đã chuẩn hóa)
        return normalizedCategory.includes(normalizedSearchQuery) || normalizedCourseTitle.includes(normalizedSearchQuery);
    });

    // Nếu có kết quả sau khi lọc và onResultsFound được truyền, gọi hàm này
    useEffect(() => {
        if (filteredCourseList.length > 0 && onResultsFound) {
            onResultsFound();
        }
    }, [filteredCourseList, onResultsFound]);

    // Chỉ hiển thị component này nếu có khóa học phù hợp sau khi lọc HOẶC không có từ khóa tìm kiếm
    if (filteredCourseList.length === 0 && searchQuery !== '') {
        return null; // Không hiển thị gì nếu không có kết quả và đang tìm kiếm
    }

    return (
        <View>
            {/* Hiển thị danh sách khóa học đã lọc */}
            <CourseList courseList={filteredCourseList} heading={category}
                enroll={true}
            />
            {/* Thông báo này không còn cần thiết vì chúng ta ẩn toàn bộ danh mục */}
            {/* searchQuery !== '' && filteredCourseList?.length === 0 &&
                <Text style={{ textAlign: 'center', marginTop: 20, fontFamily: 'Inter' }}>Không tìm thấy khóa học phù hợp.</Text>
            */}
        </View>
    )
}

// Định nghĩa styles cho component
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
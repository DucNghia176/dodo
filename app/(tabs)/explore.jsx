import { View, Text, ScrollView, FlatList, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { CourseCategory } from "../../constants/Option";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";
import { Ionicons } from "@expo/vector-icons";

export default function Explore() {
    // State để lưu trữ từ khóa tìm kiếm
    const [searchQuery, setSearchQuery] = useState("");
    // State để điều khiển việc hiển thị thanh tìm kiếm
    const [showSearchBar, setShowSearchBar] = useState(false);
    // State để kiểm tra xem có bất kỳ kết quả tìm kiếm nào được tìm thấy trên toàn bộ màn hình hay không
    const [hasResults, setHasResults] = useState(false);

    // Hàm xử lý khi nhấn biểu tượng tìm kiếm/đóng
    const handleSearchIconPress = () => {
        if (showSearchBar) {
            // Nếu thanh tìm kiếm đang hiển thị, ẩn nó và xóa từ khóa
            setSearchQuery("");
            setShowSearchBar(false);
            // Reset trạng thái kết quả khi xóa tìm kiếm
            setHasResults(false);
        } else {
            // Nếu thanh tìm kiếm đang ẩn, hiển thị nó
            setShowSearchBar(true);
        }
    };

    // Hàm được gọi từ CourseListByCategory khi tìm thấy kết quả
    const handleResultsFound = () => {
        if (!hasResults) {
            setHasResults(true);
        }
    };

    // Reset hasResults về false mỗi khi searchQuery thay đổi (trừ khi rỗng ban đầu)
    React.useEffect(() => {
        if (searchQuery !== '') {
            setHasResults(false);
        } else {
            // Nếu search query rỗng, coi như có kết quả để hiển thị tất cả
            setHasResults(true);
        }
    }, [searchQuery]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
            {/* Header chứa tiêu đề và biểu tượng tìm kiếm */}
            <View style={styles.headerContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Khám phá khóa học</Text>
                    {/* Nút nhấn để bật/tắt thanh tìm kiếm */}
                    <TouchableOpacity onPress={handleSearchIconPress}>
                        <Ionicons name={showSearchBar ? "close-circle-outline" : "search"} size={30} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                </View>

                {/* Thanh tìm kiếm (chỉ hiển thị khi showSearchBar là true), được ghim ở đầu */}
                {showSearchBar && (
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={24} color={Colors.GRAY} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm khóa học..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                )}
            </View>

            {/* Danh sách các danh mục khóa học (sẽ cuộn được) */}
            {/* Hiển thị danh sách chỉ khi không có từ khóa tìm kiếm HOẶC khi đang tìm kiếm VÀ có ít nhất 1 danh mục có kết quả */}
            {(searchQuery === '' || hasResults) ? (
                <FlatList data={CourseCategory}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View style={{ marginTop: 10 }}>
                            {/* Hiển thị danh sách khóa học theo danh mục, truyền từ khóa tìm kiếm và hàm báo kết quả */}
                            <CourseListByCategory category={item} searchQuery={searchQuery} onResultsFound={handleResultsFound} />
                        </View>
                    )}
                    style={styles.categoryList}
                    // Thêm padding cuối FlatList để không bị che bởi tab bar dưới cùng
                    contentContainerStyle={{ paddingBottom: 80 }} // Adjust padding as needed
                />
            ) : ( // Hiển thị thông báo không tìm thấy nếu đang tìm kiếm và không có kết quả nào
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>Không tìm thấy dữ liệu</Text>
                </View>
            )}

        </SafeAreaView>
    )
}

// Định nghĩa styles cho component
const styles = StyleSheet.create({
    headerContainer: {
        padding: 25,
        paddingBottom: 0,
        backgroundColor: Colors.WHITE,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        fontFamily: 'Inter-bold',
        fontSize: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    categoryList: {
        paddingHorizontal: 25,
        backgroundColor: Colors.WHITE,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 20,
        fontFamily: 'Inter-bold',
        color: Colors.GRAY,
    }
});
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { UserDetailContext } from "../../context/UserDetailContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import Colors from '../../constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
    const route = useRouter();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    const onMenuClick = (menu) => {
        if (menu.name === 'Logout') {
            signOut(auth).then(() => {
                setUserDetail(null);
                route.push('/');
            });
        } else {
            route.push(menu.path);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hồ sơ</Text>
            <View style={styles.avatarContainer}>
                <Image
                    source={userDetail?.avatarUrl ? { uri: userDetail.avatarUrl } : require('../../assets/images/icon.png')}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{userDetail?.name || 'User Name'}</Text>
                <Text style={styles.email}>{userDetail?.email || 'user@email.com'}</Text>
            </View>
            <View style={styles.menuContainer}>
                <MenuItem
                    icon={<AntDesign name="plus" size={24} color={Colors.PRIMARY} />}
                    label="Thêm khóa học"
                    onPress={() => onMenuClick({ name: 'AddCourse', path: '/addCourse' })}
                />
                <MenuItem
                    icon={<Ionicons name="book" size={24} color={Colors.PRIMARY} />}
                    label="Khóa học của tôi"
                    onPress={() => onMenuClick({ name: 'MyCourse', path: 'course/my-course' })}
                />
                <MenuItem
                    icon={<Ionicons name="analytics" size={24} color={Colors.PRIMARY} />}
                    label="Tiến độ học tập"
                    onPress={() => onMenuClick({ name: 'CourseProgress', path: '/progress' })}
                />
                <MenuItem
                    icon={<Ionicons name="shield-checkmark" size={24} color={Colors.PRIMARY} />}
                    label="Gói thành viên"
                    onPress={() => onMenuClick({ name: 'MySubscription', path: '/subscription' })}
                />
                <MenuItem
                    icon={<Ionicons name="log-out-outline" size={24} color={Colors.PRIMARY} />}
                    label="Đăng xuất"
                    onPress={() => onMenuClick({ name: 'Logout' })}
                />
            </View>
        </View>
    );
}

function MenuItem({ icon, label, onPress }) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.iconBox}>{icon}</View>
            <Text style={styles.menuLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.BLACK,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: Colors.BG_GRAY,
        marginBottom: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    email: {
        fontSize: 15,
        color: Colors.GRAY,
        marginBottom: 8,
    },
    menuContainer: {
        marginTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: Colors.BG_GRAY,
    },
    menuLabel: {
        fontSize: 17,
        color: Colors.BLACK,
        fontWeight: '500',
    },
});
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";

export default function Progress() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    useEffect(() => {
        userDetail && GetCourseList();
    }, [userDetail])

    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where("createdBy", '==', userDetail?.email),
            //  orderBy('createdOn', 'desc')
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // console.log("--", doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        })

        setLoading(false);
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('./../../assets/images/wave.png')}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 700
                }}
            />
            <View style={{
                width: '100%',
                padding: 20,
                marginTop: 20,
                position: 'absolute',
                zIndex: 1
            }}>
                <Text style={{
                    fontFamily: 'Inter-bold',
                    fontSize: 30,
                    color: Colors.WHITE,
                    marginBlock: 10
                }}>
                    Tiến độ khóa học
                </Text>
            </View>
            <ScrollView style={{ flex: 1, marginTop: 100 }}>
                <View style={{
                    width: '100%',
                    padding: 20,
                }}>
                    <FlatList
                        data={courseList}
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => GetCourseList()}
                        refreshing={loading}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => route.push({
                                pathname: '/courseView/' + item?.docId,
                                params: {
                                    courseParams: JSON.stringify(item)
                                }
                            })}>
                                <CourseProgressCard item={item} width={'97%'} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
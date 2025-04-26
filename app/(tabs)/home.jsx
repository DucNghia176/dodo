import { View, Text, Platform, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";
import CourseProgress from "../../components/Home/CourseProgress";
import PraticeSection from "../../components/Home/PraticeSection";

export default function Home() {
    const { userDetail, setUserDetai } = useContext(UserDetailContext);

    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        userDetail && GetCourseList();
    }, [userDetail])

    const GetCourseList = async () => {
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where("createdBy", '==', userDetail?.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // console.log("--", doc.data());
            setCourseList(prev => [...prev, doc.data()]);
        })
    }
    return (
        <FlatList
            data={courseList}
            ListHeaderComponent={
                <View style={{
                    padding: 25,
                    paddingTop: Platform.OS == 'android' && 45
                }}>
                    <Header />
                    {courseList?.length == 0 ?
                        <NoCourse /> :
                        <View>
                            <CourseProgress courseList={courseList} />
                            <PraticeSection />
                            <CourseList courseList={courseList} />
                            <CourseList courseList={courseList} />
                        </View>
                    }
                </View>
            }
        />
    )
}
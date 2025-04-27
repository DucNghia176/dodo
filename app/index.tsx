import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
// import {onAuthStateChanged} from 'firebase/auth'
import { auth } from './../config/firebaseConfig';
// import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Index() {

  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     console.log(user);
  //     const result = await getDoc(doc(db, 'users', user?.email));
  //     setUserDetail(result.data());
  //     router.replace('/(tabs)/home');

  //   }
  // })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >
      <Image source={require('./../assets/images/landing.png')}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70,
        }}

      />

      <View style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
      }}>
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-bold',
        }}>Hãy sẵn sàng học tập cùng DoDo</Text>

        <Text style={{
          fontSize: 20,
          color: Colors.WHITE,
          marginTop: 20,
          textAlign: 'center',
          fontFamily: 'outfit'
        }}>
          Biến ý tưởng của bạn thành nội dung học tập hấp dẫn, dễ dàng với sự hỗ trợ của AI
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('../auth/signIn')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Bắt Đầu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('../auth/signUp')}
          style={[styles.button, {
            backgroundColor: Colors.PRIMARY,
            borderWidth: 1,
            borderColor: Colors.WHITE,
          }]}>
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Bạn chưa có tài khoản?
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  }
})

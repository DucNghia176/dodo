import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { UserDetailContext } from './../context/UserDetailContext';
import { useState } from "react";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Inter': require('./../assets/fonts/Inter_28pt-Regular.ttf'),
    'Inter-bold': require('./../assets/fonts/Inter_18pt-Bold.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  const [userDetail, setUserDetail] = useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }}>

      </Stack>
    </UserDetailContext.Provider>
  );
}

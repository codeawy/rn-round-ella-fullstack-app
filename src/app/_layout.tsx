import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppTabs from "@/components/app-tabs";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useFonts returns an array with two items (loaded [0], error(1))
  const [fontsLoaded, fontError] = useFonts({
    "GermaniaOne-Regular": require("../../assets/fonts/GermaniaOne-Regular.ttf"),
    "PlayfairDisplay-Regular": require("../../assets/fonts/PlayfairDisplay-Regular.ttf"),
  });

  useEffect(() => {
    // make sure all fonts are loaded OR NOT!
    if (fontsLoaded) {
      // all fonts are loaded now!, you can hide your splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <AppTabs />
    </>
  );
}

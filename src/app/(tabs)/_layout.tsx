import { Colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import { House, User } from "lucide-react-native";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colors = Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.tabInactive,
        // Automatically hides the tab bar when the on-screen keyboard is open
        tabBarHideOnKeyboard: true,
        // Controls whether tab labels are displayed below the icons
        tabBarShowLabel: true,
        // tabBarStyle: [styles.tabBar,  { backgroundColor: colors.surfaceLowest, shadowColor: colors.shadow },],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    bottom: 16,
    elevation: 0,
    height: 72,
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
    position: "absolute",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
  },
});

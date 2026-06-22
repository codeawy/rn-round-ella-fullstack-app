import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { AuthDivider } from "@/components/auth/auth-divider";
import { ControlledInput } from "@/components/ui/controlled-input";
import { Colors, Radius, Typography } from "@/constants/theme";
import { LoginFormValues, loginSchema } from "@/schema/auth";

export default function LoginScreen() {
  const colors = Colors.light;
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login:", data);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={12}
          >
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>

          <View style={styles.header}>
            <Text style={[styles.brand, { color: colors.text }]}>ELITE</Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to access your exclusive curation.
            </Text>
          </View>

          <View style={styles.form}>
            <ControlledInput
              control={control}
              name="email"
              errors={errors}
              label="EMAIL ADDRESS"
              placeholder="name@example.com"
              keyboardType="email-address"
            />
            <ControlledInput
              control={control}
              name="password"
              errors={errors}
              label="PASSWORD"
              placeholder="••••••••"
              secureTextEntry
            />

            <Pressable style={styles.forgotRow}>
              <Text style={[styles.forgotText, { color: colors.secondary }]}>
                Forgot Password?
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={[
                styles.signInButton,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Text style={[styles.signInLabel, { color: colors.onSecondary }]}>
                Sign In
              </Text>
            </Pressable>
          </View>

          <View style={styles.socialSection}>
            <AuthDivider />

            <Pressable style={[styles.socialButton, styles.googleButton]}>
              <Svg width={20} height={20} viewBox="0 0 48 48">
                <Path
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  fill="#EA4335"
                />
                <Path
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  fill="#4285F4"
                />
                <Path
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  fill="#FBBC05"
                />
                <Path
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  fill="#34A853"
                />
              </Svg>
              <Text style={[styles.socialLabel, { color: colors.text }]}>
                Continue with Google
              </Text>
            </Pressable>

            <Pressable style={[styles.socialButton, styles.appleButton]}>
              <Svg width={20} height={20} viewBox="0 0 384 512" fill="#ffffff">
                <Path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </Svg>
              <Text style={[styles.socialLabel, { color: "#ffffff" }]}>
                Continue with Apple
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              By continuing, you agree to our{" "}
              <Text style={{ color: colors.text }}>Privacy Policy</Text> &{" "}
              <Text style={{ color: colors.text }}>Terms of Service</Text>.
            </Text>
            <Pressable
              onPress={() => router.push("/signup")}
              style={styles.signupLink}
            >
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                Don't have an account?{" "}
                <Text style={{ color: colors.secondary, fontWeight: "600" }}>
                  Sign Up
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  title: {
    ...Typography.headlineLg,
    fontSize: 30,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.bodyMd,
    fontSize: 17,
    textAlign: "center",
  },
  form: {
    gap: 16,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginTop: -4,
  },
  forgotText: {
    ...Typography.bodySm,
    fontWeight: "600",
  },
  signInButton: {
    alignItems: "center",
    borderRadius: Radius.pill,
    height: 56,
    justifyContent: "center",
    marginTop: 8,
  },
  signInLabel: {
    ...Typography.titleMd,
    fontSize: 18,
  },
  socialSection: {
    marginTop: 32,
    gap: 14,
  },
  socialButton: {
    alignItems: "center",
    borderRadius: Radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    height: 56,
    justifyContent: "center",
  },
  googleButton: {
    backgroundColor: "#ffffff",
    borderColor: "#dcd9db",
  },
  appleButton: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  socialLabel: {
    ...Typography.bodyMd,
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    paddingTop: 16,
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    ...Typography.bodySm,
    fontSize: 13,
    textAlign: "center",
  },
  signupLink: {
    marginTop: 4,
  },
});

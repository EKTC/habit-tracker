import { Stack, router } from "expo-router";
import { StyleSheet, TextInput, Button, Alert, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (d: any) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: d.email,
        password: d.password,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Sign Up failed", "An unexpected error occurred");
      console.error(error);
      return;
    }

    router.replace("/home"); // go to home after signing up
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sign Up" }} />
      <View>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="text-white">{errors.email.message}</Text>
              )}
            </>
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: "Please confirm your email",
            validate: (value) => value === email || "Emails do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Confirm Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.confirmEmail && (
                <Text className="text-white">
                  {errors.confirmEmail.message}
                </Text>
              )}
            </>
          )}
          name="confirmEmail"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 64,
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={styles.input}
              />
              {errors.password && (
                <Text className="text-white">{errors.password.message}</Text>
              )}
            </>
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 64,
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={styles.input}
              />
              {errors.confirmPassword && (
                <Text className="text-white">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </>
          )}
          name="confirmPassword"
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <Button
          title={loading ? "Switching..." : "Already have an account?"}
          onPress={() => router.replace("/login")}
          disabled={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: "white",
  },
});

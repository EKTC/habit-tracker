import { Stack, router } from "expo-router";
import { StyleSheet, TextInput, Button, Alert, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Controller, useForm } from "react-hook-form";
import ControlledTextField from "@/components/ContolledTextField";

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
  } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

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
  const validateEmailsMatch = (value: string) => {
    if (value !== email) {
      return "Emails do not match";
    }
    return true;
  };
  const validatePasswordsMatch = (value: string) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sign Up" }} />
      <View>
        <Text>Email</Text>
        <ControlledTextField
          control={control}
          name="email"
          placeholder="Email"
          rules={{
            maxLength: {
              value: 100,
              message: "Email cannot exceed 100 characters",
            },
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text>Confirm Email</Text>
        <ControlledTextField
          control={control}
          name="confirmEmail"
          placeholder="Confirm Email"
          rules={{
            maxLength: {
              value: 100,
              message: "Email cannot exceed 100 characters",
            },
            required: "Confirm emails match.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
            validate: validateEmailsMatch,
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text>Password</Text>
        <ControlledTextField
          control={control}
          name="password"
          placeholder="Password"
          rules={{
            maxLength: 64,
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          secureTextEntry
        />
        <Text>Confirm Password</Text>
        <ControlledTextField
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          rules={{
            maxLength: 64,
            required: "Please confirm your password",
            validate: validatePasswordsMatch,
          }}
          secureTextEntry
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

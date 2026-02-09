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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirm Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              autoCapitalize="none"
            />
          )}
          name="confirmEmail"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              style={styles.input}
            />
          )}
          name="password"
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

import { Stack, router } from "expo-router";
import { StyleSheet, TextInput, Button, Alert, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Controller, useForm } from "react-hook-form";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });
  // const [email, setEmail] = useState("");
  // const [cemail, setConfirmEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // const signUp = async () => {
  //   setLoading(true);
  //   try {
  //     // if (email !== cemail) {
  //     //   Alert.alert("Sign Up failed", "Emails do not match");
  //     //   setLoading(false);
  //     //   return;
  //     // }

  //     console.log(email, password);
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });

  //     console.log(data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     Alert.alert("Sign Up failed", "An unexpected error occurred");
  //     console.error(error);
  //     return;
  //   }

  //   router.replace("/home"); // go to home after signing up
  // };
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              autoCapitalize="none"
            />
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
      {/* <form onSubmit={handleSubmit(signUp)}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Sign Up</ThemedText>
          <TextInput
            {...register("email")}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            {...register("confirmEmail")}
            placeholder="Confirm Email"
            autoCapitalize="none"
            value={cemail}
            onChangeText={setConfirmEmail}
            style={styles.input}
          />

          <TextInput
            {...register("password")}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button
            title={loading ? "Signing up..." : "Sign Up"}
            onPress={signUp}
            disabled={loading}
          />
          <Button
            title={loading ? "Switching..." : "Login"}
            onPress={() => router.replace("/login")}
            disabled={loading}
          />
        </ThemedView>
      </form> */}
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

import { Stack, router } from "expo-router";
import { StyleSheet, TextInput, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error.message);
      return;
    }

    router.replace("/home"); // go to home after login
  };

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />

      <ThemedView style={styles.container}>
        <ThemedText type="title">Login</ThemedText>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={signIn}
          disabled={loading}
        />

        <Button
          title={loading ? "Switching..." : "Sign Up"}
          onPress={() => router.replace("/signup")}
          disabled={loading}
        />
      </ThemedView>
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

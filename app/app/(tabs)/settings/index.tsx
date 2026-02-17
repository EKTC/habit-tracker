import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import SignOutButton from "@/components/sign-out-button";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }
}

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Text className="text-xl font-bold text-black">Settings</Text>
      <Button title="Sign out" onPress={onSignOutButtonPress}></Button>
    </View>
  );
}

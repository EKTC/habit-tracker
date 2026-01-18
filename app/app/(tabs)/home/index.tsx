import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../../utils/supabase";
// import "../../../global.css";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data, error } = await supabase.from("User").select().single();

    console.log("User data:", data);
    console.log("User error:", error);
    if (data) {
      setUser(data);
    }
  }
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-primary">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}

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
import DailyTask from "@/components/tasks/DailyTask";
// import "../../../global.css";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User>();

  const tasks = [
    {
      id: "1",
      name: "Drink Water",
      freq: 3,
      totalFreq: 8,
      completed: false,
    },
    {
      id: "2",
      name: "gym",
      completed: false,
    },
  ];
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
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Text className="text-xl font-bold text-black">Home</Text>
      <Text className="text-lg font-bold text-black">To do</Text>
      {tasks.map((task) => (
        <DailyTask
          key={task.id}
          id={task.id}
          name={task.name}
          freq={task.freq}
          totalFreq={task.totalFreq}
          completed={task.completed}
          icon="dlsjdkl"
        />
      ))}
      <Text className="text-lg font-bold text-black">Completed</Text>
    </View>
  );
}

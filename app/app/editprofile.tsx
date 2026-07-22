import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../utils/supabase";
import DailyTask from "@/components/tasks/DailyTask";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function EditProfile() {
  //   const { user } = useAuthContext();
  //   const [tasks, setTasks] = useState([]);

  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <Text className="text-xl font-bold text-black">Edit Profile</Text>
    </View>
  );
}

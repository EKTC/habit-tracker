import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

interface DailyTaskType {
  id: string;
  name: string;
  freq?: number;
  totalFreq?: number;
  completed: boolean;
  icon: string;
}

const DailyTask: React.FC<DailyTaskType> = ({
  id,
  name,
  freq,
  totalFreq,
  completed,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [count, setCount] = useState(freq || 0);
  const [isCompleted, setIsCompleted] = useState(completed);

  // also need to update supabase when freq or completed changes
  const updateFrequency = () => {
    console.log("freq", freq);
    console.log("totalFreq", totalFreq);
    console.log("completed", isCompleted);
    console.log("count", count);
    // reset count if completed and has freq
    if (isCompleted && totalFreq) {
      console.log("reset count");
      setCount(0);
      setIsCompleted(false);
      return;
      // else increase freq
    } else if (totalFreq && count < totalFreq) {
      console.log("increase count");
      if (count + 1 === totalFreq) {
        // Mark task as completed
        setIsCompleted(true);
      }
      setCount((prevCount) => prevCount + 1);
      return;
    }
    // for things without freq -> toggle completed
    setIsCompleted((prev) => !prev);
  };
  return (
    <Pressable
      onPress={() => updateFrequency()}
      className={`relative border-2 border-clickable overflow-hidden text-md w-full rounded-lg ${isCompleted ? "bg-clickable" : "bg-white"}`}
    >
      {/* content */}
      <View className="flex flex-row justify-between p-4">
        <View className="flex flex-row items-center gap-2">
          <View>
            <Octicons name="sparkle-fill" size={24} color="black" />
          </View>
          <Text>{name}</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          {freq !== undefined && totalFreq !== undefined && (
            <Text>
              {count}/{totalFreq}
            </Text>
          )}
          <View className="border-2 border-clickable bg-white rounded-full h-8 w-8 flex items-center justify-center">
            {isCompleted && (
              <MaterialIcons name="check" size={24} color="#6B6DFF" />
            )}
          </View>
        </View>
      </View>
      {/* Progressive fill */}
      {totalFreq && (
        <View
          className="absolute top-0 left-0 bottom-0 bg-clickable overflow-hidden"
          style={{ width: `${(count / totalFreq) * 100}%`, zIndex: 0 }}
        >
          {/* content */}
          <View className="flex flex-row justify-between p-4 w-screen pr-12">
            <View className="flex flex-row items-center gap-2">
              <View>
                <Octicons name="sparkle-fill" size={24} color="white" />
              </View>
              <Text className="text-white">{name}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              {freq !== undefined && totalFreq !== undefined && (
                <Text className="text-white">
                  {count}/{totalFreq}
                </Text>
              )}
              <View
                className={`border-2 bg-white rounded-full h-8 w-8 flex items-center justify-center`}
              >
                {isCompleted && (
                  <MaterialIcons name="check" size={24} color="#6B6DFF" />
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default DailyTask;

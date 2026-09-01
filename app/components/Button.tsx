import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface ButtonType {
  title?: string;
  onPress: () => void;
  icon?: JSX.Element;
  variant?: "text" | "outline" | "icon";
}

const getButtonStyles = (variation: ButtonType["variant"]) => {
  switch (variation) {
    case "text":
      return "px-6 py-4";
    case "outline":
      return "border-2 border-clickable px-6 py-4 rounded-md";
    case "icon":
      return "bg-clickable p-4 rounded-full";
    default:
      return "bg-clickable px-6 py-4 rounded-md";
  }
};

const Button: React.FC<ButtonType> = ({ title, onPress, icon, variant }) => {
  return (
    <Pressable
      className={`flex flex-row ${getButtonStyles(variant)}`}
      onPress={onPress}
    >
      {icon}
      <Text className="text-white font-bold">{title}</Text>
    </Pressable>
  );
};

export default Button;

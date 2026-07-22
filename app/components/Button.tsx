import { JSX } from "react";
import { Pressable, Text, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";
import { cn } from "@/lib/cn";

interface ButtonType {
  title?: string;
  onPress: () => void;
  icon?: JSX.Element;
  variant?: "text" | "outline" | "icon";
  className?: string;
}

const getButtonStyles = (variation: ButtonType["variant"]) => {
  switch (variation) {
    case "text":
      return "px-6 py-4 text-clickable";
    case "outline":
      return "border-2 border-clickable px-6 py-4 rounded-md text-clickable";
    case "icon":
      return "bg-clickable p-4 rounded-full text-white ";
    default:
      return "bg-clickable px-6 py-4 rounded-md text-white";
  }
};

const getTextStyles = (variation: ButtonType["variant"]) => {
  switch (variation) {
    case "text":
      return "text-clickable";
    case "outline":
      return "text-clickable";
    case "icon":
      return "text-white";
    default:
      return "text-white";
  }
};

const Button: React.FC<ButtonType> = ({
  title,
  onPress,
  icon,
  variant,
  className,
}) => {
  return (
    <Pressable
      className={cn("flex flex-row", getButtonStyles(variant), className)}
      onPress={onPress}
    >
      {icon}
      <Text className={cn("font-bold", getTextStyles(variant))}>{title}</Text>
    </Pressable>
  );
};

export default Button;

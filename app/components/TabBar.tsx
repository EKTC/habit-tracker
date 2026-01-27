import { View, Platform, Text } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabBar = ({ state, descriptors, navigation }) => {
  const { buildHref } = useLinkBuilder();

  const icon = {
    home: (props) => <MaterialIcons {...props} name="home" size={24} />,
    habits: (props) => <MaterialIcons {...props} name="checklist" size={24} />,
    friends: (props) => (
      <MaterialIcons {...props} name="people-alt" size={24} />
    ),
    settings: (props) => <MaterialIcons {...props} name="settings" size={24} />,
  };

  return (
    <View className="bg-primary flex flex-row items-center justify-around h-20 absolute bottom-6 left-3 right-3 rounded-full">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex flex-col items-center justify-center"
          >
            {/* TODO: colour is not connected to config file */}
            {icon[route.name]({
              color: isFocused ? "#2832f1" : "white",
            })}
            {/* TODO: unable to bold font */}
            <Text
              className={`text-sm font-bold ${isFocused ? "text-clickable" : "text-white"}`}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default TabBar;

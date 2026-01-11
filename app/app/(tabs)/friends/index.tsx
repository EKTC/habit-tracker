import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import React from 'react';
import { Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View><Text style={{ color: 'green', fontSize: 20 }}>Help me</Text></View>
  )
}



import { StatusBar } from "react-native";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import "../global.css";
const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Index</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "blue" }}>
        Go to Profile
      </Link>
    </View>
  );
};

export default index;

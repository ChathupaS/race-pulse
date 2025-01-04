import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import "../global.css";

const Index = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w--[380px] w-full h-[300px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless Possibilities with{" "}
                <Text className="text-secondary-200">RacePulse</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 right-12"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Experience the thrill of F1, where speed, precision, and passion
              ignite every moment with RacePulse!{" "}
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Index;

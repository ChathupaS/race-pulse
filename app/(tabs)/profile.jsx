import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useRouter } from "expo-router";
import { images } from "../../constants";
import { logout } from "../../lib/appwrite";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-2xl text-white">User not logged in</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <Image source={images.avatar} className="w-24 h-24 rounded-full mb-4" />
      <Text className="text-2xl text-white font-psemibold mb-6">
        {user.username}
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-secondary px-6 py-3 rounded-full"
      >
        <Text className="text-white text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

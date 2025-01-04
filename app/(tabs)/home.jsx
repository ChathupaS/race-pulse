import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import { useGlobalContext } from "../../context/GlobalProvider";
import DriverCard from "../../components/DriverCard";
import driverImages from "../../constants/driverImages";
import useClickStore from "../../context/useClickStore";

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();
  const { clickCount, increment } = useClickStore();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "http://ergast.com/api/f1/current/driverStandings.json"
        );
        const driverStandings =
          response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(driverStandings);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  const getDriverImageUrl = (driverId) => {
    return driverImages[driverId] || "https://example.com/images/default.jpg";
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4 space-y-6">
        <Text className="text-3xl font-bold text-white">Current Standings</Text>
      </View>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.Driver.driverId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={increment}>
            <DriverCard
              position={item.position}
              givenName={item.Driver.givenName}
              familyName={item.Driver.familyName}
              points={item.points}
              wins={item.wins}
              imageUrl={getDriverImageUrl(item.Driver.driverId)}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
          </View>
        )}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.buttonText}>{clickCount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200EE",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;

import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import { useGlobalContext } from "../../context/GlobalProvider";
import DriverCard from "../../components/DriverCard";
import driverImages from "../../constants/driverImages";

const Home = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();

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
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.Driver.driverId}
        renderItem={({ item }) => (
          <DriverCard
            position={item.position}
            givenName={item.Driver.givenName}
            familyName={item.Driver.familyName}
            points={item.points}
            wins={item.wins}
            imageUrl={getDriverImageUrl(item.Driver.driverId)}
          />
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
    </SafeAreaView>
  );
};

export default Home;

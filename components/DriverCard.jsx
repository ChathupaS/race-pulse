import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DriverCard = ({
  position,
  givenName,
  familyName,
  points,
  wins,
  imageUrl,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.position}>{position}</Text>
      <Text style={styles.name}>
        {givenName} {familyName}
      </Text>
      <Text style={styles.details}>Points: {points}</Text>
      <Text style={styles.details}>Wins: {wins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15, // Added margin from left and right
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  position: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
  details: {
    fontSize: 16,
    color: "#ccc",
  },
});

export default DriverCard;

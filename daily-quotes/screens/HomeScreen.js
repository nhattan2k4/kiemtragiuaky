import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { quotes } from "../data/quotes";

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState(getRandomQuote());

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  const handleNewQuote = () => {
    setQuote(getRandomQuote());
  };

  const handleFavorite = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
    if (!favorites.find((q) => q.id === quote.id)) {
      favorites.push(quote);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }
    alert("Đã thêm vào danh sách yêu thích ❤️");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>✨ Danh ngôn hôm nay ✨</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.newButton]} onPress={handleNewQuote}>
          <Text style={styles.buttonText}>Quote mới</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.favButton]} onPress={handleFavorite}>
          <Text style={styles.buttonText}>❤ Yêu thích</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.listButton]} onPress={() => navigation.navigate("Favorites")}>
          <Text style={styles.buttonText}>📜 Danh sách</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    paddingVertical: 8,      // ↓ giảm kích thước nút
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 4,
    minWidth: 90,            // ↓ nhỏ gọn hơn
    alignItems: "center",
  },
  newButton: { backgroundColor: "#6c63ff" },
  favButton: { backgroundColor: "#ff6b6b" },
  listButton: { backgroundColor: "#4dabf7" },
  buttonText: { color: "white", fontSize: 14, fontWeight: "500" },
});

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  // 📦 Tải danh sách yêu thích khi mở màn hình
  useEffect(() => {
    const loadFavorites = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
      setFavorites(data);
    };
    loadFavorites();
  }, []);

  // 🗑 Hàm xóa quote khỏi danh sách
  const removeFavorite = async (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Danh ngôn yêu thích</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có danh ngôn nào được lưu.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.quote}>“{item.text}”</Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFavorite(item.id)}
              >
                <Text style={styles.deleteText}>🗑 Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f7",
    padding: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quote: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const coupons = [
  { id: '1', title: 'Calculus 1 (Math 131)', instructor: 'Muhammad Yashri', progress: 0.4, lessons: 12, imageUri: 'https://cdn.pixabay.com/photo/2017/08/14/11/49/mathematics-2640219_1280.jpg' },
  { id: '2', title: 'Physics 1', instructor: 'John Doe', progress: 0.6, lessons: 15, imageUri: 'https://media.istockphoto.com/id/1866121335/tr/foto%C4%9Fraf/physics-and-mathematics.jpg?s=1024x1024&w=is&k=20&c=kmvnzAKvujn2OMlfhfwhrqFI_ymMGqN-lDqYcpYniKM=' },
];

const CouponCards = () => {
  const renderCoupon = ({ item }) => (
    <TouchableOpacity key={item.id} style={[styles.couponCard, { backgroundColor: item.id % 2 === 0 ? "#ff9133" : "#000" }]}>
      <Image source={item.image} style={styles.couponImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={coupons}
      renderItem={renderCoupon}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default CouponCards;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  couponCard: {
    width: 300,
    height: 160,
    marginRight: 10,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  couponImage: {
    width: 100,
    height: "100%",
    resizeMode: "contain",
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 18,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});
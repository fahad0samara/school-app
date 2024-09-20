import React, { useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const universities = [
  { id: 1, name: 'AUM', logoUri: 'https://cdn.pixabay.com/photo/2017/07/24/23/00/dumbbells-2536372_960_720.jpg' },
  { id: 2, name: 'AASU', logoUri: 'https://media.istockphoto.com/id/1163463923/tr/foto%C4%9Fraf/man-ak%C4%B1ll%C4%B1-telefon-el-dokunmatik-ekran-kullan%C4%B1n-proje-y%C3%B6neticisi-ara%C5%9Ft%C4%B1rma-s%C3%BCreci-i%C5%9F-ekibi.jpg?s=1024x1024&w=is&k=20&c=c9nBaegGE-Gnvmgjxs8nwgxrzlpg4M-G4u26-Aqt1ds=' },
  { id: 3, name: 'XXX', logoUri: 'https://cdn.pixabay.com/photo/2017/07/24/23/00/dumbbells-2536372_960_720.jpg' },
];

const UniversityCard = ({ name, logoUri }) => {
  const translateX = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      speed: 1,
      bounciness: 10,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.universityCard, { transform: [{ translateX }] }]}>
      <Image source={{ uri: logoUri }} style={styles.universityLogo} />
      <Text style={styles.universityName}>{name}</Text>
    </Animated.View>
  );
};

const UniversitiesSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Universities</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {universities.map((university) => (
          <UniversityCard key={university.id} name={university.name} logoUri={university.logoUri} />
        ))}
      </ScrollView>
    </View>
  );
};

export default UniversitiesSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#ff6f00', // Accent color for the "See all" link
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  universityCard: {
    backgroundColor: '#fff',
    borderRadius: 16, // Adjusted for a partial rounded border
    paddingVertical: 7,
    paddingHorizontal: 11, // Match the requested padding
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 120, // Updated width
    height: 50, // Updated height
    gap: 0,
    shadowColor: '#698296',
    shadowOffset: {
      width: 1, // Mimicking the box-shadow's x-offset
      height: 3, // Mimicking the box-shadow's y-offset
    },
    shadowOpacity: 0.1, // Corresponds to lighter shadow opacity (0D, 0A, etc.)
    shadowRadius: 6, // Matches the spread radius
    elevation: 5, // For Android shadow
  },
  universityLogo: {
    width: 40,
    height: 40,
    marginRight: 10, 
    borderRadius: 30, 
     resizeMode: 'cover',
    overflow: 'hidden',
  },
  universityName: {
    fontSize: 16,
    textAlign: 'left',
    color: '#333',
  },
});

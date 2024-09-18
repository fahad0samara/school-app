import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import styles from './styles';



interface Course {
  id: string;
  title: string;
  instructor: string;
  status: string; 
  image: any; // Use imported image
}

interface ListMyCourseProps {
  data: Course[];
  nextPage: () => void;
  refreshScreen: JSX.Element;
  refreshing: boolean;
  showFooter: boolean;
  navigation: any;
}

const ListMyCourse: React.FC<ListMyCourseProps> = ({
  data,
  nextPage,
  refreshScreen,
  refreshing,
  showFooter,
  navigation,
}) => {
  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Image source={item.image} style={styles.courseImage} /> 
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <Text style={styles.courseStatus}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderCourseItem}
      keyExtractor={(item) => item.id}
      onEndReached={nextPage}
      onEndReachedThreshold={0.5}
      refreshControl={refreshScreen}
      ListFooterComponent={showFooter ? <Text style={styles.footerText}>Loading more...</Text> : null}
      refreshing={refreshing}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ListMyCourse;

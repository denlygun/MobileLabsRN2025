import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function NewsItem() {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: 'https://via.placeholder.com/80' }} />
      <View>
        <Text style={styles.title}>Заголовок новини</Text>
        <Text>Дата новини</Text>
        <Text>Короткий текст новини</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginBottom: 12 },
  image: { width: 80, height: 80, marginRight: 12 },
  title: { fontWeight: 'bold' },
});

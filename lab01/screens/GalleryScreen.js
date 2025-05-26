import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function GalleryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[...Array(12)].map((_, i) => (
        <View key={i} style={styles.item}></View>
      ))}
      <Text style={styles.footer}>Лигун Денис Андрійович, ІПЗ-23-3</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ccc',
    marginBottom: 12,
    borderRadius: 10,
  },
  footer: {
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
  },
});

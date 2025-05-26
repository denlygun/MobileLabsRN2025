import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import NewsItem from '../components/NewsItem';

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Новини</Text>
      {[...Array(6)].map((_, i) => <NewsItem key={i} />)}
      <Text style={styles.footer}>Лигун Денис Андрійович, ІПЗ-23-3</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  footer: { marginTop: 20, textAlign: 'center', color: '#666' },
});

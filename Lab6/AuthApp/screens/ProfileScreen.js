import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        Alert.alert("Помилка", "Профіль не знайдено");
      }
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Завантаження профілю...</Text>
        </View>
    );
  }

  if (!profile) {
    return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Профіль не знайдено</Text>
        </View>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {profile.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Вік:</Text>
                  <Text style={styles.infoValue}>{profile.age} років</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Місто:</Text>
                  <Text style={styles.infoValue}>{profile.city}</Text>
                </View>
              </View>

              <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("EditProfile", { profile })}
              >
                <Text style={styles.editButtonText}>Редагувати профіль</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Вийти з акаунта</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => navigation.navigate("DeleteAccount")}
              >
                <Text style={styles.deleteButtonText}>Видалити акаунт</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoContainer: {
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 18,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
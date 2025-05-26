import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as FileSystem from 'expo-file-system';
import HomeScreen from './screens/HomeScreen';
import FileViewer from './screens/FileViewer';

const Stack = createNativeStackNavigator();
const ROOT_DIR = FileSystem.documentDirectory + 'AppData';

export default function App() {
  const [rootReady, setRootReady] = useState(false);

  useEffect(() => {
    const prepareRoot = async () => {
      const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
      }
      setRootReady(true);
    };
    prepareRoot();
  }, []);

  if (!rootReady) return null;

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FileManager" options={{ title: 'Файловий Менеджер' }}>
            {props => <HomeScreen {...props} rootPath={ROOT_DIR} />}
          </Stack.Screen>
          <Stack.Screen name="FileViewer" component={FileViewer} options={{ title: 'Перегляд файлу' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

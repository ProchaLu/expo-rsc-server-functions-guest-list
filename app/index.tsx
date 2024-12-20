import GuestItem from '@/components/GuestItem';
import { colors } from '@/constants/colors';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: '100%',
  },
  text: {
    color: colors.text,
    fontFamily: 'Poppins_400Regular',
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});

type User = {
  id: string;
  firstName: string;
  lastName: string;
  attending: boolean;
};

export default function App() {
  const [guests, setGuests] = useState<User[]>([
    {
      id: '1',
      firstName: 'Peter',
      lastName: 'Flores',
      attending: true,
    },
    {
      id: '2',
      firstName: 'Maria',
      lastName: 'Garcia',
      attending: false,
    },
  ]);
  const [loaded, error] = useFonts({
    Poppins_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const renderItem = (item: { item: User }) => <GuestItem guests={item.item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: User) => String(item.id)}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

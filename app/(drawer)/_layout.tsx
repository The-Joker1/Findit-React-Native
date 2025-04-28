import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawerContent(props : any ) {
  const colorScheme = useColorScheme();
  
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom drawer header/user info */}
      <View style={styles.drawerHeader}>
        <Text style={[styles.drawerTitle, {color: Colors[colorScheme ?? 'light'].text}]}>
          FindIt App
        </Text>
      </View>
      
      {/* Default drawer items */}
      <DrawerItemList {...props} />
      
      {/* Custom drawer items */}
      <Pressable 
        style={styles.logoutButton}
        onPress={() => {
          // Handle logout or drawer close
          props.navigation.closeDrawer();
        }}
      >
        <FontAwesome 
          name="sign-out" 
          size={24} 
          color={Colors[colorScheme ?? 'light'].text} 
        />
        <Text style={[styles.logoutText, {color: Colors[colorScheme ?? 'light'].text}]}>
          Logout
        </Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      drawerContent={(props : any ) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: ({ color }: { color: string }) => <FontAwesome name="home" size={24} color={color} />,
          headerShown: false, // Hide header for tabs as tabs have their own headers
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color }: { color: string }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 32,
    fontSize: 16,
  }
});

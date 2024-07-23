// navigation/AppNavigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import PlaySampleScreen from '../screens/PlaySampleScreen';


import MusicAtLocationScreen from '../screens/MusicAtLocationScreen';
// import { useColorScheme } from 'react-native';
import { colors, getStyles } from '../styles'
// import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Button, useColorScheme, Dimensions } from 'react-native';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CenterTabIcon = () => {
  return (
    <View
      style={{
        flex: 2, // Center tab takes more space
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../assets/logo-white.png')} // Use your center tab icon
        style={{ width: 50, height: 50 }} // Adjust the size as needed
      />
    </View>
  );
};
function LocationSampleStack(props) {
  const { mode, styles, colors } = props;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Music Near Me"
      options={{
        headerStyle: {
          backgroundColor: colors[mode].bgColor, // Change the background color here
        },
        headerTitleStyle: {
          color: colors[mode].fgColor, // Change the title text color here
        },
      }}
      >
        {(screenProps) => (
          <MusicAtLocationScreen {...screenProps} mode={mode} styles={styles} colors={colors} />
        )}
      </Stack.Screen>
      <Stack.Screen name="PlaySample"
      options={{
        headerStyle: {
          backgroundColor: colors[mode].bgColor, // Change the background color here
        },
        headerTitleStyle: {
          color: colors[mode].fgColor, // Change the title text color here
        },
      }}>
        {(screenProps) => (
          <PlaySampleScreen {...screenProps} mode={mode} styles={styles} colors={colors} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default function AppNavigation(props) {
  const { mode, colors, styles } = props
  return (
    <View style={{
      flex: 1,
      // padding: 10, // Add padding here
      justifyContent: 'center', // Center the content vertically
    }}>

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: colors[mode].bgColor, // Set the background color here
              headerShown: false,
              paddingBottom: 0,
              paddingTop: 0,

            },
            tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,
            tabBarActiveTintColor: colors.whiteColor
          }}


        >
          <Tab.Screen
            name="Map"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('../assets/tab-map-white.png')}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
              headerStyle: {
                backgroundColor: colors[mode].bgColor, // Change the background color here
              },
              headerTitleStyle: {
                color: colors[mode].fgColor, // Change the title text color here
              },
              tabBarShowLabel: false,
              title: "Map",
              headerTransparent: false,
            }}
          >
            {() => <MapScreen mode={mode} styles={styles} colors={colors} />}
          </Tab.Screen>
          <Tab.Screen
            name="Samples at Location"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('../assets/logo-white.png')}
                  style={{ tintColor: color, width: 100, height: size }}
                />
              ),
              headerStyle: {
                backgroundColor: colors[mode].bgColor, // Change the background color here
              },
              headerTitleStyle: {
                color: colors[mode].fgColor, // Change the title text color here
              },
              tabBarShowLabel: false,
              headerShown: false,
              headerTransparent: false
            }}
          >
            {() => <LocationSampleStack mode={mode} styles={styles} colors={colors} />}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('../assets/tab-profile-white.png')}
                  style={{ tintColor: color, width: size, height: size }}
                />
              ),
              headerStyle: {
                backgroundColor: colors[mode].bgColor, // Change the background color here
              },
              headerTitleStyle: {
                color: colors[mode].fgColor, // Change the title text color here
              },
              tabBarShowLabel: false,
              title: "Profile",
              headerTransparent: false
            }}
          >
            {() => <ProfileScreen mode={mode} styles={styles} colors={colors} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

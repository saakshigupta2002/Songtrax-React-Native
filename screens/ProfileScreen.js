import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Dimensions, useColorScheme, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, getStyles } from '../styles';
import WebView from 'react-native-webview';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen(props) {
  const { mode, styles, colors } = props;

  // State to manage the selected image and the user's name
  const [image, setImage] = useState(null);
  const [name, setName] = useState(''); // Initialize name state

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);
      }
    }
  };
   // Save the image and name to AsyncStorage when they change
  useEffect(() => {
    async () => {
      if (image !== null) {
        await AsyncStorage.setItem('profileImage', image);

      }
      AsyncStorage.setItem('profileName', name); // Save the name

    }
  }, [image, name]);
// Load the user's saved name from AsyncStorage
  useEffect(() => {
    const loadSavedName = async () => {
      const savedName = await AsyncStorage.getItem('profileName');
      if (savedName) {
        setName(savedName);
      }
    };
    loadSavedName();
  }, []);
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>Edit Profile</Text>
      <Text style={styles.profileText}>Mirror, Mirror on The Wall...</Text>

      <View style={styless.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.photoFullImage}
          />
        ) : (
          <Image
            source={require('../assets/icon-smiley-darkpurple.png')} // Replace with the actual path to your blank image in the assets folder
            style={styles.photoFullImage}
          />
        )}
        <TouchableOpacity >
          <Text style={styles.addPhoto} onPress={pickImage}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name} // Set the value of the input to the 'name' state
        onChangeText={(text) => setName(text)} // Update 'name' state when input changes
      />
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  portraitImage: {
    width: 400, // Adjust the width as needed
    height: 400, // Adjust the height as needed
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  input: {
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});



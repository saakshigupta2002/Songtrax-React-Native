import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { fetchAllLocations, fetchSamples, convertToDate } from '../apiRequests';
import { getDistance } from 'geolib';

import * as Location from 'expo-location';

export default function MusicAtLocationScreen({ mode, styles, colors, navigation }) {
    const [isLoading, setIsLoading] = useState(true) //Store data of all the location

    //Hard coded current location for testing purpose
    const [currentLocation, setCurrentLocation] = useState(null)
    const [nearByLocation, setNearByLocation] = useState(null)
    const [samplesList, setSamplesList] = useState([])
    const [reloadSwitch, setReloadSwitch] = useState(false) //trigger when user press reload button


    const colorScheme = useColorScheme()
    useEffect(() => {
        (async () => {
            //Getting permission for checking location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            //Actual current location
            let location = await Location.getCurrentPositionAsync({})
            setCurrentLocation(location.coords)
            
            // Dummy current location near central library for development purpose
            setCurrentLocation({
                latitude: -27.4961531,
                longitude: 153.0133944,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

        })();
    }, []);
    useEffect(() => {
        (async () => {

            try {
                //Fetching all the locations from API to mark circles on map
                if (currentLocation) {
                    const locationsFromAPI = await fetchAllLocations()

                    for (const location of locationsFromAPI) {
                        //Check the distance of location from current location
                        const distance = getDistance(currentLocation, {
                            latitude: parseFloat(location.latitude),
                            longitude: parseFloat(location.longitude),
                        });
                        // console.log("Distance: ", distance)
                        if ((distance <= 100) && (location.sharing == true)) {
                            setNearByLocation(location);
                            const allSamples = await fetchSamples(location.id)
                            setSamplesList(allSamples)
                            break; // Exit the loop once a nearby location is found
                        }
                    }
                    setIsLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        })();
    }, [currentLocation]);

    // console.log("Current loc: ", currentLocation)

    return (
        <ScrollView style={styles.nearbyAndPlayContainer}>
            {
                isLoading &&
                <View style={styles.location}>
                    <Text style={styles.locationHeading}>Loading ....</Text>
                </View>
            }
            {
                (!isLoading && (nearByLocation === null)) &&
                <View style={styles.header}>
                    <Text style={styles.locationHeading}>No music nearby. Check the map to see music locations</Text>
                </View>
            }
            {
                (!isLoading && (nearByLocation !== null)) &&
                <View style={styles.location}>
                    {mode == "dark" &&
                        <Image
                            source={require('../assets/icon-pin-lightpurple.png')} // Replace with the actual image source
                            style={styles.locationIcon}
                        />
                    }
                    {mode == "light" &&
                        <Image
                            source={require('../assets/icon-pin-darkpurple.png')} // Replace with the actual image source
                            style={styles.locationIcon}
                        />
                    }
                    <Text style={styles.locationHeading}>{nearByLocation.name}</Text>
                </View>

            }
            {(!isLoading && (nearByLocation !== null)) && samplesList.map((item) => (
                <View
                    key={item.id}
                    style={styles.songContainer}

                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PlaySample', { sampleData: item, location: nearByLocation })}
                        style={styles.link}
                    >
                        <Text style={styles.songName}>{item.name}</Text>
                        <Text style={styles.date}>{convertToDate(item.datetime)}</Text>
                        <Image
                            source={require('../assets/rating.webp')}
                            style={styles.starIcon}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

// const styles = StyleSheet.create({
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     largeIcon: {
//         width: 50, // Adjust the size as needed
//         height: 100, // Adjust the size as needed
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginLeft: 10,
//     },
//     songContainer: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderColor: 'gray',
//     },
//     songName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     date: {
//         fontSize: 14,
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 10,
//     },
//     starIcon: {
//         width: 200,
//         height: 30, // Adjust the size of the star icon
//         margin: 2,
//     },
//     link: {
//         backgroundColor: 'lightgray',
//         padding: 10,
//         borderRadius: 5,
//       },
//       linkText: {
//         fontSize: 18,
//       },
// });


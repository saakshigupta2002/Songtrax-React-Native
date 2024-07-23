import React, { useState, useEffect } from 'react';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { View, Text, Button, Dimensions } from 'react-native';
import { fetchAllLocations } from '../apiRequests';


export default function MapScreen(props) {
  const {mode, colors, styles} = props
  
  //Hard coded current location for testing purpose
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -27.497210,
    longitude: 153.013981,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  //To store the list of locations got from API
  const [allLocation, setAllLocation] = useState([])


  //Map style if there is dark theme
  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
  const lightMapStyle = []

  useEffect(() => {
    (async () => {
      //Fetching all the locations from API to mark circles on map
      const locationsFromAPI = await fetchAllLocations()
      setAllLocation(locationsFromAPI)

      //Getting permission for checking location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // We can get real current location by following line of code
      let location = await Location.getCurrentPositionAsync({})
      setCurrentLocation(location)

      //Setting hard coded location instead of real location for development purpose
      // setCurrentLocation({
      //   latitude: -27.497210,
      //   longitude: 153.013981,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      
      {currentLocation ?
        <MapView
          camera={{
            center: { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            pitch: 0,
            heading: 0,
            altitude: 3000,
            zoom: 15
          }}
          style={{ flex: 1 }}
          initialRegion={currentLocation}
          customMapStyle={mode == "dark" ? darkMapStyle : lightMapStyle}
          showsUserLocation={true}
        >
          {allLocation && allLocation.map(location => {
            // console.log("Coordinates: " + typeof(Number(location.latitude)),location.longitude)
            return (location.sharing &&
              <Circle
                key={location.id}
                center={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }}
                radius={100}
                strokeWidth={3}
                strokeColor='#A42DE8'
                fillColor={
                  mode == "dark" ?
                    "rgba(128,0,128,0.5)" :
                    "rgba(210,168,210,0.5)"
                }
              />)
          })
          }
          {/* Add markers or other map components here */}
        </MapView> :
        <Text>Loading...</Text>
      }
    </View>
  );
}

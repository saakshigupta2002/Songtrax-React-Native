import React, { useState, useRef } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { Rating } from 'react-native-elements';

export default function PlaySampleScreen({ route, mode, styles }) {
    // Extract sampleData and location from the route params
    const { sampleData, location } = route.params;

    // State to track the state of the WebView
    const [webViewState, setWebViewState] = useState({
        loaded: false,
        actioned: false,
    });
    
    // Reference to the WebView component
    const webViewRef = useRef();

    // Function to handle WebView load event
    function webViewLoaded() {
        setWebViewState({
            ...webViewState,
            loaded: true
        });
    }

    // Function to handle WebView errors
    function webviewError() {
        console.error("error");
    }

    // Function to handle the Play/Stop action button press
    function handleActionPress() {
        if (!webViewState.actioned) {
            webViewRef.current.injectJavaScript("playSong()");
        } else {
            webViewRef.current.injectJavaScript("stopSong()");
        }

        // Toggle the actioned state
        setWebViewState({
            ...webViewState,
            actioned: !webViewState.actioned
        });
    }

    return (

        <View style={styles.nearbyAndPlayContainer}>
            <View style={{ display: 'none' }}>

                <WebView
                ref={ref => webViewRef.current = ref}
                originWhitelist={["*"]}
                source={{
                    uri: "https://comp2140.uqcloud.net/static/samples/index.html"
                }}
                pullToRefreshEnabled={true}
                onLoad={webViewLoaded}
                onError={webviewError}
                style={{ display: 'none'}}
            />
            </View>
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
                <Text style={styles.locationHeading}>{location.name}</Text>
            </View>


            <View
                style={{ padding: 10 }}
            >
                <Text style={styles.songTitle}>{sampleData.name}</Text>
                {
                    webViewState &&
                    <Button
                        onPress={handleActionPress}
                        title={!webViewState.actioned ? "Start Playback" : "Stop Playback"}
                        style={styles.playButton}
                    />
                }
            </View>
            <View style={styles.ratingContainer}>

            <Image
                source={require('../assets/rating.webp')}
                style={styles.starIcon}
                />
                </View>
            {/* <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                startingValue={3}
                ratingBackgroundColor="custom"
                /> */}


        </View>
    );
}

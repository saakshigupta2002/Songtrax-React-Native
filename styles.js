import { StyleSheet } from "react-native";
// Light and Dark colour schemes
export const colors = {
    purpleColorLighter: "#A42DE8",
    blueColorLighter: "#318AFF",
    blueColorDarker: "#2D3DE8",
    blackColorTranslucentLess: "rgba(0,0,0,0.35)",
    blackColorTranslucentMore: "rgba(0,0,0,0.7)",
    whiteColor: "#ffffff",
    whiteColorTranslucent: "rgba(255,255,255, 0.5)",
    "light": {
        bgColor: "#ffffff",
        fgColor: "#800080",
        songButtonColor: "#EDEDED",
        fgColorLighter: "rgba(128,0,128,0.5)",
        headerTextColor: "#ffffff"
    },
    "dark": {
        bgColor: "#422142",
        fgColor: "#f0c4f0",
        songButtonColor: "#654666",
        fgColorLighter: "rgba(210,169,210,0.5)",
        headerTextColor: "#f0c4f0",
    }
};

export function getStyles(mode, height) {
    return StyleSheet.create({
        nearbyAndPlayContainer: {
            flex: 1,
            flexDirection: "column",
            contenContainerStyle: "space-between",
            padding: 10,
            backgroundColor: colors[mode].bgColor
        },
        heading: {
            fontSize: 30,
            fontWeight: "bold",
            color: colors[mode].fgColor,
            paddingBottom: 0
        },
        subHeading: {
            fontSize: 14,
            color: colors[mode].fgColor,
            paddingBottom: 25
        },
        songName: {
            fontSize: 20,
            fontWeight: "bold",
            color: colors[mode].fgColor,
            paddingBottom: 0
        },
        location: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20
        },
        locationHeading: {
            fontSize: 30,
            fontWeight: "bold",
            color: colors[mode].fgColor,
            paddingBottom: 6
        },
        playButton: {
            backgroundColor: colors[mode].fgColor,
            color: colors[mode].bgColor,
            fontWeight: "bold",
            padding: 10,
            borderRadius: 10,
            textAlign: "center",
        },
        locationIcon: {
            width: 60,
            height: 105,
        },
        currentLocation: {
            marginBottom: 10
        },
        ratingComponent: {
            paddingTop: 15,
        },
        profileContainer: {
            padding: 20,
            backgroundColor: colors[mode].bgColor,
            flex: 1
        },
        input: {
            marginTop: 20,
            backgroundColor: colors[mode].fgColorLighter,
            color: colors[mode].fgColor,
            borderRadius: 5,
            textAlign: "center",
            height: 40
        },
        photoEmptyView: {
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors[mode].fgColorLighter,
            borderStyle: "dashed",
            height: height / 1.625
        },
        photoFullImage: {
            width: "100%",
            height: height / 2,

            borderRadius: 10
        },
        addPhoto: {
            backgroundColor: colors[mode].fgColor,
            color: colors[mode].bgColor,
            fontWeight: "bold",
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
        },
        changePhoto: {
            backgroundColor: colors[mode].fgColor,
            color: colors[mode].bgColor,
            fontWeight: "bold",
            padding: 10,
            borderRadius: 10,
            textAlign: "center",
            width: "50%",
            marginLeft: "25%",
            marginTop: -(height / 12)
        },

        // custom

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        largeIcon: {
            width: 50, // Adjust the size as needed
            height: 100, // Adjust the size as needed
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginLeft: 10,
        },
        songContainer: {
            padding: 10,
            borderBottomWidth: 1,
            borderColor: 'gray',
        },
        songName: {
            color: colors[mode].fgColor,
            fontSize: 18,
            fontWeight: 'bold',
        },
        songTitle:{
            color: colors[mode].fgColor,
            fontSize: 25,
            paddingBottom: 15,
            fontWeight: 'bold',
        },
        date: {
            color: colors[mode].fgColor,

            fontSize: 14,
        },
        ratingContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        },
        starIcon: {
            width: 200,
            height: 30, // Adjust the size of the star icon
            margin: 2,
        },
        link: {
            backgroundColor: colors[mode].songButtonColor,
            padding: 10,
            borderRadius: 5,
        },
        linkText: {
            fontSize: 18,
        },
        profileTitle: {
            color: colors[mode].fgColor,
            fontSize: 24,
            fontWeight: 'bold',
        },
        profileText: {
            color: colors[mode].fgColor,
            fontSize: 18,
            marginTop: 10,
        },
    })


}
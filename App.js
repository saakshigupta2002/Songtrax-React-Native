import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { View, Text, Button, StatusBar } from 'react-native';
import { useColorScheme, Dimensions } from 'react-native';
import { colors, getStyles } from './styles';

export default function App() {
  // Get device dimensions
  const { width, height } = Dimensions.get("window");

  // Determine the color scheme (light or dark) based on the device settings
  const mode = useColorScheme();
  // You can also set a specific mode for testing by uncommenting the line below:
  // const mode = "dark";

  // Get the status bar height (if available) or set it to 0
  const statusBarHeight = StatusBar.currentHeight || 0;

  // Get the styles based on the color mode and screen height
  const styles = getStyles(mode, height);

  return (
    <View style={{ backgroundColor: colors[mode].bgColor, flex: 1, paddingTop: statusBarHeight }}>
      {/* Render the navigation component with mode, colors, and styles */}
      <AppNavigation mode={mode} colors={colors} styles={styles} />
    </View>
  );
}

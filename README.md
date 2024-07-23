# SongTrax Mobile App

The **SongTrax** mobile app, developed using Expo and React Native, offers users an immersive music experience. With this app, users can explore, listen to, and personalize their musical journey. It provides a unique platform to discover music samples tied to specific locations, play those samples, and customize user profiles according to individual preferences.

## Platform Used

**Platform:** The SongTrax mobile app was developed primarily for the Android platform. During the development process, Expo was utilized as the primary development and testing environment. Expo offers a convenient platform for building, testing, and previewing React Native applications on both Android and iOS devices, making it easier for developers to create cross-platform apps with a focus on Android.

The app was tested and optimized for the Android operating system to ensure a seamless and responsive user experience on Android devices. This choice of platform was made to provide a wider reach to Android users and make the app accessible on a broader range of devices. Android's diverse ecosystem and user base played a significant role in this decision. The Expo development environment further facilitated the development process by offering a comprehensive set of tools, including a built-in emulator for testing the app during its creation.

## Project Structure

- **/components**: Contains a collection of reusable custom components that shape the app's UI. These components maintain consistency throughout the app, reducing redundancy and enhancing reusability.
  
- **/navigation**: Manages the app's navigation using the React Navigation library, handling the flow between different screens to ensure seamless transitions and an intuitive user experience.

- **/screens**: Houses the primary screens of the app, each serving a distinct purpose:
  - **MapScreen**: Provides users with a visual map to explore music locations.
  - **MusicAtLocationScreen**: Allows users to discover and explore a curated list of music samples available at nearby locations.
  - **PlaySampleScreen**: Users can play music samples, rate them, and explore location-specific details.
  - **ProfileScreen**: Enables users to customize their profiles by adding photos and modifying their names.

- **/styles**: Defines the app's styles and themes, ensuring a visually consistent and aesthetically pleasing interface. Supports both light and dark mode styles.

- **/assets**: Houses images and assets essential to the app's design, providing a visually engaging experience.

- **apiRequests.js**: Manages data retrieval and API integration, ensuring that the app remains connected to external data sources.

- **App.js**: The entry point of the application, responsible for integrating all components and ensuring the app's proper functioning.

## Configuration

- **API Key**: The app uses an API key for communication with external services. Configure this key in the `apiRequests.js` file.
  
- **Environment Variables**: Ensure environment-specific variables are set up correctly for development and production.

## Evidence

- **Light Theme:** [View Image](https://drive.google.com/file/d/1BVWlxaCcBqQnfHz2Wjpj4MwGgDuPeCHj/view?usp=drivesdk)
  
- **Dark Theme:** [View Image](https://drive.google.com/file/d/1BVzL18FLtNz6V4bk04-Zj6sGCXIkvino/view)

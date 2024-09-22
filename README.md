

## Day 1: Project Overview

- **Setup Navigation**: Implemented `createBottomTabNavigator` and `createStackNavigator` for app navigation.
- **Added Localization**: Integrated `react-i18next` for language support and added language switch functionality.
- **Dark Mode**: Implemented dark mode toggle with `redux` for state management.
- **UI Enhancements**: Updated styles for bottom tab navigation and added icons.

### Screens

- **Home**: Main dashboard with key features.
- **Courses**: List and details of available courses.
- **Profile**: User profile and settings.



---

### Day 2: Profile Screen and UI Enhancements

**Profile Screen Implementation:**
- Added a new screen for user profile management.
- Implemented `SettingsItem` component for profile-related settings.
- Integrated profile settings with navigation to various settings screens (e.g., Edit Profile, Notifications, Payment, Security).
- Added localization support for the Profile screen to handle different languages.

**User Interface Updates:**
- Updated `SettingsItem` component to conditionally display icons and chevrons based on the language direction (RTL for Arabic and LTR for English).
- Enhanced UI responsiveness for different language directions.
- Improved visual consistency across different screens by updating styles and adding appropriate icons.

---



**Day 3: Forgot Password Functionality and Enhancements**  
**Forgot Password Feature:**  
- Created several new components to handle the "Forgot Password" process:
  - `ForgotPasswordEmail.tsx`: Implemented a screen for users to reset their password using their email.
  - `ForgotPasswordMethods.tsx`: Developed a screen to choose between email and phone number for password recovery.
  - `ForgotPasswordPhoneNumber.tsx`: Created a screen for users to reset their password via phone number.
  - `OTPVerification.tsx`: Added a screen to handle OTP verification for secure password reset.

**Illustrations and Assets:**  
- Added a new illustration (`forgotpassword.svg`) to enhance the UI for the password recovery screens.
- Updated the constants file (`illustrations.ts`) to include new assets for easy access throughout the app.

**Utility Updates:**  
- Created a new utility file (`AppIcon.tsx`) to manage icons efficiently across the app, allowing for consistent styling and easy updates.

---

### Day 4:


- **Create New Password Screen**: Implemented the localization for the `CreateNewPassword` screen in both English and Arabic. Added translations for text elements such as "Create Your New Password," "New Password," "Confirm Password," and others.
- **UI Enhancements**: Updated the modal and input fields to support localization, ensuring that the text aligns correctly for both RTL (Arabic) and LTR (English) languages.
- **Refactoring**: Cleaned up the `CreateNewPassword` component code to utilize the `useTranslation` hook for better management of translations across the screen.
- **Testing**: Conducted tests to verify the new password creation process, ensuring all text is correctly translated and displayed based on the selected language.

---
### Day 5: Course Details Screen with Video Player

**Course Details Screen Implementation:**
- Created the `CourseDetails` screen to display detailed information about a course, including:
  - Course title, description, and pricing.
  - Teacher information with an avatar image and teacher's name.
  - Lessons displayed in a collapsible accordion format.

**Video Player:**
- Integrated a video player using the `expo-av` library to allow users to view course-related videos directly within the course details screen.
- Added custom controls (play, pause, skip forward/backward) using `Ionicons` icons.
- Enabled fullscreen mode for the video player to enhance the viewing experience.
- Styled the video player and controls to match the app’s overall design, with custom play/pause and skip buttons displayed below the video.

**Accordion for Lessons:**
- Added an accordion component for displaying the lessons section.
  - Each week of lessons can be expanded or collapsed to show videos and documents associated with that week.
  - Used icons and headers for each lesson with placeholders for video and document count.

---

## Day 6: Video Screen Implementation

### Video Playback Features
- **Custom Video Controls**: Implemented custom playback controls instead of native controls, enhancing user experience.
- **Playback Speed Options**: Added buttons to change playback speed (0.5x, 1x, 1.5x, 2x) directly on the video screen, allowing users to adjust speed as desired.
- **Seek Buttons**: Implemented buttons for skipping forward and backward by 10 seconds for easier navigation through the video.

### User Interface Enhancements
- **Visibility Toggle for Controls**: Added functionality to show controls only when the user touches the screen, improving visual clarity during playback.
- **Slider Customization**: Styled the slider to be smaller yet visually appealing, maintaining functionality while minimizing screen space usage.
- **Animated Progress Bar**: Incorporated an animated progress bar that visually indicates playback progress, enhancing user engagement.

---







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

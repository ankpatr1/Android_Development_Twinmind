# Welcome to Android  app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.


Here is my Build link : https://expo.dev/accounts/apatra06/projects/android-development-twinmind-main/builds/36413b88-828f-40f4-b748-341292c9b14c


you can download app from .apk folder: Universial.apk 



####################################################################################################

##CLI Which i used in this project ##

⚙️ Step-by-Step CLI Workflow
1. Initialize and Configure the Expo Project

npm install --global eas-cli
npx create-expo-app android-development-twinmind-main
cd android-development-twinmind-main
eas init --id <your-project-id>

2. Build the App Bundle (.aab)
eas build --platform android --profile production


3. Download Bundletool
curl -o bundletool.jar https://github.com/google/bundletool/releses/download/1.15.6/bundletool-all-1.15.6.jar

4. Generate Debug Keystore (if not already present)
mkdir -p ~/.android
keytool -genkey -v -keystore ~/.android/debug.keystore \
  -storepass android -alias androiddebugkey -keypass android \
  -keyalg RSA -keysize 2048 -validity 10000

5. Convert .aab to .apk using Bundletool
java -jar bundletool.jar build-apks \
  --bundle=my-app.aab \
  --output=my-app.apks \
  --ks=~/.android/debug.keystore \
  --ks-key-alias=androiddebugkey \
  --ks-pass=pass:android \
  --key-pass=pass:android \
  --mode=universal
6. Extract the APK from the Archive
unzip my-app.apks
7. Install the APK on an Android Device
 adb devices
adb install universal.apk
adb install -r universal.apk





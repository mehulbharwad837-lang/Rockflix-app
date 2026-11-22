# Rockflix-app
Free movie app rockflix

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The app can be installed from the browser menu on supported devices.

## Android TV

The Android project is available in `android/` and supports Android TV Leanback launcher navigation.

Build and sync the web app:

```bash
npm run android:sync
```

Build the debug APK:

```bash
cd android
./gradlew assembleDebug
```

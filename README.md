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

## Live TMDB catalog

Create a local `.env.local` file and add a TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Then run `npm run android:sync` or `npm run build`. Do not commit `.env.local`.

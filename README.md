<div align="center">
  <h1 style="color: #fa5aca; font-size: 50px; font-weight: bold;">TennisTracker</h1>
  <p>Kurssin Mobiiliohjelmointi -lopputyö
</div>

## Projektista

### Käytetyt teknologiat
- [![React-Native][React-Native]][React-Native-url]
- [![Expo][Expo]][Expo-url]
- [![Firebase][Firebase]][Firebase-url]

Projekti on luotu Expolla ja kirjoitettu React Nativella. Tiedontallennus tapahtuu Firebasen Realtime tietokantaan.

Tärkeitä komponenttikirjastoja ovat olleet esimerkiksi [React Navigation][React-Navigation-url], [React Native Elements][React-Native-Elements-url] ja [React Native Paper][React-Native-Paper-url]

## Asennus
1. Kloonaa repository
  ```sh
  git clone https://github.com/laurireis/tennis-tracker.git
  ```
1. Asenna tarvittavat paketit
  ```sh
  npm install
  ```
1. Luo projektin juureen `.env` -tiedosto, johon lisäät seuraavat tiedot Firebase Realtime tietokannastasi
```
API_KEY=
AUTH_DOMAIN=
DATABASE_URL=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=
```
1. Sovelluksen käynnistys
```sh
npx expo start
```
1. Skannaa terminaaliin tuleva QR-koodi kamerasovelluksella (iOS) tai Expo-sovelluksella (Android)

## Käyttöliittymä
<p float="left">
<img src="src/img/home.png" width="40%" height="40%" />
<img src="src/img/game.png" width="40%" height="40%" />
<img src="src/img/games.png" width="40%" height="40%" />
<img src="src/img/stats.png" width="40%" height="40%"> /
</p>

[⬆️ Takaisin ylös](#projektista)
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React-Native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-Native-url]: https://reactnative.dev/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev/ 
[Firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/
[React-Navigation-url]: https://reactnavigation.org/
[React-Native-Elements-url]: https://reactnativeelements.com/
[React-Native-Paper-url]: https://reactnativepaper.com/
[node-url]: https://nodejs.org/en
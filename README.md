# Hackberry Expo

- Generate a new repository with the same directory structure and files as an this [template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
- Add branches: `dev`, `test`, `main`

## Stack

- React-Native with Typescript 4
- Expo with managed workflow using EAS Build and Expo-dev-client
- Yarn for package management
- [Jest](https://jestjs.io/docs/getting-started#using-typescript) with ts-jest for testing
- Redux for state management with the [Redux-Toolkit](https://redux-toolkit.js.org/tutorials/typescript) implementation
- Persist state with the [Redux-Persist](https://github.com/rt2zz/redux-persist) implementation
- [Styled Components](https://styled-components.com/docs/basics#react-native) for css-like react-native component styling
- Axios for API-client functionality
- [React Navigation](https://reactnavigation.org/)
- Github Actions for continuous integration
- [Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates) for monitoring and updating package versions

## Setup for running locally

### Prerequisites / first time:

- For all development you need to have Node v.14.x installed globally (by for example using [Homebrew](https://formulae.brew.sh/formula/node@14) or [NVM](https://github.com/nvm-sh/nvm#intro))
- You also need Yarn installed globally.
- First time you pull down the codebase you need to run first `yarn install`.
- Developing a React-Native app Expo with EAS Build and a custom dev-client requires some understanding of how these services work. If you're not familiar with [Expo](https://docs.expo.dev/), [EAS](https://docs.expo.dev/eas/), [expo-dev-client](https://docs.expo.dev/development/getting-started/), [native vs. js-functionality](https://docs.expo.dev/workflow/publishing/#limitations) etc, you will need to read up on this.
- Create a .env-file by cpying .env.sample-file and fill it with the required properties. All changes to the .env-file need an expo cache clear in order to take effect. (`expo start --dev-client --clear`)

### For Windows users

- Before you pull down the repo from Github - make sure your line ending settings are set up to not differ from Mac/Unix ones:
  `git config --global core.autocrlf false`

### Local development

Developing a React-Native application using Expo's new dev client requires two steps:

1. Creating a "Custom Development Client" (also called "native shell")
2. Loading a js-bundle served by your local computer from the native shell

How to do this works a bit differently depending on which device you want to use for debugging. Real Android or iOS devices are always recommended for debugging, but simulators should work too.
See [the expo documentation](https://docs.expo.dev/build/internal-distribution/) if you have any issues with steps below:

#### For Android real device:

1. Make sure your android device has the ["Developer options" setting turned on](https://developer.android.com/studio/debug/dev-options)
2. On your desired debugging device: download the latest native shell build from [the expo project page](https://expo.dev/accounts/dj_icebear/projects/esterapp/builds?platform=ANDROID). It should be a .apk file
3. Install the .apk-file and open the app. You should now see the expo-dev-client starting screen. [Looks like this](https://docs.expo.dev/static/images/dev-client-launcher.png)
4. Now start the Dev-client (see "Starting the Dev Client")

#### For iOS real device:

1. Run `eas device:create` to register your real device to the ad hoc provisioning profile we'll be using for internal distribution.
2. We now need to create a new build that has the updated provisioning profile attached. Do this by running:
   `eas build --profile development --platform ios`. You'll need to run this build locally, since the regular builds by Github Actions runs with the `--non-interactive` flag, which omits adding new devices to the profile.
3. After this build has finished - find it on: [the expo project page](https://expo.dev/accounts/estercare/projects/esterapp/builds?platform=IOS)
4. Open the link to a specific build on your iPhone device. This will install the dev-client on your device.
5. Opening the app at this point [should look like this](https://docs.expo.dev/static/images/dev-client-launcher.png)
6. Now start the Dev-client (see "Starting the Dev Client")

#### Starting the Dev Client

1. Next step is to run `expo start --dev-client` on your computer. This starts a local server that serves and updates the js-bundle to your dev-client.
2. If you're on the same network with both server and client, your js-server should pop up in the dev-client. If it doesn't, you can use your phone to scan the QR-code from the terminal output you got when you ran `expo start --dev-client`.
3. Done! Your app should live-reload automatically if you change any js-file inside the `src` folder.

### Continuous Integration

Opening a Pull-Request will automatically run tests.

To add a new environment variable:

- Add it to your local .env-file (and clear the cache with --clear for it to take effect)
- Make sure it's added as an extra from environment variables in app.config.js
- Add it to the EnvironmentVariable type and check in env.ts
- Add it as environment variables to any workflows where it's needed

### Create iOS app environment

- Create a new [identifier](https://developer.apple.com/) in the apple developer portal.
  - Go to Account, Certificates, Identifiers & Profiles then Identifiers
  - Add new Identifiers
- Create a new [app](https://appstoreconnect.apple.com/) in app store connect which uses the new identifier.
  - Set SKU to BundleID
- In eas.json, add new environment to [build object](https://docs.expo.dev/build/eas-json/) and to the [submit object](https://docs.expo.dev/submit/eas-json/).
- Add ascAppId to `eas.json`: [How to find ascAppid?](https://github.com/expo/fyi/blob/main/asc-app-id.md)

eas.json:

```
   "build":
      ...
      "<newEnvironmentName>": {
      "node": "14.18.0",
      "releaseChannel": "<newEnvironmentName>",
      "env": {
         "EXPO_BUILD_ENV": "<newEnvironmentName>",
         "API_HOST": "<API_HOST>"
         }
   },
   "submit": {
      ...
      "<newEnvironmentName>": {
         "ios": {
         "appleId": string,
         "ascAppId": string,
         "appleTeamId": string
         }
         "android": REDACTED
      }
   }
```

- Add new iOS enviroment to [firebase](https://firebase.google.com/).
- Export `GoogleService-Info.plist` from firebase to `./src/config/`
- Update `.github/workflows/native-shell.yml`'s inputs to include new environment
  - Optional: setup OTA action for new enviroment
- In `app.config.js` update the `getGoogleServicesFiles` function to use the newely created `GoogleService-Info.plist` file.

  - Update `app.config.js` functions dependent on the `EXPO_BUILD_ENV` variable.

- Create build & generate apple certificates.
  - Run in terminal:

```
eas build --profile <newEnviromentName> --platform ios --auto-submit
```

### Create android app environment

- Documentation requires iOS, then android, to be setup in tandem.

To add and deploy a new environment to the play store:

- Create a new [app](https://play.google.com/intl/au/console/about/)
- In eas.json, add desired release track and status to the [submit object](https://docs.expo.dev/submit/eas-json/).

eas.json:

```
   "submit": {
      ...
      "<newEnvironmentName>": {
         "ios": REDACTED
         "android": {
            "track": "internal",
            "releaseStatus": "completed"
            },
      }
   }
```

- Add new android enviroment to firebase.
- Export `GoogleService-Info.json` from firebase to `./src/config/`
- In `app.config.js` update the `getGoogleServicesFiles` function to use the newely created `GoogleService-Info.json` file.

  - Update `app.config.js` functions dependent on the `EXPO_BUILD_ENV` variable.

- Create build & generate apple certificates.
  - Run in terminal:

```
eas build --profile <newEnviromentName> --platform android
```

- Download app bundle from [Expo](https://expo.dev/) and upload file to the closed testing track in [play console](https://play.google.com/intl/au/console/about/).

### Github Actions deployment

- In `app.config.js` bump the minor version number for key `version` when changing github action workflows to ensure latest deployment receives the highest version code.

### Debugging with Redux Devtools

#### Install React Native Debugger

To install the app, you can download a prebuilt binary from the [release page](https://github.com/jhen0409/react-native-debugger/releases).

For macOS, you can use Homebrew Cask to install:

```
brew update && brew install --cask react-native-debugger
```

#### Run Debugger

Run your project with `yarn start`.
Open developer menu by shaking device or longpress three fingers on screen.
In the developer menu enable Debug remote JS. The debugger should automatically connect.
Start debugger in React Native Debugger App by running `yarn rndebugger` in terminal.

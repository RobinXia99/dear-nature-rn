import 'dotenv/config'
// These are required to be present when building a new app shell using eas build
const BUILD_TIME_VARS = {
  BUILD_NUMBER: process.env.BUILD_NUMBER,
}

const RUN_TIME_VARS = {
  API_HOST: process.env.API_HOST,
  EXPO_BUILD_ENV: process.env.EXPO_BUILD_ENV,
  GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA,
}

export default () => {
  return {
    expo: {
      owner: 'h4ckb3rry',
      name: `Hack${getNameSuffix(RUN_TIME_VARS.EXPO_BUILD_ENV)}`,
      slug: 'hackberry-expo',
      version: `0.1.${BUILD_TIME_VARS.BUILD_NUMBER}`,
      runtimeVersion: '1',
      orientation: 'portrait',
      icon: getAdaptiveIcon(RUN_TIME_VARS.EXPO_BUILD_ENV).foregroundImage,
      scheme: `hackberry-expo${getLinkingSchema(RUN_TIME_VARS.EXPO_BUILD_ENV)}`,
      userInterfaceStyle: 'automatic',
      splash: {
        image: './src/assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      updates: {
        fallbackToCacheTimeout: 0,
      },
      assetBundlePatterns: ['**/*'],
      ios: {
        supportsTablet: false,
        bundleIdentifier: `com.hackberry.app${getBundleIdSuffix(RUN_TIME_VARS.EXPO_BUILD_ENV)}`,
        // googleServicesFile: getGoogleServicesFiles(RUN_TIME_VARS.EXPO_BUILD_ENV).plist,
        infoPlist: {
          CFBundleDevelopmentRegion: 'sv',
        },
        config: {
          usesNonExemptEncryption: false,
        },
      },
      android: {
        // googleServicesFile: getGoogleServicesFiles(RUN_TIME_VARS.EXPO_BUILD_ENV).json,
        adaptiveIcon: getAdaptiveIcon(RUN_TIME_VARS.EXPO_BUILD_ENV),
        versionCode: Number(BUILD_TIME_VARS.BUILD_NUMBER | 1),
        package: `com.hackberry.app${getBundleIdSuffix(RUN_TIME_VARS.EXPO_BUILD_ENV)}`,
      },
      extra: {
        ...RUN_TIME_VARS,
      },
    },
  }
}

const getAdaptiveIcon = (env) => {
  if (env === 'dev') {
    return { foregroundImage: './src/assets/images/icon.png', backgroundColor: '#301500' }
  }
  if (env === 'test') {
    return {
      foregroundImage: './src/assets/images/icon.png',
      backgroundColor: '#1b1b1b',
    }
  }
  return { foregroundImage: './src/assets/images/icon.png', backgroundColor: '#101a31' }
}

const getBundleIdSuffix = (env) => {
  if (env === 'dev') return '.dev'
  if (env === 'test') return '.test'
  return ''
}

const getNameSuffix = (env) => {
  if (env === 'dev') return ' Dev'
  if (env === 'test') return ' Test'
  return 'Berry'
}

const getLinkingSchema = (env) => {
  if (env === 'dev') return 'dev'
  if (env === 'test') return 'test'
  return ''
}

// const getGoogleServicesFiles = (env) => {
//   if (env === 'dev')
//     return { plist: './src/config/GoogleService-Info-dev.plist', json: './src/config/google-services-dev.json' }
//   if (env === 'test')
//     return { plist: './src/config/GoogleService-Info-test.plist', json: './src/config/google-services-test.json' }
//   if (env === 'production')
//     return { plist: './src/config/GoogleService-Info.plist', json: './src/config/google-services.json' }
//   return ''
// }

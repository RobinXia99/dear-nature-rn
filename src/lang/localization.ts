import en from './en.json'
import sv from './sv.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export enum Languages {
  en = 'en',
  sv = 'sv',
}

const resources = {
  en,
  sv,
}

export const i18next = i18n.use(initReactI18next).init({
  fallbackLng: Languages.sv,
  compatibilityJSON: 'v3',
  debug: false,
  resources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
})

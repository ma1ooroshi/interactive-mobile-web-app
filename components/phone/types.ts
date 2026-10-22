export type Tone = 'light' | 'dark'

export type PhoneSettings = {
  wifi: boolean
  airplane: boolean
  brightness: number
}

export type AppProps = {
  settings: PhoneSettings
  onSettingsChange: (settings: PhoneSettings) => void
  onLock: () => void
}

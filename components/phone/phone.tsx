'use client'

import { useState } from 'react'
import { APPS, type AppId } from './apps/registry'
import { DeviceFrame } from './device-frame'
import { HomeIndicator } from './home-indicator'
import { HomeScreen } from './home-screen'
import { LockScreen } from './lock-screen'
import { PasscodeScreen } from './passcode-screen'
import { StatusBar } from './status-bar'
import type { PhoneSettings } from './types'

type Screen = { type: 'lock' } | { type: 'passcode' } | { type: 'home' } | { type: 'app'; id: AppId }

export function Phone() {
  const [screen, setScreen] = useState<Screen>({ type: 'lock' })
  const [settings, setSettings] = useState<PhoneSettings>({ wifi: true, airplane: false, brightness: 100 })

  const lock = () => setScreen({ type: 'lock' })
  const goHome = () => setScreen((s) => (s.type === 'lock' ? { type: 'passcode' } : s.type === 'passcode' ? s : { type: 'home' }))

  const app = screen.type === 'app' ? APPS[screen.id] : null
  const AppComponent = app?.component
  const tone = app?.tone ?? 'light'

  return (
    <DeviceFrame onPowerPress={() => (screen.type === 'lock' ? setScreen({ type: 'passcode' }) : lock())}>
      <div className="absolute inset-0" style={{ filter: `brightness(${settings.brightness}%)` }}>
        <StatusBar tone={tone} settings={settings} />

        {screen.type === 'lock' && <LockScreen onUnlock={() => setScreen({ type: 'passcode' })} />}
        {screen.type === 'passcode' && <PasscodeScreen onSuccess={() => setScreen({ type: 'home' })} onCancel={lock} />}
        {screen.type === 'home' && <HomeScreen onOpenApp={(id) => setScreen({ type: 'app', id })} />}
        {app && AppComponent && (
          <section
            key={app.id}
            aria-label={app.name}
            className="absolute inset-0 animate-in fade-in zoom-in-90 duration-300"
          >
            <AppComponent settings={settings} onSettingsChange={setSettings} onLock={lock} />
          </section>
        )}

        <HomeIndicator tone={tone} onPress={goHome} />
      </div>
    </DeviceFrame>
  )
}

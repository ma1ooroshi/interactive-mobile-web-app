import type { ComponentType } from 'react'
import { Calculator, Calendar, Camera, CloudSun, Image as ImageIcon, MessageCircle, Phone, Settings, type LucideIcon } from 'lucide-react'
import type { AppProps, Tone } from '../types'
import { CalculatorApp } from './calculator-app'
import { CalendarApp } from './calendar-app'
import { CameraApp } from './camera-app'
import { DialerApp } from './dialer-app'
import { MessagesApp } from './messages-app'
import { PhotosApp } from './photos-app'
import { SettingsApp } from './settings-app'
import { WeatherApp } from './weather-app'

export type AppId = 'phone' | 'messages' | 'camera' | 'photos' | 'calendar' | 'weather' | 'calculator' | 'settings'

export type AppDefinition = {
  id: AppId
  name: string
  icon: LucideIcon
  iconClass: string
  tone: Tone
  component: ComponentType<AppProps>
}

export const APPS: Record<AppId, AppDefinition> = {
  phone: { id: 'phone', name: '전화', icon: Phone, iconClass: 'bg-gradient-to-b from-green-400 to-green-600', tone: 'dark', component: DialerApp },
  messages: { id: 'messages', name: '메시지', icon: MessageCircle, iconClass: 'bg-gradient-to-b from-green-400 to-green-600', tone: 'dark', component: MessagesApp },
  camera: { id: 'camera', name: '카메라', icon: Camera, iconClass: 'bg-gradient-to-b from-neutral-300 to-neutral-500', tone: 'light', component: CameraApp },
  photos: { id: 'photos', name: '사진', icon: ImageIcon, iconClass: 'bg-gradient-to-br from-amber-400 via-rose-500 to-violet-600', tone: 'dark', component: PhotosApp },
  calendar: { id: 'calendar', name: '캘린더', icon: Calendar, iconClass: 'bg-white !text-red-500', tone: 'dark', component: CalendarApp },
  weather: { id: 'weather', name: '날씨', icon: CloudSun, iconClass: 'bg-gradient-to-b from-sky-400 to-blue-600', tone: 'light', component: WeatherApp },
  calculator: { id: 'calculator', name: '계산기', icon: Calculator, iconClass: 'bg-gradient-to-b from-neutral-700 to-neutral-900', tone: 'light', component: CalculatorApp },
  settings: { id: 'settings', name: '설정', icon: Settings, iconClass: 'bg-gradient-to-b from-neutral-400 to-neutral-600', tone: 'dark', component: SettingsApp },
}

export const HOME_APPS: AppId[] = ['calendar', 'weather', 'calculator', 'settings']
export const DOCK_APPS: AppId[] = ['phone', 'messages', 'camera', 'photos']

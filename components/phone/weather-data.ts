import { Cloud, CloudRain, CloudSun, Sun, type LucideIcon } from 'lucide-react'

export type Condition = 'sunny' | 'partly' | 'cloudy' | 'rain'

export const CONDITIONS: Record<Condition, { label: string; Icon: LucideIcon }> = {
  sunny: { label: '맑음', Icon: Sun },
  partly: { label: '구름 조금', Icon: CloudSun },
  cloudy: { label: '흐림', Icon: Cloud },
  rain: { label: '비', Icon: CloudRain },
}

export type City = {
  name: string
  temp: number
  high: number
  low: number
  condition: Condition
  hourly: { hour: string; temp: number; condition: Condition }[]
  daily: { day: string; high: number; low: number; condition: Condition }[]
}

export const CITIES: City[] = [
  {
    name: '서울',
    temp: 17,
    high: 21,
    low: 11,
    condition: 'partly',
    hourly: [
      { hour: '지금', temp: 17, condition: 'partly' },
      { hour: '15시', temp: 19, condition: 'sunny' },
      { hour: '16시', temp: 21, condition: 'sunny' },
      { hour: '17시', temp: 20, condition: 'partly' },
      { hour: '18시', temp: 18, condition: 'cloudy' },
      { hour: '19시', temp: 16, condition: 'cloudy' },
    ],
    daily: [
      { day: '오늘', high: 21, low: 11, condition: 'partly' },
      { day: '내일', high: 19, low: 10, condition: 'rain' },
      { day: '일', high: 18, low: 9, condition: 'cloudy' },
      { day: '월', high: 20, low: 10, condition: 'sunny' },
      { day: '화', high: 22, low: 12, condition: 'sunny' },
    ],
  },
  {
    name: '부산',
    temp: 20,
    high: 23,
    low: 16,
    condition: 'sunny',
    hourly: [
      { hour: '지금', temp: 20, condition: 'sunny' },
      { hour: '15시', temp: 22, condition: 'sunny' },
      { hour: '16시', temp: 23, condition: 'sunny' },
      { hour: '17시', temp: 22, condition: 'partly' },
      { hour: '18시', temp: 20, condition: 'partly' },
      { hour: '19시', temp: 19, condition: 'cloudy' },
    ],
    daily: [
      { day: '오늘', high: 23, low: 16, condition: 'sunny' },
      { day: '내일', high: 22, low: 15, condition: 'partly' },
      { day: '일', high: 21, low: 15, condition: 'rain' },
      { day: '월', high: 22, low: 14, condition: 'cloudy' },
      { day: '화', high: 24, low: 16, condition: 'sunny' },
    ],
  },
  {
    name: '제주',
    temp: 19,
    high: 22,
    low: 17,
    condition: 'rain',
    hourly: [
      { hour: '지금', temp: 19, condition: 'rain' },
      { hour: '15시', temp: 19, condition: 'rain' },
      { hour: '16시', temp: 20, condition: 'cloudy' },
      { hour: '17시', temp: 20, condition: 'cloudy' },
      { hour: '18시', temp: 19, condition: 'partly' },
      { hour: '19시', temp: 18, condition: 'partly' },
    ],
    daily: [
      { day: '오늘', high: 22, low: 17, condition: 'rain' },
      { day: '내일', high: 21, low: 16, condition: 'cloudy' },
      { day: '일', high: 23, low: 17, condition: 'sunny' },
      { day: '월', high: 23, low: 18, condition: 'partly' },
      { day: '화', high: 22, low: 17, condition: 'rain' },
    ],
  },
]

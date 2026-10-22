'use client'

import { useEffect, useState } from 'react'

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}

type BatteryManager = EventTarget & { level: number; charging: boolean }

export function useBattery() {
  const [battery, setBattery] = useState({ level: 0.82, charging: false })

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManager> }
    if (!nav.getBattery) return

    let manager: BatteryManager | null = null
    const update = () => manager && setBattery({ level: manager.level, charging: manager.charging })

    nav.getBattery().then((m) => {
      manager = m
      update()
      m.addEventListener('levelchange', update)
      m.addEventListener('chargingchange', update)
    })

    return () => {
      manager?.removeEventListener('levelchange', update)
      manager?.removeEventListener('chargingchange', update)
    }
  }, [])

  return battery
}

export const formatTime = (date: Date) =>
  date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })

export const formatDate = (date: Date) =>
  date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })

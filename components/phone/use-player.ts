'use client'

import { useSyncExternalStore } from 'react'
import { TRACKS } from './spotify-data'

type PlayerState = { index: number; playing: boolean; position: number }

let state: PlayerState = { index: 0, playing: false, position: 0 }
let timer: ReturnType<typeof setInterval> | null = null
const listeners = new Set<() => void>()

const update = (next: Partial<PlayerState>) => {
  state = { ...state, ...next }
  listeners.forEach((listener) => listener())
}

const wrap = (index: number) => (index + TRACKS.length) % TRACKS.length

const tick = () => {
  if (state.position + 1 >= TRACKS[state.index].duration) update({ index: wrap(state.index + 1), position: 0 })
  else update({ position: state.position + 1 })
}

export const player = {
  play() {
    timer ??= setInterval(tick, 1000)
    update({ playing: true })
  },
  pause() {
    if (timer) clearInterval(timer)
    timer = null
    update({ playing: false })
  },
  toggle() {
    if (state.playing) player.pause()
    else player.play()
  },
  skip(delta: number) {
    update({ index: wrap(state.index + delta), position: 0 })
  },
  select(index: number) {
    update({ index, position: 0 })
    player.play()
  },
  seek(position: number) {
    update({ position })
  },
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => state

export function usePlayer() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return { ...snapshot, track: TRACKS[snapshot.index] }
}

'use client'

import { useEffect, useState } from 'react'
import { Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

const TRACKS = [
  { title: '밤편지', artist: '아이유', duration: 253 },
  { title: 'Hype Boy', artist: 'NewJeans', duration: 179 },
  { title: '사건의 지평선', artist: '윤하', duration: 300 },
]

export function MusicWidget() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const track = TRACKS[index]

  const skip = (delta: number) => {
    setIndex((i) => (i + delta + TRACKS.length) % TRACKS.length)
    setPosition(0)
  }

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setPosition((p) => p + 1), 1000)
    return () => clearInterval(id)
  }, [playing])

  if (position >= track.duration) skip(1)

  return (
    <div className="flex aspect-square flex-col rounded-3xl bg-neutral-900/70 p-4 text-white shadow-lg backdrop-blur-xl">
      <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400">
        <Music className="size-5" aria-hidden />
      </div>
      <p className="mt-2 truncate text-sm font-semibold">{track.title}</p>
      <p className="truncate text-xs text-white/60">{track.artist}</p>

      <div
        className="mt-auto h-1 overflow-hidden rounded-full bg-white/20"
        role="progressbar"
        aria-label="재생 위치"
        aria-valuemin={0}
        aria-valuemax={track.duration}
        aria-valuenow={position}
      >
        <div className="h-full bg-white transition-[width] duration-1000 ease-linear" style={{ width: `${(position / track.duration) * 100}%` }} />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <button type="button" onClick={() => skip(-1)} aria-label="이전 곡" className="p-1 active:opacity-50">
          <SkipBack className="size-4 fill-current" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? '일시정지' : '재생'}
          className="p-1 active:opacity-50"
        >
          {playing ? <Pause className="size-5 fill-current" aria-hidden /> : <Play className="size-5 fill-current" aria-hidden />}
        </button>
        <button type="button" onClick={() => skip(1)} aria-label="다음 곡" className="p-1 active:opacity-50">
          <SkipForward className="size-4 fill-current" aria-hidden />
        </button>
      </div>
    </div>
  )
}

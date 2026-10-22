'use client'

import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SpotifyLogo } from '../spotify-logo'
import { player, usePlayer } from '../use-player'

export function SpotifyWidget({ onOpen }: { onOpen: () => void }) {
  const { track, playing, position } = usePlayer()

  return (
    <div className="flex size-full flex-col rounded-[inherit] bg-[#121212] p-3 text-white shadow-lg">
      <button type="button" onClick={onOpen} aria-label="Spotify 열기" className="flex items-start justify-between text-left">
        <span className={cn('aspect-square w-[45%] rounded-md bg-gradient-to-br shadow-md', track.cover)} aria-hidden />
        <SpotifyLogo className="size-5 text-[#1ed760]" aria-hidden />
      </button>

      <p className="mt-auto truncate text-[13px] font-semibold leading-tight">{track.title}</p>
      <p className="truncate text-[11px] text-white/60">{track.artist}</p>

      <div
        className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/20"
        role="progressbar"
        aria-label="재생 위치"
        aria-valuemin={0}
        aria-valuemax={track.duration}
        aria-valuenow={position}
      >
        <div className="h-full bg-white" style={{ width: `${(position / track.duration) * 100}%` }} />
      </div>

      <div className="mt-1 flex items-center justify-between">
        <button type="button" onClick={() => player.skip(-1)} aria-label="이전 곡" className="p-1 active:opacity-50">
          <SkipBack className="size-3.5 fill-current" aria-hidden />
        </button>
        <button type="button" onClick={player.toggle} aria-label={playing ? '일시정지' : '재생'} className="p-1 active:opacity-50">
          {playing ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="size-4 fill-current" aria-hidden />}
        </button>
        <button type="button" onClick={() => player.skip(1)} aria-label="다음 곡" className="p-1 active:opacity-50">
          <SkipForward className="size-3.5 fill-current" aria-hidden />
        </button>
      </div>
    </div>
  )
}

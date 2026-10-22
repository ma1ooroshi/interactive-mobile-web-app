'use client'

import { useState } from 'react'
import { ChevronDown, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLAYLISTS, TRACKS, formatTime } from '../spotify-data'
import { player, usePlayer } from '../use-player'

function PlayButton({ playing, className, iconClass }: { playing: boolean; className?: string; iconClass?: string }) {
  return (
    <button type="button" onClick={player.toggle} aria-label={playing ? '일시정지' : '재생'} className={className}>
      {playing ? <Pause className={cn('fill-current', iconClass)} aria-hidden /> : <Play className={cn('fill-current', iconClass)} aria-hidden />}
    </button>
  )
}

function NowPlaying({ onClose }: { onClose: () => void }) {
  const { track, playing, position } = usePlayer()

  return (
    <div className={cn('absolute inset-0 z-10 flex flex-col bg-gradient-to-b px-6 pt-14 pb-12 animate-in slide-in-from-bottom duration-300', track.cover)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#121212]" />
      <button type="button" onClick={onClose} aria-label="플레이어 닫기" className="self-start p-1">
        <ChevronDown className="size-7" aria-hidden />
      </button>

      <div className={cn('mx-auto mt-8 aspect-square w-full rounded-lg bg-gradient-to-br shadow-2xl', track.cover)} aria-hidden />

      <div className="mt-8">
        <h2 className="truncate text-xl font-bold">{track.title}</h2>
        <p className="truncate text-white/70">{track.artist}</p>
      </div>

      <input
        type="range"
        min={0}
        max={track.duration}
        value={position}
        onChange={(e) => player.seek(Number(e.target.value))}
        aria-label="재생 위치"
        className="mt-6 w-full accent-white"
      />
      <div className="flex justify-between text-xs text-white/60 tabular-nums">
        <span>{formatTime(position)}</span>
        <span>{`-${formatTime(track.duration - position)}`}</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-10">
        <button type="button" onClick={() => player.skip(-1)} aria-label="이전 곡" className="active:opacity-50">
          <SkipBack className="size-8 fill-current" aria-hidden />
        </button>
        <PlayButton playing={playing} iconClass="size-7" className="flex size-16 items-center justify-center rounded-full bg-white text-black active:scale-95" />
        <button type="button" onClick={() => player.skip(1)} aria-label="다음 곡" className="active:opacity-50">
          <SkipForward className="size-8 fill-current" aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function SpotifyApp() {
  const { track, index, playing, position } = usePlayer()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative h-full bg-[#121212] text-white">
      <div className="h-full overflow-y-auto px-4 pt-14 pb-32">
        <h2 className="text-2xl font-bold">안녕하세요</h2>

        <ul className="mt-4 grid grid-cols-2 gap-2">
          {PLAYLISTS.map((playlist) => (
            <li key={playlist.name}>
              <button
                type="button"
                onClick={() => player.select(playlist.trackIndex)}
                className="flex w-full items-center gap-2 overflow-hidden rounded bg-white/10 text-left active:bg-white/20"
              >
                <span className={cn('size-12 shrink-0 bg-gradient-to-br', playlist.cover)} aria-hidden />
                <span className="line-clamp-2 pr-2 text-xs font-semibold">{playlist.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <h3 className="mt-7 text-lg font-bold">최근 재생한 곡</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {TRACKS.map((t, i) => (
            <li key={t.title}>
              <button type="button" onClick={() => player.select(i)} className="flex w-full items-center gap-3 text-left active:opacity-60">
                <span className={cn('size-12 shrink-0 rounded bg-gradient-to-br', t.cover)} aria-hidden />
                <span className="min-w-0">
                  <span className={cn('block truncate text-sm font-medium', i === index && 'text-[#1ed760]')}>{t.title}</span>
                  <span className="block truncate text-xs text-white/60">{`${t.artist} · ${formatTime(t.duration)}`}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('absolute inset-x-2 bottom-8 overflow-hidden rounded-lg bg-gradient-to-r shadow-lg', track.cover)}>
        <div className="flex items-center gap-2 bg-black/30 p-2">
          <button type="button" onClick={() => setExpanded(true)} aria-label="재생 중인 곡 열기" className="flex min-w-0 flex-1 items-center gap-2 text-left">
            <span className={cn('size-10 shrink-0 rounded bg-gradient-to-br shadow', track.cover)} aria-hidden />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{track.title}</span>
              <span className="block truncate text-xs text-white/70">{track.artist}</span>
            </span>
          </button>
          <PlayButton playing={playing} iconClass="size-6" className="p-2 active:opacity-50" />
        </div>
        <div className="h-0.5 bg-white/20">
          <div className="h-full bg-white" style={{ width: `${(position / track.duration) * 100}%` }} />
        </div>
      </div>

      {expanded && <NowPlaying onClose={() => setExpanded(false)} />}
    </div>
  )
}

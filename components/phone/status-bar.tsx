'use client'

import { Plane, SignalHigh, Wifi, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatTime, useBattery, useNow } from './hooks'
import type { PhoneSettings, Tone } from './types'

type StatusBarProps = {
  tone: Tone
  settings: PhoneSettings
}

export function StatusBar({ tone, settings }: StatusBarProps) {
  const now = useNow()
  const { level, charging } = useBattery()
  const percent = Math.round(level * 100)

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[52px] items-center justify-between px-7 pt-1 text-[15px] font-semibold tabular-nums transition-colors',
        tone === 'light' ? 'text-white' : 'text-neutral-900',
      )}
    >
      <time suppressHydrationWarning>{now ? formatTime(now) : '--:--'}</time>
      <div className="flex items-center gap-1.5">
        {settings.airplane ? (
          <Plane className="size-4" aria-label="비행기 모드" />
        ) : (
          <SignalHigh className="size-4" aria-label="신호 양호" strokeWidth={2.5} />
        )}
        {settings.wifi && !settings.airplane && <Wifi className="size-4" aria-label="Wi-Fi 연결됨" strokeWidth={2.5} />}
        <div className="flex items-center gap-0.5" aria-label={`배터리 ${percent}%${charging ? ', 충전 중' : ''}`} role="img">
          <div className="relative flex h-[13px] w-[26px] items-center rounded-[4px] border border-current/40 p-px">
            <div
              className={cn('h-full rounded-[2px]', percent <= 20 ? 'bg-red-500' : charging ? 'bg-green-500' : 'bg-current')}
              style={{ width: `${percent}%` }}
            />
            {charging && <Zap className="absolute inset-0 m-auto size-2.5 fill-current" />}
          </div>
          <div aria-hidden className="h-1 w-0.5 rounded-r-sm bg-current/40" />
          <span className="ml-1 text-xs">{percent}</span>
        </div>
      </div>
    </div>
  )
}

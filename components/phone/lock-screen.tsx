'use client'

import { useState } from 'react'
import { ChevronUp, Flashlight, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate, formatTime, useNow } from './hooks'
import { Wallpaper } from './wallpaper'

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useNow()
  const [flashlight, setFlashlight] = useState(false)

  return (
    <section aria-label="잠금 화면" className="absolute inset-0 isolate text-white animate-in fade-in duration-300">
      <Wallpaper />
      {flashlight && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-radial-[at_50%_0%] from-white/40 to-transparent" />
      )}

      <button
        type="button"
        onClick={onUnlock}
        aria-label="화면을 눌러 잠금 해제"
        className="absolute inset-0 flex flex-col items-center pt-[18%] outline-none"
      >
        <Lock className="mb-3 size-5 opacity-90" aria-hidden />
        <span suppressHydrationWarning className="text-lg font-semibold drop-shadow">
          {now ? formatDate(now) : '\u00a0'}
        </span>
        <strong suppressHydrationWarning className="text-8xl font-bold tracking-tight tabular-nums drop-shadow-md">
          {now ? formatTime(now) : '\u00a0'}
        </strong>

        <span className="mt-auto mb-14 flex flex-col items-center gap-1 text-sm font-medium opacity-90">
          <ChevronUp className="size-5 animate-bounce" aria-hidden />
          위로 쓸어올려서 열기
        </span>
      </button>

      <button
        type="button"
        onClick={() => setFlashlight((on) => !on)}
        aria-pressed={flashlight}
        aria-label="손전등"
        className={cn(
          'absolute bottom-12 left-10 z-10 flex size-12 items-center justify-center rounded-full backdrop-blur-md transition-colors active:scale-95',
          flashlight ? 'bg-white text-neutral-900' : 'bg-black/35 text-white',
        )}
      >
        <Flashlight className="size-5" aria-hidden />
      </button>
    </section>
  )
}

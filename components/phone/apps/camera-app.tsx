'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RefreshCw, Zap, ZapOff } from 'lucide-react'
import { cn } from '@/lib/utils'

const MODES = ['비디오', '사진', '인물']
const VIEWS = ['/images/photo-4.png', '/images/photo-5.png']

export function CameraApp() {
  const [mode, setMode] = useState(1)
  const [flash, setFlash] = useState(false)
  const [front, setFront] = useState(false)
  const [shutter, setShutter] = useState(false)
  const [lastShot, setLastShot] = useState<string | null>(null)
  const view = VIEWS[front ? 1 : 0]

  const capture = () => {
    setShutter(true)
    setLastShot(view)
    setTimeout(() => setShutter(false), 150)
  }

  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-6 pt-14 pb-3">
        <button type="button" onClick={() => setFlash((f) => !f)} aria-pressed={flash} aria-label="플래시">
          {flash ? <Zap className="size-5 fill-yellow-400 text-yellow-400" aria-hidden /> : <ZapOff className="size-5" aria-hidden />}
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <Image src={view} alt="카메라 미리보기" fill sizes="390px" className={cn('object-cover', front && '-scale-x-100')} />
        <div aria-hidden className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="border-[0.5px] border-white/20" />
          ))}
        </div>
        <div aria-hidden className={cn('absolute inset-0 bg-white transition-opacity duration-150', shutter ? 'opacity-100' : 'opacity-0')} />
      </div>

      <div className="flex justify-center gap-6 py-3 text-xs font-semibold tracking-wide">
        {MODES.map((label, i) => (
          <button key={label} type="button" onClick={() => setMode(i)} className={i === mode ? 'text-yellow-400' : 'text-white/80'}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-10 pb-12">
        <div className="relative size-12 overflow-hidden rounded-lg bg-neutral-800">
          {lastShot && <Image src={lastShot} alt="마지막으로 찍은 사진" fill sizes="48px" className="object-cover" />}
        </div>
        <button
          type="button"
          onClick={capture}
          aria-label={mode === 0 ? '녹화' : '촬영'}
          className="flex size-18 items-center justify-center rounded-full border-4 border-white"
        >
          <span className={cn('size-14 rounded-full transition-transform active:scale-90', mode === 0 ? 'bg-red-500' : 'bg-white')} />
        </button>
        <button
          type="button"
          onClick={() => setFront((f) => !f)}
          aria-label="카메라 전환"
          className="flex size-12 items-center justify-center rounded-full bg-neutral-800 transition-transform active:rotate-180"
        >
          <RefreshCw className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}

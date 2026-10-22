'use client'

import { useEffect, useState } from 'react'
import { Delete, Phone, PhoneOff } from 'lucide-react'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

const formatNumber = (n: string) =>
  n.length > 7 ? `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}` : n.length > 3 ? `${n.slice(0, 3)}-${n.slice(3)}` : n

export function DialerApp() {
  const [number, setNumber] = useState('')
  const [calling, setCalling] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!calling) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [calling])

  const endCall = () => {
    setCalling(false)
    setSeconds(0)
  }

  if (calling) {
    return (
      <div className="flex h-full flex-col items-center bg-gradient-to-b from-neutral-700 to-neutral-900 pt-28 pb-16 text-white animate-in fade-in">
        <p className="text-3xl">{formatNumber(number)}</p>
        <p className="mt-2 text-white/70 tabular-nums" aria-live="polite">
          {seconds < 2 ? '연결 중...' : `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`}
        </p>
        <button
          type="button"
          onClick={endCall}
          aria-label="통화 종료"
          className="mt-auto flex size-18 items-center justify-center rounded-full bg-red-500 active:bg-red-600"
        >
          <PhoneOff className="size-8 fill-current" aria-hidden />
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center bg-white pt-24 pb-12 text-neutral-900">
      <output className="h-12 text-4xl tabular-nums" aria-live="polite">
        {formatNumber(number)}
      </output>
      <div className="mt-auto grid grid-cols-3 gap-x-6 gap-y-4">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => number.length < 11 && setNumber(number + key)}
            className="flex size-[4.5rem] items-center justify-center rounded-full bg-neutral-200 text-3xl transition-colors active:bg-neutral-400"
          >
            {key}
          </button>
        ))}
        <button
          type="button"
          onClick={() => number && setCalling(true)}
          aria-label="통화"
          className="col-start-2 flex size-[4.5rem] items-center justify-center rounded-full bg-green-500 text-white active:bg-green-600"
        >
          <Phone className="size-8 fill-current" aria-hidden />
        </button>
        {number && (
          <button type="button" onClick={() => setNumber(number.slice(0, -1))} aria-label="지우기" className="flex items-center justify-center text-neutral-400">
            <Delete className="size-7" aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}

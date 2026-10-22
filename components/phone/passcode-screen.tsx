'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import { Wallpaper } from './wallpaper'

const PASSCODE = '1234'
const KEYS = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
] as const

type PasscodeScreenProps = {
  onSuccess: () => void
  onCancel: () => void
}

export function PasscodeScreen({ onSuccess, onCancel }: PasscodeScreenProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const press = (digit: string) => {
    if (code.length >= PASSCODE.length) return
    const next = code + digit
    setCode(next)
    setError(false)
    if (next.length < PASSCODE.length) return

    setTimeout(() => {
      if (next === PASSCODE) return onSuccess()
      setError(true)
      setCode('')
    }, 150)
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (/^\d$/.test(event.key)) press(event.key)
    else if (event.key === 'Backspace') setCode((c) => c.slice(0, -1))
    else if (event.key === 'Escape') onCancel()
  })

  useEffect(() => {
    const handler = (event: KeyboardEvent) => onKeyDown(event)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section aria-label="암호 입력" className="absolute inset-0 isolate flex flex-col items-center text-white animate-in fade-in duration-300">
      <Wallpaper dimmed />

      <h2 className="mt-[22%] text-lg font-semibold">{error ? '암호가 틀렸습니다' : '암호 입력'}</h2>
      <div
        className={cn('mt-4 flex gap-5', error && 'animate-shake')}
        role="status"
        aria-label={`${code.length}자리 입력됨`}
      >
        {Array.from({ length: PASSCODE.length }, (_, i) => (
          <span
            key={i}
            className={cn('size-3.5 rounded-full border border-white transition-colors', i < code.length && 'bg-white')}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">{`힌트: ${PASSCODE}`}</p>

      <div className="mt-auto mb-6 grid grid-cols-3 gap-x-6 gap-y-4">
        {KEYS.map(([digit, letters]) => (
          <KeypadButton key={digit} digit={digit} letters={letters} onPress={press} />
        ))}
        <KeypadButton digit="0" letters="" onPress={press} className="col-start-2" />
      </div>

      <div className="mb-10 flex w-full justify-between px-10 text-sm font-medium">
        <button type="button" onClick={onCancel} className="py-2 active:opacity-60">
          긴급 상황
        </button>
        <button
          type="button"
          onClick={() => (code ? setCode((c) => c.slice(0, -1)) : onCancel())}
          className="py-2 active:opacity-60"
        >
          {code ? '삭제' : '취소'}
        </button>
      </div>
    </section>
  )
}

type KeypadButtonProps = {
  digit: string
  letters: string
  onPress: (digit: string) => void
  className?: string
}

function KeypadButton({ digit, letters, onPress, className }: KeypadButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPress(digit)}
      aria-label={digit}
      className={cn(
        'flex size-[4.5rem] flex-col items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors active:bg-white/40',
        className,
      )}
    >
      <strong className="text-3xl font-normal leading-none">{digit}</strong>
      {letters && <span className="mt-0.5 text-[10px] font-semibold tracking-[0.15em]">{letters}</span>}
    </button>
  )
}

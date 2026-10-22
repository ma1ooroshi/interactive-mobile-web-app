'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Operator = '+' | '−' | '×' | '÷'

const compute = (a: number, b: number, op: Operator) =>
  op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : b === 0 ? NaN : a / b

const format = (value: string) => {
  const n = Number(value)
  if (!Number.isFinite(n)) return '오류'
  if (value.endsWith('.') || value.includes('.')) return value
  return n.toLocaleString('ko-KR', { maximumFractionDigits: 8 })
}

export function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [stored, setStored] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [fresh, setFresh] = useState(true)

  const inputDigit = (d: string) => {
    if (fresh) {
      setDisplay(d === '.' ? '0.' : d)
      setFresh(false)
      return
    }
    if (d === '.' && display.includes('.')) return
    if (display.replace(/[-.]/g, '').length >= 9) return
    setDisplay(display === '0' && d !== '.' ? d : display + d)
  }

  const chooseOperator = (op: Operator) => {
    const current = Number(display)
    if (stored !== null && operator && !fresh) {
      const result = compute(stored, current, operator)
      setStored(result)
      setDisplay(String(parseFloat(result.toPrecision(10))))
    } else {
      setStored(current)
    }
    setOperator(op)
    setFresh(true)
  }

  const equals = () => {
    if (stored === null || !operator) return
    const result = compute(stored, Number(display), operator)
    setDisplay(String(parseFloat(result.toPrecision(10))))
    setStored(null)
    setOperator(null)
    setFresh(true)
  }

  const clear = () => {
    setDisplay('0')
    setStored(null)
    setOperator(null)
    setFresh(true)
  }

  const keys: { label: string; onPress: () => void; variant: 'fn' | 'op' | 'num'; wide?: boolean; active?: boolean }[] = [
    { label: display === '0' && fresh ? 'AC' : 'C', onPress: clear, variant: 'fn' },
    { label: '±', onPress: () => setDisplay(String(-Number(display))), variant: 'fn' },
    { label: '%', onPress: () => setDisplay(String(Number(display) / 100)), variant: 'fn' },
    ...(['÷', '×', '−', '+'] as Operator[]).flatMap((op, row) => {
      const digits = [[], ['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']][row]
      return [
        ...digits.map((d) => ({ label: d, onPress: () => inputDigit(d), variant: 'num' as const })),
        { label: op, onPress: () => chooseOperator(op), variant: 'op' as const, active: operator === op && fresh },
      ]
    }),
    { label: '0', onPress: () => inputDigit('0'), variant: 'num', wide: true },
    { label: '.', onPress: () => inputDigit('.'), variant: 'num' },
    { label: '=', onPress: equals, variant: 'op' },
  ]

  return (
    <div className="flex h-full flex-col justify-end bg-black px-5 pb-10 text-white">
      <output aria-live="polite" className="mb-4 truncate px-2 text-right text-7xl font-light tabular-nums">
        {format(display)}
      </output>
      <div className="grid grid-cols-4 gap-3">
        {keys.map((key) => (
          <button
            key={key.label}
            type="button"
            onClick={key.onPress}
            className={cn(
              'flex aspect-square items-center justify-center rounded-full text-3xl transition-[filter] active:brightness-150',
              key.variant === 'fn' && 'bg-neutral-400 text-black',
              key.variant === 'num' && 'bg-neutral-800',
              key.variant === 'op' && (key.active ? 'bg-white text-orange-500' : 'bg-orange-500'),
              key.wide && 'col-span-2 aspect-auto justify-start pl-7',
            )}
          >
            {key.label}
          </button>
        ))}
      </div>
    </div>
  )
}

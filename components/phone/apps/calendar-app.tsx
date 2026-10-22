'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const EVENTS: Record<number, { time: string; title: string; color: string }[]> = {
  3: [{ time: '10:00', title: '팀 스탠드업', color: 'bg-blue-500' }],
  9: [{ time: '종일', title: '한글날', color: 'bg-red-500' }],
  14: [
    { time: '12:30', title: '점심 약속', color: 'bg-green-500' },
    { time: '19:00', title: '헬스장', color: 'bg-orange-500' },
  ],
  23: [{ time: '15:00', title: '디자인 리뷰', color: 'bg-purple-500' }],
}

const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

export function CalendarApp() {
  const today = new Date()
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(today)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const leading = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array<null>(leading).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const events = selected.getMonth() === today.getMonth() ? (EVENTS[selected.getDate()] ?? []) : []

  const shift = (delta: number) => setCursor(new Date(year, month + delta, 1))

  return (
    <div className="flex h-full flex-col bg-white pt-14 text-neutral-900">
      <header className="flex items-end justify-between px-5 pb-3">
        <div>
          <p className="text-sm font-medium text-red-500">{`${year}년`}</p>
          <h2 className="text-3xl font-bold">{`${month + 1}월`}</h2>
        </div>
        <div className="flex gap-1 text-red-500">
          <button type="button" onClick={() => shift(-1)} aria-label="이전 달" className="rounded-full p-2 active:bg-neutral-100">
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="다음 달" className="rounded-full p-2 active:bg-neutral-100">
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 border-b border-neutral-200 px-2 pb-1 text-center text-xs text-neutral-500">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 px-2 pt-2" role="grid" aria-label={`${year}년 ${month + 1}월`}>
        {cells.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />
          const date = new Date(year, month, day)
          const isToday = sameDay(date, today)
          const isSelected = sameDay(date, selected)
          const hasEvent = month === today.getMonth() && year === today.getFullYear() && EVENTS[day]
          return (
            <button
              key={day}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-label={`${month + 1}월 ${day}일`}
              onClick={() => setSelected(date)}
              className="flex flex-col items-center gap-0.5 py-1"
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full text-lg tabular-nums',
                  isSelected && (isToday ? 'bg-red-500 font-semibold text-white' : 'bg-neutral-900 font-semibold text-white'),
                  !isSelected && isToday && 'font-semibold text-red-500',
                  !isSelected && !isToday && date.getDay() === 0 && 'text-neutral-400',
                )}
              >
                {day}
              </span>
              <span className={cn('size-1 rounded-full', hasEvent ? 'bg-neutral-400' : 'bg-transparent')} />
            </button>
          )
        })}
      </div>

      <section className="mt-2 flex-1 border-t border-neutral-200 px-5 pt-3" aria-label="일정">
        <h3 className="text-sm font-semibold text-neutral-500">
          {selected.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
        </h3>
        {events.length === 0 ? (
          <p className="mt-6 text-center text-sm text-neutral-400">일정 없음</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {events.map((event) => (
              <li key={event.title} className="flex items-center gap-3 rounded-xl bg-neutral-100 p-3">
                <span className={cn('h-8 w-1 rounded-full', event.color)} />
                <span className="flex flex-col">
                  <span className="font-medium">{event.title}</span>
                  <span className="text-xs text-neutral-500">{event.time}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

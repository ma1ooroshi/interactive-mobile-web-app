'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CITIES, CONDITIONS } from '../weather-data'

export function WeatherApp() {
  const [index, setIndex] = useState(0)
  const city = CITIES[index]
  const { label } = CONDITIONS[city.condition]

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gradient-to-b from-sky-500 to-blue-800 px-5 pt-16 pb-10 text-white">
      <div role="tablist" aria-label="도시 선택" className="flex justify-center gap-2">
        {CITIES.map((c, i) => (
          <button
            key={c.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn('rounded-full px-3 py-1 text-sm transition-colors', i === index ? 'bg-white/30 font-semibold' : 'bg-white/10')}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-3xl">{city.name}</h2>
        <p className="text-8xl font-thin tabular-nums">{`${city.temp}°`}</p>
        <p className="text-lg font-medium">{label}</p>
        <p className="font-medium tabular-nums">{`최고:${city.high}° 최저:${city.low}°`}</p>
      </div>

      <section aria-label="시간별 예보" className="mt-8 rounded-2xl bg-white/15 p-4 backdrop-blur-md">
        <ul className="flex justify-between">
          {city.hourly.map(({ hour, temp, condition }) => {
            const { Icon } = CONDITIONS[condition]
            return (
              <li key={hour} className="flex flex-col items-center gap-2 text-sm">
                <span>{hour}</span>
                <Icon className="size-5" aria-label={CONDITIONS[condition].label} />
                <span className="font-medium tabular-nums">{`${temp}°`}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-label="일별 예보" className="mt-3 rounded-2xl bg-white/15 px-4 py-2 backdrop-blur-md">
        <ul className="divide-y divide-white/15">
          {city.daily.map(({ day, high, low, condition }) => {
            const { Icon } = CONDITIONS[condition]
            return (
              <li key={day} className="flex items-center gap-4 py-2.5">
                <span className="w-10 font-medium">{day}</span>
                <Icon className="size-5" aria-label={CONDITIONS[condition].label} />
                <span className="ml-auto w-8 text-right text-white/60 tabular-nums">{`${low}°`}</span>
                <span className="h-1 w-20 rounded-full bg-gradient-to-r from-teal-300 to-amber-300" />
                <span className="w-8 tabular-nums">{`${high}°`}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

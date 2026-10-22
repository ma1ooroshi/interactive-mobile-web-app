import { CITIES, CONDITIONS } from '../weather-data'

export function WeatherWidget({ onOpen }: { onOpen: () => void }) {
  const city = CITIES[0]
  const { Icon, label } = CONDITIONS[city.condition]

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`날씨 위젯: ${city.name} ${city.temp}도 ${label}. 날씨 앱 열기`}
      className="flex size-full flex-col rounded-[inherit] bg-gradient-to-b from-sky-500 to-blue-700 p-3 text-left text-white shadow-lg transition-transform active:scale-95"
    >
      <span className="text-[13px] font-semibold">{city.name}</span>
      <span className="text-4xl font-light leading-tight tabular-nums">{`${city.temp}°`}</span>
      <span className="mt-auto flex flex-col gap-0.5 text-[11px] font-medium">
        <Icon className="size-4" aria-hidden />
        <span>{label}</span>
        <span className="tabular-nums">{`최고:${city.high}° 최저:${city.low}°`}</span>
      </span>
    </button>
  )
}

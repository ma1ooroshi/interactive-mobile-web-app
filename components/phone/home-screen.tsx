import { AppIcon } from './app-icon'
import { APPS, DOCK_APPS, HOME_APPS, type AppId } from './apps/registry'
import { Wallpaper } from './wallpaper'
import { MusicWidget } from './widgets/music-widget'
import { WeatherWidget } from './widgets/weather-widget'

export function HomeScreen({ onOpenApp }: { onOpenApp: (id: AppId) => void }) {
  return (
    <section aria-label="홈 화면" className="absolute inset-0 isolate flex flex-col px-6 pt-16 pb-7 animate-in fade-in zoom-in-105 duration-300">
      <Wallpaper />

      <div className="grid grid-cols-2 gap-5">
        <WeatherWidget onOpen={() => onOpenApp('weather')} />
        <MusicWidget />
      </div>

      <div className="mt-7 grid grid-cols-4 gap-x-4 gap-y-6">
        {HOME_APPS.map((id) => (
          <AppIcon key={id} app={APPS[id]} onOpen={() => onOpenApp(id)} />
        ))}
      </div>

      <nav aria-label="Dock" className="mt-auto flex justify-between rounded-[2rem] bg-white/25 p-3.5 backdrop-blur-2xl">
        {DOCK_APPS.map((id) => (
          <AppIcon key={id} app={APPS[id]} onOpen={() => onOpenApp(id)} showLabel={false} />
        ))}
      </nav>
    </section>
  )
}

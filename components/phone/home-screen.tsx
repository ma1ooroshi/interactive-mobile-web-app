import { AppIcon } from './app-icon'
import { APPS, DOCK_APPS, HOME_APPS, type AppId } from './apps/registry'
import { Wallpaper } from './wallpaper'
import { SpotifyWidget } from './widgets/spotify-widget'
import { WeatherWidget } from './widgets/weather-widget'

const widgetCell = 'col-span-2 aspect-square w-[37cqw] justify-self-center rounded-[5.5cqw]'

export function HomeScreen({ onOpenApp }: { onOpenApp: (id: AppId) => void }) {
  return (
    <section aria-label="홈 화면" className="@container absolute inset-0 isolate flex flex-col pt-[17cqw] pb-[7cqw] animate-in fade-in zoom-in-105 duration-300">
      <Wallpaper />

      <div className="grid grid-cols-4 gap-y-[6cqw] px-[5cqw]">
        <div className={widgetCell}>
          <WeatherWidget onOpen={() => onOpenApp('weather')} />
        </div>
        <div className={widgetCell}>
          <SpotifyWidget onOpen={() => onOpenApp('spotify')} />
        </div>
        {HOME_APPS.map((id) => (
          <AppIcon key={id} app={APPS[id]} onOpen={() => onOpenApp(id)} />
        ))}
      </div>

      <nav
        aria-label="Dock"
        className="mx-[3cqw] mt-auto grid grid-cols-4 rounded-[9cqw] border border-white/30 bg-white/20 px-[2cqw] py-[3.5cqw] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl"
      >
        {DOCK_APPS.map((id) => (
          <AppIcon key={id} app={APPS[id]} onOpen={() => onOpenApp(id)} showLabel={false} />
        ))}
      </nav>
    </section>
  )
}

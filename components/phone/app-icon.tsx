import { cn } from '@/lib/utils'
import type { AppDefinition } from './apps/registry'

type AppIconProps = {
  app: AppDefinition
  onOpen: () => void
  showLabel?: boolean
}

export function AppIcon({ app, onOpen, showLabel = true }: AppIconProps) {
  const Icon = app.icon
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${app.name} 열기`}
      className="group flex flex-col items-center gap-1 outline-none"
    >
      <span
        className={cn(
          'flex size-[60px] items-center justify-center rounded-[1.1rem] text-white shadow-md transition-transform group-active:scale-90 group-focus-visible:ring-2 group-focus-visible:ring-white',
          app.iconClass,
        )}
      >
        <Icon className="size-7" strokeWidth={2} aria-hidden />
      </span>
      {showLabel && <span className="text-xs font-medium text-white drop-shadow">{app.name}</span>}
    </button>
  )
}

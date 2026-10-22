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
      className="group flex w-full flex-col items-center gap-[1.4cqw] outline-none"
    >
      <span
        className={cn(
          'flex size-[15cqw] items-center justify-center rounded-[3.6cqw] text-white shadow-sm transition-transform group-active:scale-90 group-focus-visible:ring-2 group-focus-visible:ring-white',
          app.iconClass,
        )}
      >
        <Icon className="size-[52%]" strokeWidth={2} aria-hidden />
      </span>
      {showLabel && <span className="max-w-full truncate text-[2.8cqw] font-medium leading-none text-white drop-shadow">{app.name}</span>}
    </button>
  )
}

import { cn } from '@/lib/utils'
import type { Tone } from './types'

type HomeIndicatorProps = {
  tone: Tone
  onPress: () => void
}

export function HomeIndicator({ tone, onPress }: HomeIndicatorProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label="홈 화면으로"
      className="group absolute inset-x-0 bottom-0 z-30 flex h-6 items-center justify-center"
    >
      <span
        className={cn(
          'h-[5px] w-32 rounded-full transition-transform group-hover:scale-x-110 group-active:scale-95',
          tone === 'light' ? 'bg-white' : 'bg-neutral-900',
        )}
      />
    </button>
  )
}

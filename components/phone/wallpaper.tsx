import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Wallpaper({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <Image src="/images/wallpaper.png" alt="" fill priority sizes="(min-width: 640px) 390px, 100vw" className="object-cover" />
      <div className={cn('absolute inset-0 transition-colors duration-500', dimmed ? 'bg-black/45 backdrop-blur-xl' : 'bg-black/10')} />
    </div>
  )
}

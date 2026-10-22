import type { ReactNode } from 'react'

type DeviceFrameProps = {
  children: ReactNode
  onPowerPress: () => void
}

const sideButton = 'absolute hidden w-1 bg-neutral-800 sm:block'

export function DeviceFrame({ children, onPowerPress }: DeviceFrameProps) {
  return (
    <div className="relative h-dvh w-full sm:aspect-[390/844] sm:h-[min(844px,calc(100dvh-3rem))] sm:w-auto">
      <span aria-hidden className={`${sideButton} -left-[5px] top-[16%] h-[4%] rounded-l`} />
      <span aria-hidden className={`${sideButton} -left-[5px] top-[23%] h-[7%] rounded-l`} />
      <span aria-hidden className={`${sideButton} -left-[5px] top-[32%] h-[7%] rounded-l`} />
      <button
        type="button"
        onClick={onPowerPress}
        aria-label="전원 버튼 (화면 잠금)"
        className={`${sideButton} -right-[5px] top-[25%] h-[11%] rounded-r transition-colors hover:bg-neutral-600 active:bg-neutral-500`}
      />

      <div className="relative size-full overflow-hidden bg-black sm:rounded-[3.25rem] sm:border-[11px] sm:border-neutral-950 sm:shadow-[0_0_0_2px_#3f3f46,0_40px_80px_-24px_rgba(0,0,0,0.55)]">
        <div className="relative isolate size-full overflow-hidden select-none sm:rounded-[2.5rem]">
          <div
            aria-hidden
            className="absolute left-1/2 top-2.5 z-40 h-8 w-28 -translate-x-1/2 rounded-full bg-black"
          />
          {children}
        </div>
      </div>
    </div>
  )
}

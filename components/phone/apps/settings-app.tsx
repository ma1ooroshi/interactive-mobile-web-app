'use client'

import { Lock, Plane, Sun, Wifi, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AppProps } from '../types'

export function SettingsApp({ settings, onSettingsChange, onLock }: AppProps) {
  const update = (patch: Partial<typeof settings>) => onSettingsChange({ ...settings, ...patch })

  return (
    <div className="h-full overflow-y-auto bg-neutral-100 px-4 pt-14 pb-10 text-neutral-900">
      <h2 className="px-1 pb-4 text-3xl font-bold">설정</h2>

      <ul className="divide-y divide-neutral-200 overflow-hidden rounded-xl bg-white">
        <ToggleRow icon={Plane} color="bg-orange-500" label="에어플레인 모드" checked={settings.airplane} onChange={(airplane) => update({ airplane })} />
        <ToggleRow
          icon={Wifi}
          color="bg-blue-500"
          label="Wi-Fi"
          checked={settings.wifi && !settings.airplane}
          disabled={settings.airplane}
          onChange={(wifi) => update({ wifi })}
        />
      </ul>

      <div className="mt-6 rounded-xl bg-white p-4">
        <label htmlFor="brightness" className="flex items-center gap-3 text-sm font-medium">
          <span className="flex size-7 items-center justify-center rounded-md bg-sky-500 text-white">
            <Sun className="size-4" aria-hidden />
          </span>
          화면 밝기
          <span className="ml-auto text-neutral-500 tabular-nums">{`${settings.brightness}%`}</span>
        </label>
        <input
          id="brightness"
          type="range"
          min={30}
          max={100}
          value={settings.brightness}
          onChange={(e) => update({ brightness: Number(e.target.value) })}
          className="mt-3 w-full accent-blue-500"
        />
      </div>

      <button
        type="button"
        onClick={onLock}
        className="mt-6 flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left font-medium text-red-500 active:bg-neutral-50"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-red-500 text-white">
          <Lock className="size-4" aria-hidden />
        </span>
        화면 잠금
      </button>
    </div>
  )
}

type ToggleRowProps = {
  icon: LucideIcon
  color: string
  label: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

function ToggleRow({ icon: Icon, color, label, checked, disabled, onChange }: ToggleRowProps) {
  return (
    <li className="flex items-center gap-3 p-3">
      <span className={cn('flex size-7 items-center justify-center rounded-md text-white', color)}>
        <Icon className="size-4" aria-hidden />
      </span>
      <span className={cn('font-medium', disabled && 'text-neutral-400')}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn('ml-auto h-[31px] w-[51px] rounded-full p-0.5 transition-colors disabled:opacity-50', checked ? 'bg-green-500' : 'bg-neutral-300')}
      >
        <span className={cn('block size-[27px] rounded-full bg-white shadow transition-transform', checked && 'translate-x-5')} />
      </button>
    </li>
  )
}

'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Clock, CircleUserRound, Delete, Grip, Info, Pause, Phone, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Play, Star, Voicemail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTACTS, RECENTS, VOICEMAILS, formatNumber, initialOf } from '../phone-data'

type Tab = 'favorites' | 'recents' | 'contacts' | 'keypad' | 'voicemail'

const TABS: { id: Tab; label: string; Icon: typeof Star }[] = [
  { id: 'favorites', label: '즐겨찾기', Icon: Star },
  { id: 'recents', label: '최근 통화', Icon: Clock },
  { id: 'contacts', label: '연락처', Icon: CircleUserRound },
  { id: 'keypad', label: '키패드', Icon: Grip },
  { id: 'voicemail', label: '음성 사서함', Icon: Voicemail },
]

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

type OnCall = (target: string) => void

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-neutral-400 to-neutral-500 font-medium text-white', className)} aria-hidden>
      {/^\d/.test(name) ? <CircleUserRound className="size-3/5" /> : name[0]}
    </span>
  )
}

function Header({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="px-4 pt-14 pb-2">
      <h2 className="text-3xl font-bold">{title}</h2>
      {children}
    </header>
  )
}

function Favorites({ onCall }: { onCall: OnCall }) {
  return (
    <>
      <Header title="즐겨찾기" />
      <ul className="divide-y divide-neutral-200 pl-4">
        {CONTACTS.filter((c) => c.favorite).map((c) => (
          <li key={c.name}>
            <button type="button" onClick={() => onCall(c.name)} className="flex w-full items-center gap-3 py-2 pr-4 text-left active:bg-neutral-100">
              <Avatar name={c.name} className="size-10" />
              <span className="flex-1">
                <span className="block font-medium">{c.name}</span>
                <span className="block text-sm text-neutral-500">{c.label}</span>
              </span>
              <Info className="size-5 text-blue-500" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

const RECENT_ICON = { incoming: PhoneIncoming, outgoing: PhoneOutgoing, missed: PhoneMissed }

function Recents({ onCall }: { onCall: OnCall }) {
  const [missedOnly, setMissedOnly] = useState(false)
  const items = missedOnly ? RECENTS.filter((r) => r.type === 'missed') : RECENTS

  return (
    <>
      <Header title="최근 통화">
        <div role="tablist" aria-label="통화 필터" className="mt-3 grid grid-cols-2 rounded-lg bg-neutral-200 p-0.5 text-sm font-medium">
          {['전체', '부재중'].map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={missedOnly === (i === 1)}
              onClick={() => setMissedOnly(i === 1)}
              className={cn('rounded-md py-1', missedOnly === (i === 1) && 'bg-white shadow-sm')}
            >
              {label}
            </button>
          ))}
        </div>
      </Header>
      <ul className="divide-y divide-neutral-200 pl-4">
        {items.map((r, i) => {
          const Icon = RECENT_ICON[r.type]
          return (
            <li key={`${r.name}-${i}`}>
              <button type="button" onClick={() => onCall(r.name)} className="flex w-full items-center gap-3 py-2 pr-4 text-left active:bg-neutral-100">
                <Avatar name={r.name} className="size-10" />
                <span className="min-w-0 flex-1">
                  <span className={cn('block truncate font-medium', r.type === 'missed' && 'text-red-500')}>{r.name}</span>
                  <span className="flex items-center gap-1 text-sm text-neutral-500">
                    <Icon className="size-3.5" aria-label={r.type === 'missed' ? '부재중' : r.type === 'incoming' ? '수신' : '발신'} />
                    {r.label}
                  </span>
                </span>
                <span className="text-sm text-neutral-500">{r.time}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function Contacts({ onCall }: { onCall: OnCall }) {
  const groups = Object.entries(
    [...CONTACTS].sort((a, b) => a.name.localeCompare(b.name, 'ko')).reduce<Record<string, typeof CONTACTS>>((acc, c) => {
      ;(acc[initialOf(c.name)] ??= []).push(c)
      return acc
    }, {}),
  )

  return (
    <>
      <Header title="연락처" />
      <div className="mx-4 flex items-center gap-3 border-b border-neutral-200 py-3">
        <Avatar name="나" className="size-14 text-xl" />
        <span>
          <span className="block text-lg font-semibold">내 카드</span>
          <span className="block text-sm text-neutral-500">{formatNumber('01000000000')}</span>
        </span>
      </div>
      {groups.map(([initial, contacts]) => (
        <section key={initial} aria-label={initial}>
          <h3 className="mt-2 px-4 text-sm font-semibold text-neutral-500">{initial}</h3>
          <ul className="divide-y divide-neutral-200 pl-4">
            {contacts.map((c) => (
              <li key={c.name}>
                <button type="button" onClick={() => onCall(c.name)} className="w-full py-2.5 pr-4 text-left active:bg-neutral-100">
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

function Keypad({ onCall }: { onCall: OnCall }) {
  const [number, setNumber] = useState('')

  return (
    <div className="flex h-full flex-col items-center pt-20 pb-4">
      <output className="h-12 text-4xl tabular-nums" aria-live="polite">
        {formatNumber(number)}
      </output>
      <div className="mt-auto grid grid-cols-3 gap-x-6 gap-y-3">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => number.length < 11 && setNumber(number + key)}
            className="flex size-[4.5rem] items-center justify-center rounded-full bg-neutral-200 text-3xl transition-colors active:bg-neutral-400"
          >
            {key}
          </button>
        ))}
        <button
          type="button"
          onClick={() => number && onCall(formatNumber(number))}
          aria-label="통화"
          className="col-start-2 flex size-[4.5rem] items-center justify-center rounded-full bg-green-500 text-white active:bg-green-600"
        >
          <Phone className="size-8 fill-current" aria-hidden />
        </button>
        {number && (
          <button type="button" onClick={() => setNumber(number.slice(0, -1))} aria-label="지우기" className="flex items-center justify-center text-neutral-400">
            <Delete className="size-7" aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}

function VoicemailList() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <>
      <Header title="음성 사서함" />
      <ul className="divide-y divide-neutral-200 pl-4">
        {VOICEMAILS.map((v, i) => (
          <li key={v.name} className="flex items-center gap-3 py-3 pr-4">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{v.name}</span>
              <span className="block text-sm text-neutral-500 tabular-nums">{`${v.time} · 0:${String(v.duration).padStart(2, '0')}`}</span>
              {playing === i && (
                <span className="mt-2 block h-1 overflow-hidden rounded-full bg-neutral-200">
                  <span
                    className="block h-full w-full origin-left bg-blue-500 animate-[voicemail_linear_forwards]"
                    style={{ animationDuration: `${v.duration}s` }}
                    onAnimationEnd={() => setPlaying(null)}
                  />
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setPlaying(playing === i ? null : i)}
              aria-label={playing === i ? '정지' : '재생'}
              className="flex size-9 items-center justify-center rounded-full bg-blue-500 text-white active:bg-blue-600"
            >
              {playing === i ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="size-4 fill-current" aria-hidden />}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function CallScreen({ target, onEnd }: { target: string; onEnd: () => void }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-b from-neutral-700 to-neutral-900 pt-28 pb-16 text-white animate-in fade-in">
      <Avatar name={target} className="size-24 text-4xl" />
      <p className="mt-4 text-3xl">{target}</p>
      <p className="mt-2 text-white/70 tabular-nums" aria-live="polite">
        {seconds < 2 ? '연결 중...' : `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`}
      </p>
      <button type="button" onClick={onEnd} aria-label="통화 종료" className="mt-auto flex size-18 items-center justify-center rounded-full bg-red-500 active:bg-red-600">
        <PhoneOff className="size-8 fill-current" aria-hidden />
      </button>
    </div>
  )
}

export function DialerApp() {
  const [tab, setTab] = useState<Tab>('favorites')
  const [callTarget, setCallTarget] = useState<string | null>(null)

  if (callTarget) return <CallScreen target={callTarget} onEnd={() => setCallTarget(null)} />

  return (
    <div className="flex h-full flex-col bg-white text-neutral-900">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === 'favorites' && <Favorites onCall={setCallTarget} />}
        {tab === 'recents' && <Recents onCall={setCallTarget} />}
        {tab === 'contacts' && <Contacts onCall={setCallTarget} />}
        {tab === 'keypad' && <Keypad onCall={setCallTarget} />}
        {tab === 'voicemail' && <VoicemailList />}
      </div>

      <nav aria-label="전화 탭" className="grid grid-cols-5 border-t border-neutral-200 bg-neutral-50/95 pt-1.5 pb-8">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            aria-current={tab === id ? 'page' : undefined}
            className={cn('flex flex-col items-center gap-0.5 text-[10px] font-medium', tab === id ? 'text-blue-500' : 'text-neutral-400')}
          >
            <Icon className={cn('size-6', tab === id && id === 'favorites' && 'fill-current')} aria-hidden />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}

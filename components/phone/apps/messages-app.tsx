'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = { id: number; from: 'me' | 'them'; text: string }

const REPLIES = ['ㅋㅋㅋ 그러게', '오 좋다!', '이따 연락할게', '진짜? 대박', '응응 알겠어']

export function MessagesApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'them', text: '오늘 저녁 뭐 먹을래?' },
    { id: 2, from: 'me', text: '고기 어때?' },
    { id: 3, from: 'them', text: '좋아 7시에 보자' },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (event?: FormEvent) => {
    event?.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text }])
    setDraft('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { id: Date.now(), from: 'them', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }])
    }, 1200)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    if (event.key === 'Enter') send(event)
  }

  return (
    <div className="flex h-full flex-col bg-white pt-12 text-neutral-900">
      <header className="flex flex-col items-center border-b border-neutral-200 pb-2">
        <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-neutral-300 to-neutral-500 text-lg font-semibold text-white">
          민
        </span>
        <h2 className="mt-1 text-xs font-medium">민지</h2>
      </header>

      <ul className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-3" aria-live="polite">
        {messages.map((message) => (
          <li
            key={message.id}
            className={cn(
              'max-w-[75%] rounded-2xl px-3.5 py-2 text-[15px] animate-in fade-in slide-in-from-bottom-2 duration-200',
              message.from === 'me' ? 'self-end bg-blue-500 text-white' : 'self-start bg-neutral-200',
            )}
          >
            {message.text}
          </li>
        ))}
        {typing && (
          <li className="flex gap-1 self-start rounded-2xl bg-neutral-200 px-4 py-3" aria-label="입력 중">
            {[0, 150, 300].map((delay) => (
              <span key={delay} className="size-2 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: `${delay}ms` }} />
            ))}
          </li>
        )}
        <div ref={endRef} />
      </ul>

      <form onSubmit={send} className="flex items-center gap-2 px-3 pt-2 pb-8">
        <label htmlFor="message-input" className="sr-only">
          메시지 입력
        </label>
        <input
          id="message-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="iMessage"
          autoComplete="off"
          className="h-9 flex-1 rounded-full border border-neutral-300 px-4 text-[15px] outline-none focus:border-neutral-400"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="보내기"
          className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-white disabled:opacity-30"
        >
          <ArrowUp className="size-5" aria-hidden />
        </button>
      </form>
    </div>
  )
}

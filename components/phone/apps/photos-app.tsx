'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const PHOTOS = [
  { src: '/images/photo-1.png', alt: '소파 위에서 잠든 강아지' },
  { src: '/images/photo-2.png', alt: '비 오는 밤의 서울 거리' },
  { src: '/images/photo-3.png', alt: '라떼 아트가 있는 커피' },
  { src: '/images/photo-4.png', alt: '제주 해안 풍경' },
  { src: '/images/photo-5.png', alt: '강변의 벚꽃길' },
  { src: '/images/photo-6.png', alt: '한국식 바비큐 저녁 식사' },
]

export function PhotosApp() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const open = openIndex !== null ? PHOTOS[openIndex] : null

  const toggleLike = (i: number) =>
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  if (open && openIndex !== null) {
    return (
      <div className="flex h-full flex-col bg-black pt-14 text-white animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between px-3 py-2">
          <button type="button" onClick={() => setOpenIndex(null)} className="flex items-center text-blue-400">
            <ChevronLeft className="size-6" aria-hidden />
            보관함
          </button>
          <span className="text-sm text-white/60 tabular-nums">{`${openIndex + 1} / ${PHOTOS.length}`}</span>
        </div>
        <button
          type="button"
          className="relative flex-1"
          onClick={() => setOpenIndex((openIndex + 1) % PHOTOS.length)}
          aria-label="다음 사진"
        >
          <Image src={open.src} alt={open.alt} fill sizes="390px" className="object-contain" />
        </button>
        <div className="flex justify-center py-6">
          <button
            type="button"
            onClick={() => toggleLike(openIndex)}
            aria-pressed={liked.has(openIndex)}
            aria-label="즐겨찾기"
            className="active:scale-90"
          >
            <Heart className={cn('size-7', liked.has(openIndex) && 'fill-red-500 text-red-500')} aria-hidden />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-white pt-14 text-neutral-900">
      <header className="px-4 pb-3">
        <h2 className="text-3xl font-bold">보관함</h2>
        <p className="text-sm text-neutral-500">{`사진 ${PHOTOS.length}장`}</p>
      </header>
      <ul className="grid grid-cols-3 gap-0.5">
        {PHOTOS.map((photo, i) => (
          <li key={photo.src} className="relative aspect-square">
            <button type="button" onClick={() => setOpenIndex(i)} className="size-full" aria-label={`${photo.alt} 보기`}>
              <Image src={photo.src} alt="" fill sizes="130px" className="object-cover" />
            </button>
            {liked.has(i) && <Heart className="pointer-events-none absolute bottom-1 left-1 size-4 fill-white text-white" aria-label="즐겨찾기됨" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

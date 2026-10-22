export type Track = {
  title: string
  artist: string
  duration: number
  cover: string
}

export const TRACKS: Track[] = [
  { title: '밤편지', artist: '아이유', duration: 253, cover: 'from-indigo-500 to-sky-800' },
  { title: 'Hype Boy', artist: 'NewJeans', duration: 179, cover: 'from-sky-300 to-blue-600' },
  { title: '사건의 지평선', artist: '윤하', duration: 300, cover: 'from-violet-500 to-fuchsia-900' },
  { title: 'Supernova', artist: 'aespa', duration: 178, cover: 'from-zinc-500 to-zinc-900' },
  { title: 'APT.', artist: 'ROSÉ, Bruno Mars', duration: 170, cover: 'from-rose-400 to-red-700' },
  { title: '한 페이지가 될 수 있게', artist: 'DAY6', duration: 207, cover: 'from-amber-400 to-orange-700' },
]

export const PLAYLISTS = [
  { name: '좋아요 표시한 곡', cover: 'from-indigo-600 to-violet-300', trackIndex: 0 },
  { name: 'Daily Mix 1', cover: 'from-emerald-500 to-emerald-900', trackIndex: 1 },
  { name: 'K-Pop 핫리스트', cover: 'from-pink-500 to-rose-800', trackIndex: 4 },
  { name: '드라이브 플레이리스트', cover: 'from-orange-400 to-amber-800', trackIndex: 5 },
]

export const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

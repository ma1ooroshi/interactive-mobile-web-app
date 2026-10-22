export type Contact = {
  name: string
  number: string
  label: string
  favorite?: boolean
}

export const CONTACTS: Contact[] = [
  { name: '엄마', number: '01012345678', label: '휴대전화', favorite: true },
  { name: '아빠', number: '01023456789', label: '휴대전화', favorite: true },
  { name: '김민지', number: '01034567890', label: '휴대전화', favorite: true },
  { name: '박준호', number: '01045678901', label: '직장' },
  { name: '이서연', number: '01056789012', label: '휴대전화' },
  { name: '정우성', number: '01067890123', label: '휴대전화' },
  { name: '최지우', number: '01078901234', label: '집' },
  { name: '한소희', number: '01089012345', label: '휴대전화' },
]

export type Recent = {
  name: string
  type: 'incoming' | 'outgoing' | 'missed'
  label: string
  time: string
}

export const RECENTS: Recent[] = [
  { name: '엄마', type: 'incoming', label: '휴대전화', time: '오후 2:14' },
  { name: '010-9876-5432', type: 'missed', label: '서울', time: '오전 11:02' },
  { name: '김민지', type: 'outgoing', label: '휴대전화', time: '오전 9:30' },
  { name: '박준호', type: 'missed', label: '직장', time: '어제' },
  { name: '아빠', type: 'outgoing', label: '휴대전화', time: '어제' },
  { name: '이서연', type: 'incoming', label: '휴대전화', time: '수요일' },
]

export const VOICEMAILS = [
  { name: '박준호', time: '어제', duration: 24 },
  { name: '010-5555-1234', time: '월요일', duration: 12 },
  { name: '최지우', time: '10. 17.', duration: 41 },
]

export const formatNumber = (n: string) =>
  n.length > 7 ? `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}` : n.length > 3 ? `${n.slice(0, 3)}-${n.slice(3)}` : n

const INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'

export const initialOf = (name: string) => {
  const code = name.charCodeAt(0) - 0xac00
  return code >= 0 && code < 11172 ? INITIALS[Math.floor(code / 588)] : name[0].toUpperCase()
}

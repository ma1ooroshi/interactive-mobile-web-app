import { Phone } from '@/components/phone/phone'

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-200 sm:p-6">
      <h1 className="sr-only">인터랙티브 휴대폰</h1>
      <Phone />
    </main>
  )
}

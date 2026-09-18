import { IdentificationCard } from '../components/IdentificationCard'
import type { Identification } from '../types/identification'

export function Home({ identification }: { identification: Identification }) {
  return (
    <main className="page home-page">
      <IdentificationCard identification={identification} />
    </main>
  )
}

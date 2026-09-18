import { IdentificationCard } from '../components/IdentificationCard'
import type { Identification } from '../types/identification'

interface HomeProps {
  identification?: Identification
  successMessage: string
  onEdit: () => void
  onInstall?: () => void
}

export function Home({ identification, successMessage, onEdit, onInstall }: HomeProps) {
  return (
    <main className="page home-page">
      {successMessage && <p className="notice" role="status">{successMessage}</p>}
      {identification ? (
        <>
          <IdentificationCard identification={identification} />
          <div className="home-actions">
            <button className="text-button" type="button" onClick={onEdit}>
              <EditIcon /> Editar dados
            </button>
            {onInstall && <button className="text-button" type="button" onClick={onInstall}>Instalar aplicativo</button>}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><IdentificationIcon /></div>
          <h1>Configure sua identificação</h1>
          <p>Cadastre seus dados para ter sua carteira digital sempre à mão, mesmo sem internet.</p>
          <button className="primary-button" type="button" onClick={onEdit}>Cadastrar identificação</button>
          {onInstall && <button className="text-button" type="button" onClick={onInstall}>Instalar aplicativo</button>}
        </div>
      )}
    </main>
  )
}

function EditIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4.2-.8L19 8.4a2.8 2.8 0 0 0-4-4L4.2 15.2 4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function IdentificationIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><rect x="7" y="13" width="50" height="38" rx="6" stroke="currentColor" strokeWidth="2.5"/><circle cx="23" cy="29" r="6" stroke="currentColor" strokeWidth="2.5"/><path d="M13 43c1-4.6 4.5-7 10-7s9 2.4 10 7M39 25h11M39 32h11M39 39h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
}

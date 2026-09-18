import type { Identification } from '../types/identification'

export function IdentificationCard({ identification }: { identification: Identification }) {
  return (
    <article className="identification-card" aria-label="Carteira de identificação digital">
      <header className="card-header">
        <div className="brand-logo">
          <img src={identification.companyLogo} alt={`Logo de ${identification.companyName}`} />
        </div>
        <p className="card-title">Identificação digital</p>
      </header>

      <div className="card-person">
        <div className="card-photo">
          <img src={identification.photo} alt={`Foto de ${identification.fullName}`} />
        </div>
        <h1>{identification.fullName}</h1>
      </div>

      <div className="card-details">
        <div className="card-number">
          <span>Identificação</span>
          <strong>{identification.identificationNumber}</strong>
        </div>
        <div className="card-validity">
          <span>Validade</span>
          <strong>{identification.validity}</strong>
        </div>
        <div className="card-company">
          <span>Empresa / instituição</span>
          <strong>{identification.companyName}</strong>
        </div>
        <p className="card-footer">Documento digital</p>
      </div>
    </article>
  )
}

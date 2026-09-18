import { useEffect, useState } from 'react'
import type { Identification } from '../types/identification'
import { InstitutionIcon, PersonIcon } from './ImageUpload'

function useImageUrl(blob?: Blob) {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!blob) {
      setUrl(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(blob)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [blob])

  return url
}

export function IdentificationCard({ identification }: { identification: Identification }) {
  const photoUrl = useImageUrl(identification.photo)
  const logoUrl = useImageUrl(identification.companyLogo)

  return (
    <article className="identification-card" aria-label="Carteira de identificação digital">
      <header className="card-header">
        <div className="brand-logo">
          {logoUrl ? <img src={logoUrl} alt={`Logo de ${identification.companyName}`} /> : <InstitutionIcon />}
        </div>
        <p className="card-title">Identificação digital</p>
      </header>

      <div className="card-person">
        <div className="card-photo">
          {photoUrl ? <img src={photoUrl} alt={`Foto de ${identification.fullName}`} /> : <PersonIcon />}
        </div>
        <h1>{identification.fullName}</h1>
      </div>

      <div className="card-details">
        <div className="card-number">
          <span>Identificação</span>
          <strong>{identification.identificationNumber}</strong>
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

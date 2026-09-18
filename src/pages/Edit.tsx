import { useState, type FormEvent } from 'react'
import { ImageUpload } from '../components/ImageUpload'
import { saveIdentification } from '../services/storage'
import type { Identification } from '../types/identification'

interface EditProps {
  identification?: Identification
  onCancel: () => void
  onSaved: (identification: Identification) => void
}

export function Edit({ identification, onCancel, onSaved }: EditProps) {
  const [fullName, setFullName] = useState(identification?.fullName ?? '')
  const [identificationNumber, setIdentificationNumber] = useState(identification?.identificationNumber ?? '')
  const [companyName, setCompanyName] = useState(identification?.companyName ?? '')
  const [photo, setPhoto] = useState<Blob | undefined>(identification?.photo)
  const [companyLogo, setCompanyLogo] = useState<Blob | undefined>(identification?.companyLogo)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = fullName.trim()
    const trimmedNumber = identificationNumber.trim()
    const trimmedCompany = companyName.trim()

    if (!trimmedName || !trimmedNumber || !trimmedCompany) {
      setError('Preencha nome, identificação e empresa.')
      return
    }

    const updated: Identification = {
      fullName: trimmedName,
      identificationNumber: trimmedNumber,
      companyName: trimmedCompany,
      photo,
      companyLogo,
      updatedAt: new Date().toISOString(),
    }

    setSaving(true)
    setError('')
    try {
      await saveIdentification(updated)
      onSaved(updated)
    } catch {
      setError('Não foi possível salvar neste dispositivo. Verifique o armazenamento do navegador e tente novamente.')
      setSaving(false)
    }
  }

  return (
    <main className="page edit-page">
      <button className="back-button" type="button" onClick={onCancel} aria-label="Voltar">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7M7 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <h1>Editar identificação</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label className="field"><span className="field-label">Nome completo</span><input name="fullName" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required maxLength={100} /></label>
          <label className="field"><span className="field-label">Número de identificação</span><input name="identificationNumber" value={identificationNumber} onChange={(event) => setIdentificationNumber(event.target.value)} required maxLength={50} /></label>
          <label className="field"><span className="field-label">Empresa / instituição</span><input name="companyName" autoComplete="organization" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required maxLength={100} /></label>
        </div>

        <div className="upload-grid">
          <ImageUpload label="Foto do perfil" kind="photo" image={photo} onChange={setPhoto} />
          <ImageUpload label="Logo da instituição" kind="logo" image={companyLogo} onChange={setCompanyLogo} />
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onCancel} disabled={saving}>Cancelar</button>
          <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </main>
  )
}

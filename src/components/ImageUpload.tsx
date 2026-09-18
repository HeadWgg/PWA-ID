import { useEffect, useId, useState } from 'react'

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxFileSize = 10 * 1024 * 1024

interface ImageUploadProps {
  label: string
  image?: Blob
  kind: 'photo' | 'logo'
  onChange: (image?: Blob) => void
}

export function ImageUpload({ label, image, kind, onChange }: ImageUploadProps) {
  const inputId = useId()
  const [preview, setPreview] = useState<string>()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!image) {
      setPreview(undefined)
      return
    }

    const url = URL.createObjectURL(image)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  function handleFile(file?: File) {
    if (!file) return
    if (!acceptedTypes.includes(file.type)) {
      setError('Use uma imagem JPG, PNG ou WEBP.')
      return
    }
    if (file.size > maxFileSize) {
      setError('A imagem deve ter até 10 MB.')
      return
    }
    setError('')
    onChange(file)
  }

  return (
    <div className="image-field">
      <span className="field-label">{label}</span>
      <div className={`image-preview image-preview--${kind}`}>
        {preview ? <img src={preview} alt={`Prévia de ${label.toLowerCase()}`} /> : (
          <span className="image-placeholder" aria-hidden="true">
            {kind === 'photo' ? <PersonIcon /> : <InstitutionIcon />}
          </span>
        )}
        {image && (
          <button type="button" className="remove-image" onClick={() => onChange(undefined)} aria-label={`Remover ${label.toLowerCase()}`}>
            ×
          </button>
        )}
      </div>
      <label className="upload-button" htmlFor={inputId}>{image ? 'Trocar imagem' : 'Selecionar imagem'}</label>
      <input
        id={inputId}
        className="visually-hidden"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  )
}

export function PersonIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="2.5"/><path d="M14 54c1.8-10.4 8.3-16 18-16s16.2 5.6 18 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
}

export function InstitutionIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M8 25 32 12l24 13H8ZM13 52h38M18 29v19m14-19v19m14-19v19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

import { useEffect, useState } from 'react'
import { Edit } from './pages/Edit'
import { Home } from './pages/Home'
import { getIdentification } from './services/storage'
import type { Identification } from './types/identification'

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function currentPath() {
  return window.location.pathname === '/editar' ? '/editar' : '/'
}

export default function App() {
  const [path, setPath] = useState(currentPath)
  const [identification, setIdentification] = useState<Identification>()
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent>()

  useEffect(() => {
    getIdentification()
      .then(setIdentification)
      .catch(() => setLoadError('Não foi possível acessar os dados locais. Verifique o armazenamento do navegador.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const handlePopState = () => setPath(currentPath())
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
    }
  }, [])

  function navigate(to: '/' | '/editar') {
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }

  async function install() {
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(undefined)
  }

  if (loading) return <main className="page loading-state" role="status">Carregando identificação…</main>
  if (loadError) return <main className="page error-state" role="alert">{loadError}</main>

  return path === '/editar' ? (
    <Edit
      identification={identification}
      onCancel={() => navigate('/')}
      onSaved={(updated) => {
        setIdentification(updated)
        setSuccessMessage('Identificação salva com sucesso.')
        navigate('/')
      }}
    />
  ) : (
    <Home
      identification={identification}
      successMessage={successMessage}
      onEdit={() => {
        setSuccessMessage('')
        navigate('/editar')
      }}
      onInstall={installPrompt ? install : undefined}
    />
  )
}

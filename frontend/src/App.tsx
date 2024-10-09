import React, { memo } from 'react'
import URLShortener from './pages/URLShortener'

const App: React.FC = memo(() => <URLShortener />)
App.displayName = 'App'
export default App

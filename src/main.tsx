import React from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Main } from './components'
// import '../public/styles/fonts.css'
// import '../public/styles/reset.css'
// import '../public/styles/styles.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
)

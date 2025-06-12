import { BrowserRouter } from 'react-router'
import './App.css'
import AppRoutes from './routing/AppRoutes'
import { useAuthSync } from './hooks/useAuthSync';

function App() {
  useAuthSync();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

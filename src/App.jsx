import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Navbar from './shared/components/layout/Navbar'
import Footer from './shared/components/layout/Footer'
import CustomCursor from './shared/components/ui/CustomCursor'

/**
 * Main Application Component
 * Clean, organized structure with feature-based routing
 * 
 * TODO: Backend Integration
 * - Add global state management (Context API or Redux)
 * - Implement authentication context
 * - Add error boundary for better error handling
 * - Add loading states and progress indicators
 */
export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="min-h-screen flex flex-col overflow-x-hidden cursor-none">
        {/* Global Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow overflow-x-hidden">
          <AppRoutes />
        </main>
        
        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

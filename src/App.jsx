import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Navbar from './shared/components/layout/Navbar'
import Footer from './shared/components/layout/Footer'
import ClickSpark from './shared/components/ui/ClickSpark'

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
      <ClickSpark
        sparkColor='#8B5CF6'
        sparkSize={12}
        sparkRadius={25}
        sparkCount={8}
        duration={600}
      >
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {/* Global Navigation */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow overflow-x-hidden">
            <AppRoutes />
          </main>
          
          {/* Global Footer */}
          <Footer />
        </div>
      </ClickSpark>
    </BrowserRouter>
  )
}

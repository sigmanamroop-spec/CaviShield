rc/
├── index.css
├── App.jsx
├── pages/
│   ├── Home.js
│   ├── Compliance.js
│   ├── Diagnostics.js
│   └── Bluetooth.js
└── components/
    └── cavitation/
        ├── AppLayout.jsx
        ├── AppHeader.jsx
        ├── BottomNav.jsx
        ├── CleanlinessGauge.jsx
        ├── WaterSavedCard.jsx
        ├── SystemStatusCard.jsx
        └── ConveyorSchematic.jsx
App.jsx
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AppLayout from '@/components/cavitation/AppLayout';
import Home from '@/pages/Home';
import Compliance from '@/pages/Compliance';
import Diagnostics from '@/pages/Diagnostics';
import BluetoothPage from '@/pages/Bluetooth';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    else if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/bluetooth" element={<BluetoothPage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}
export default App
index.css (key additions to standard shadcn base)
/* Add to :root */
--background: 216 28% 96%;
--primary: 222 47% 16%;
--secondary: 180 70% 35%;
--font-heading: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;

/* Custom animations */
@keyframes gauge-fill {
  from { stroke-dashoffset: 283; }
}
@keyframes scan-line {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
.animate-gauge-fill { animation: gauge-fill 1.5s ease-out forwards; }
... (788 lines left)

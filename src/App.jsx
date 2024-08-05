import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import { ToastProvider } from "./context/ToastContext";

import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    // <ErrorBoundary>
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <BookProvider>
            <AppRoutes />
          </BookProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
    // </ErrorBoundary>
  );
}

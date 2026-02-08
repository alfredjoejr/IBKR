import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LoginModal } from './components/LoginModal';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate API call/loading if needed
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Layout>
      {!isLoggedIn ? (
        <>
          <Header onLoginClick={() => setIsLoginOpen(true)} />
          
          <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-12">
            <Hero />
          </main>

          <footer className="relative z-10 py-6 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} IBKR System View. Institutional Grade Trading.</p>
          </footer>
        </>
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />}
    </Layout>
  );
}
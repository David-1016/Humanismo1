import { useState, useCallback } from 'react';
import { Hero } from '@/components/Hero';
import { Postulate } from '@/components/Postulate';
import { Readings } from '@/components/Readings';
import { Arguments } from '@/components/Arguments';
import { Participation } from '@/components/Participation';
import { Conclusion } from '@/components/Conclusion';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  const [, setNavigationTrigger] = useState(0);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavigationTrigger((n) => n + 1);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Hero onNavigate={handleNavigate} />
      <ErrorBoundary>
        <Postulate />
      </ErrorBoundary>
      <ErrorBoundary>
        <Readings />
      </ErrorBoundary>
      <ErrorBoundary>
        <Arguments />
      </ErrorBoundary>
      <ErrorBoundary>
        <Participation />
      </ErrorBoundary>
      <ErrorBoundary>
        <Conclusion onNavigate={handleNavigate} />
      </ErrorBoundary>
    </div>
  );
}

export default App;

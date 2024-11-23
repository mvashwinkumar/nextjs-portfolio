// components/layout/NavigationWrapper.tsx
import { Navigation } from './Navigation';

export default function NavigationWrapper() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <Navigation />
      </div>
    </header>
  );
}

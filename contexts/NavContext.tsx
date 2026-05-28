'use client';
import { createContext, useContext, useState } from 'react';

interface NavContextType {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const NavContext = createContext<NavContextType>({
  mobileOpen: false,
  setMobileOpen: () => {},
});

export const useNav = () => useContext(NavContext);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <NavContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </NavContext.Provider>
  );
}

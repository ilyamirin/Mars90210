import type { PropsWithChildren } from 'react';
import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <NavBar />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
}

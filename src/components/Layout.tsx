// docs.defendableos.com · Layout shell
//
// Top header (brand · cross-site nav · external GitHub)
// Sticky left sidebar (grouped nav)
// Main content area with right-hand "On this page" anchor list
// Same charcoal + honey brand voice as defendableos.com

import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const SITE_URL = "https://defendableos.com";
const GITHUB_URL = "https://github.com/SudoSuOps";
const EMAIL = "defense@defendableos.com";

type NavGroup = { heading: string; items: { label: string; href: string }[] };

const SIDEBAR: NavGroup[] = [
  {
    heading: "Get Started",
    items: [
      { label: "Quickstart", href: "/quickstart" },
      { label: "Architecture", href: "/architecture" },
    ],
  },
  {
    heading: "Core Concepts",
    items: [
      { label: "The Deed", href: "/deed" },
      { label: "Tribunal", href: "/tribunal" },
      { label: "Doctrine Packs", href: "/doctrine-packs" },
    ],
  },
  {
    heading: "Products",
    items: [
      { label: "HoneyBox", href: "/honeybox" },
      { label: "DefendableCloud", href: "/cloud" },
    ],
  },
  {
    heading: "Reference",
    items: [
      { label: "Glossary", href: "/glossary" },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-stone-200 antialiased selection:bg-amber-500/30 selection:text-amber-100">
      <BackgroundGrid />
      <Header />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[14rem_1fr] gap-10">
        <Sidebar />
        <main className="min-h-screen pt-8 pb-20 lg:pt-12">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(212,170,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,170,40,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/60 bg-neutral-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <EmblemMark />
          <span className="font-semibold tracking-tight text-stone-100 text-lg">
            <span className="text-amber-400">Defendable</span>OS
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold border-l border-stone-700 pl-3 ml-1">Docs</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 ml-auto text-sm text-stone-400">
          <a href={SITE_URL} className="hover:text-stone-200 transition-colors">Main site</a>
          <a href={`${SITE_URL}/opendefense`} className="hover:text-stone-200 transition-colors">OpenDefense</a>
          <a href={`${SITE_URL}/pricing`} className="hover:text-stone-200 transition-colors">Pricing</a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-amber-500/40 bg-amber-500/10 text-sm text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-colors font-semibold tracking-tight"
          >
            GitHub
            <GithubIcon />
          </a>
        </nav>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="ml-auto lg:hidden inline-flex items-center justify-center w-9 h-9 rounded border border-stone-800 text-stone-300"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M3 3l12 12M15 3L3 15" /> : <><path d="M2 5h14" /><path d="M2 9h14" /><path d="M2 13h14" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-stone-800/60 bg-neutral-950/95">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-4">
            {SIDEBAR.map((g) => (
              <div key={g.heading}>
                <div className="text-[10px] uppercase tracking-[0.22em] text-amber-400/80 font-semibold mb-2">{g.heading}</div>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link to={it.href} onClick={() => setOpen(false)} className="text-sm text-stone-300 hover:text-amber-300">{it.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 pt-3 border-t border-stone-800 flex flex-col gap-2 text-sm">
              <a href={SITE_URL} onClick={() => setOpen(false)} className="text-stone-300 hover:text-amber-300">↗ Main site</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-amber-300">↗ GitHub</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:block sticky top-20 self-start pt-8 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="space-y-8 pb-12">
        {SIDEBAR.map((g) => (
          <div key={g.heading}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-amber-400/80 font-semibold mb-3">{g.heading}</div>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it.href}>
                  <NavLink
                    to={it.href}
                    className={({ isActive }) =>
                      `block text-sm py-1 px-2 -mx-2 rounded transition-colors ${
                        isActive || (pathname === "/" && it.href === "/quickstart")
                          ? "bg-amber-500/[0.08] text-amber-300 font-medium"
                          : "text-stone-400 hover:text-stone-100"
                      }`
                    }
                  >
                    {it.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-3">
          <EmblemMark />
          <span>
            <span className="text-amber-400 font-semibold">Defendable</span>OS Docs · © 2026 Swarm and Bee LLC · D-U-N-S 138652395
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono">
          <a href={SITE_URL} className="hover:text-amber-300 transition-colors">↗ defendableos.com</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">↗ github</a>
          <a href={`mailto:${EMAIL}`} className="hover:text-amber-300 transition-colors">↗ {EMAIL}</a>
        </div>
      </div>
    </footer>
  );
}

function EmblemMark() {
  return (
    <span className="inline-flex w-8 h-8 rounded border border-amber-400/40 items-center justify-center text-amber-300 bg-amber-500/[0.04]">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 2h6l3 3v9H4z" />
        <path d="M6 7h6M6 9h6M6 11h4" strokeWidth="1" opacity="0.65" />
      </svg>
    </span>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

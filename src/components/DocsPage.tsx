// Shared docs-page primitives · heading hierarchy · prose styling ·
// code blocks · callout boxes · cross-page Link · "On this page" anchor list.

import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Page({
  title, intro, children,
}: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <article className="max-w-3xl">
      <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-stone-50 leading-[1.05]">
        {title}
      </h1>
      {intro && (
        <div className="mt-6 text-lg text-stone-300 leading-relaxed">{intro}</div>
      )}
      <div className="mt-10 space-y-6">{children}</div>
    </article>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-12 text-2xl lg:text-3xl font-semibold tracking-tight text-stone-100 leading-tight">
      <a href={`#${id}`} className="group">
        {children}
        <span className="ml-2 text-stone-700 group-hover:text-amber-300 text-base">#</span>
      </a>
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 mt-8 text-xl font-semibold tracking-tight text-stone-100 leading-tight">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-base text-stone-300 leading-relaxed">{children}</p>;
}

export function Em({ children }: { children: ReactNode }) {
  return <span className="font-serif italic text-amber-300">{children}</span>;
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.92em] text-amber-300 bg-stone-900/60 px-1.5 py-0.5 rounded border border-stone-800/60">
      {children}
    </code>
  );
}

export function CodeBlock({
  lang, label, children,
}: { lang?: string; label?: string; children: string }) {
  return (
    <div className="my-4 rounded-xl border border-stone-700/70 bg-neutral-950 overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-stone-900/60">
        <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500 font-mono">{label || lang || "code"}</span>
      </div>
      <pre className="px-5 py-4 font-mono text-[12.5px] leading-relaxed text-stone-200 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Callout({
  kind = "info", title, children,
}: { kind?: "info" | "warn" | "success"; title?: string; children: ReactNode }) {
  const cls = kind === "warn"
    ? "border-amber-500/40 bg-amber-500/[0.06]"
    : kind === "success"
      ? "border-emerald-500/40 bg-emerald-500/[0.05]"
      : "border-stone-700 bg-stone-900/40";
  const titleCls = kind === "warn" ? "text-amber-300" : kind === "success" ? "text-emerald-300" : "text-stone-200";
  return (
    <div className={`my-5 rounded-xl border ${cls} px-5 py-4`}>
      {title && <div className={`text-[10px] uppercase tracking-[0.22em] font-semibold ${titleCls}`}>{title}</div>}
      <div className={`text-sm text-stone-300 leading-relaxed ${title ? "mt-1.5" : ""}`}>{children}</div>
    </div>
  );
}

export function NextPrev({ prev, next }: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="mt-16 pt-8 border-t border-stone-900 grid grid-cols-2 gap-4">
      <div>
        {prev && (
          <Link to={prev.href} className="block rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-4 hover:border-amber-500/40 transition-colors group">
            <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold">← Previous</div>
            <div className="mt-1 text-sm text-stone-200 font-semibold group-hover:text-amber-300 transition-colors">{prev.label}</div>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link to={next.href} className="block rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-4 hover:border-amber-500/40 transition-colors group text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500 font-semibold">Next →</div>
            <div className="mt-1 text-sm text-stone-200 font-semibold group-hover:text-amber-300 transition-colors">{next.label}</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-amber-400/80 font-semibold">
      <span className="inline-block w-6 h-px bg-amber-400/60" />
      {children}
    </div>
  );
}

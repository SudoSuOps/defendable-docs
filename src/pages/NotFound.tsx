import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl py-20">
      <div className="text-[10px] uppercase tracking-[0.24em] text-amber-400/80 font-semibold">404 · NOT FOUND</div>
      <h1 className="mt-6 text-4xl lg:text-5xl font-semibold tracking-tight text-stone-50 leading-[1.05]">
        That page isn't{" "}
        <span className="font-serif italic font-normal text-amber-300">deeded</span> yet.
      </h1>
      <p className="mt-6 text-lg text-stone-300 leading-relaxed">
        The URL you tried doesn't exist in the docs. Try one of the
        pages below · or use the sidebar to navigate.
      </p>
      <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-sm">
        {[
          ["Quickstart", "/quickstart"],
          ["Architecture", "/architecture"],
          ["The Deed", "/deed"],
          ["Tribunal", "/tribunal"],
          ["Doctrine Packs", "/doctrine-packs"],
          ["HoneyBox", "/honeybox"],
          ["DefendableCloud", "/cloud"],
          ["Glossary", "/glossary"],
        ].map(([label, href]) => (
          <li key={href}>
            <Link to={href} className="block rounded border border-stone-800 bg-neutral-950/60 px-4 py-3 text-stone-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

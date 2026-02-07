// src/components/InnovationPreview.jsx
import React from "react";
import content from "../data/index";
import localData from "../data/innovation.json";
import { useMemo } from "react";
import useShowOnHomeOverrides from "../hooks/useShowOnHomeOverrides";
/**
 * InnovationPreview
 * Props:
 *  - limit: number (optional) => show up to this many items (default 3)
 *  - pick: string[] (optional) => array of item ids to display (explicit)
 *  - onOpen: function (optional) => called with item when preview card clicked
 *
 * Selection precedence:
 *  1) prop.pick (explicit)
 *  2) content.homeInnovation (array of ids in content.json)
 *  3) items with showOnHome === true in data/innovation.json
 *  4) first `limit` items from the file
 */

export default function InnovationPreview({ limit = 3, pick = null, onOpen = () => { } }) {
  const items = Array.isArray(localData) ? localData : (Array.isArray(localData?.items) ? localData.items : []);
  const contentPick = Array.isArray(content?.homeInnovation) ? content.homeInnovation : null;

  // new: get overrides
  const { overrides } = useShowOnHomeOverrides();

  const selected = useMemo(() => {
    // create a version of items applying overrides to showOnHome
    const itemsWithOverrides = items.map((it) => {
      const id = it.id || it.title;
      const override = overrides && overrides.hasOwnProperty(id) ? overrides[id] : undefined;
      return { ...it, showOnHome: override !== undefined ? !!override : !!it.showOnHome };
    });

    if (Array.isArray(pick) && pick.length > 0) {
      return pick.map(id => itemsWithOverrides.find(it => it.id === id)).filter(Boolean).slice(0, limit);
    }

    if (contentPick && contentPick.length > 0) {
      return contentPick.map(id => itemsWithOverrides.find(it => it.id === id)).filter(Boolean).slice(0, limit);
    }

    const showOnHome = itemsWithOverrides.filter(it => it && it.showOnHome);
    if (showOnHome.length > 0) return showOnHome.slice(0, limit);

    // fallback: first N items
    return itemsWithOverrides.slice(0, limit);
  }, [items, pick, contentPick, limit, overrides]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {selected.map(item => (
        <button
          key={item.id || item.title}
          onClick={() => onOpen(item)}
          className="text-left rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/40 transition focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] text-slate-400">{item.type}</p>
              <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-300 line-clamp-3 mt-1">{item.description}</p>
            </div>
            {item.status && (
              <span className={"ml-3 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] " + (
                (item.status || "").toLowerCase().includes("live") ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40" :
                  (item.status || "").toLowerCase().includes("progress") ? "bg-sky-500/10 text-sky-300 border-sky-500/40" :
                    (item.status || "").toLowerCase().includes("future") ? "bg-violet-500/10 text-violet-300 border-violet-500/40" :
                      "bg-slate-600/10 text-slate-300 border-slate-600/40"
              )}>{item.status}</span>
            )}
          </div>

          {item.tech && item.tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
              {item.tech.slice(0, 5).map(t => (
                <span key={t} className="rounded-full bg-slate-900/80 border border-slate-700 px-2 py-0.5">{t}</span>
              ))}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

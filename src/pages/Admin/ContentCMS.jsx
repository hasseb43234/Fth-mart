import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { FileText, Save, Sparkles, Zap, Megaphone } from 'lucide-react';
import { HERO_SLIDES } from '../../data/mock-data';

export const AdminContentCMS = () => {
  const announcementText = useStore((state) => state.announcementText);
  const setAnnouncementText = useStore((state) => state.setAnnouncementText);

  const [announcement, setAnnouncement] = useState(announcementText);
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setAnnouncementText(announcement);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Content & Flash Sale CMS</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage top announcement ticker, hero carousel promotions, and flash sale countdowns
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Announcement Ticker */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-400" /> Top Announcement Header Ticker
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Header Ticker Text</label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30"
          >
            {isSaved ? 'Published Live!' : 'Save Announcement'}
          </button>
        </div>

        {/* Hero Carousel Slides Manager */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" /> Hero Banner Carousel Slides ({slides.length})
          </h3>

          <div className="space-y-4">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="p-4 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Slide #{idx + 1}: {slide.tag}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{slide.discountTag}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx].title = e.target.value;
                      setSlides(updated);
                    }}
                    className="text-xs p-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                  />
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx].subtitle = e.target.value;
                      setSlides(updated);
                    }}
                    className="text-xs p-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

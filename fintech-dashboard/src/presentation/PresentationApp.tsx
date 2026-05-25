import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  Minimize2,
  StickyNote,
  Sun,
  Moon,
} from 'lucide-react';
import { SLIDES } from './slides.config';
import { SPEAKER_NOTES } from './speakerNotes';
import { useTheme } from '../context/ThemeContext';

export function PresentationApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const initial = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const raw = Number(params.get('s'));
    if (!Number.isFinite(raw) || raw < 1 || raw > SLIDES.length) return 0;
    return raw - 1;
  }, [location.search]);

  const [index, setIndex] = useState<number>(initial);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = SLIDES[index];
  const SlideComponent = slide.component;
  const notes = SPEAKER_NOTES[slide.id] ?? [];

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
      setDirection(clamped > index ? 1 : -1);
      setIndex(clamped);
      const params = new URLSearchParams(location.search);
      params.set('s', String(clamped + 1));
      navigate({ pathname: '/present', search: params.toString() }, { replace: true });
    },
    [index, location.search, navigate],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Escape') {
        navigate('/');
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        setNotesOpen((v) => !v);
      } else if (e.key.toLowerCase() === 'd') {
        if (slide.dashboardTarget) navigate(slide.dashboardTarget.path);
      } else if (/^[1-9]$/.test(e.key)) {
        const target = Number(e.key) - 1;
        if (target < SLIDES.length) goTo(target);
      } else if (e.key.toLowerCase() === 't') {
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, navigate, toggleFullscreen, slide.dashboardTarget, goTo, toggle]);

  const progress = ((index + 1) / SLIDES.length) * 100;

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">
      <div className="absolute inset-0 mesh-bg pointer-events-none" aria-hidden />

      <div className="absolute top-0 left-0 right-0 z-30">
        <div className="h-[2px] bg-[var(--border)]">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-amber-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="flex items-center justify-between gap-3 px-4 lg:px-6 py-2.5">
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-teal-400 hover:bg-[var(--bg-glass)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous (←)"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === index
                      ? 'w-5 bg-teal-400'
                      : 'w-1 bg-[var(--text-muted)]/40 hover:bg-teal-400/60'
                  }`}
                  title={`${s.kicker} · ${s.title}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={index === SLIDES.length - 1}
              className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-teal-400 hover:bg-[var(--bg-glass)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next (→)"
            >
              <ChevronRight size={16} />
            </button>
            <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums pl-2 ml-1 border-l border-[var(--border)]">
              {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-2.5 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-medium text-[var(--text-secondary)] hover:text-teal-400 hover:bg-[var(--bg-glass)] inline-flex items-center gap-1.5 transition-colors"
              title="Dashboard (Esc)"
            >
              <Home size={13} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setNotesOpen((v) => !v)}
              className={`p-1.5 rounded-md transition-colors ${
                notesOpen
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-[var(--text-secondary)] hover:text-amber-400 hover:bg-[var(--bg-glass)]'
              }`}
              title="Speaker notes (N)"
            >
              <StickyNote size={14} />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-teal-400 hover:bg-[var(--bg-glass)] transition-colors"
              title="Toggle theme (T)"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-teal-400 hover:bg-[var(--bg-glass)] transition-colors"
              title="Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pt-16">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, scale: 0.99 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 60, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {notesOpen && (
          <motion.aside
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 bottom-0 right-0 w-[360px] z-20 pt-14 px-6 pb-6 overflow-y-auto bg-[var(--bg-secondary)]/95 backdrop-blur-xl border-l border-[var(--border)]"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-2">
              Speaker Notes
            </p>
            <p className="font-display text-lg font-semibold text-[var(--text-primary)] mb-1">
              {slide.title}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Presenter · {slide.presenter}
            </p>
            <ul className="space-y-3">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 border-l-2 border-teal-400/40"
                >
                  {note}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-5 border-t border-[var(--border)] text-xs text-[var(--text-muted)] font-mono leading-relaxed">
              <p className="mb-2 text-amber-400">Shortcuts</p>
              <p>← / → · navigate</p>
              <p>1–6 · jump to slide</p>
              <p>D · open dashboard demo</p>
              <p>F · fullscreen · T · theme</p>
              <p>N · toggle these notes</p>
              <p>Esc · exit to dashboard</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

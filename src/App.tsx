import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Grid,
  Layers,
  Maximize2,
  Minimize2,
  Printer,
} from 'lucide-react';
import { SLIDES } from './data/cbasSlides';
import { SlideFrame } from './components/slides/SlideFrame';
import { exportSlidesToPdf, type PdfExportProgress } from './utils/pdfExport';
import { Slide01Concept } from './components/slides/Slide01Concept';
import { Slide02QuoteTable } from './components/slides/Slide02QuoteTable';
import { Slide03FormulaDilution } from './components/slides/Slide03FormulaDilution';
import { Slide04ParityPremium } from './components/slides/Slide04ParityPremium';
import { Slide05CostLeverage } from './components/slides/Slide05CostLeverage';
import { Slide06ExitMethods } from './components/slides/Slide06ExitMethods';
import { Slide07RolloverPutDay } from './components/slides/Slide07RolloverPutDay';
import { Slide08CheatSheet } from './components/slides/Slide08CheatSheet';

function renderSlideBody(index: number) {
  switch (index) {
    case 0:
      return <Slide01Concept />;
    case 1:
      return <Slide02QuoteTable />;
    case 2:
      return <Slide03FormulaDilution />;
    case 3:
      return <Slide04ParityPremium />;
    case 4:
      return <Slide05CostLeverage />;
    case 5:
      return <Slide06ExitMethods />;
    case 6:
      return <Slide07RolloverPutDay />;
    case 7:
      return <Slide08CheatSheet />;
    default:
      return <Slide01Concept />;
  }
}

const NAV_CHAPTERS = [
  { label: '概念入門', slideIndex: 0 },
  { label: '報價表解剖', slideIndex: 1 },
  { label: '靈魂公式', slideIndex: 2 },
  { label: '價值指標', slideIndex: 3 },
  { label: '槓桿與出場', slideIndex: 4 },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'overview'>('deck');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<PdfExportProgress | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const exportStageRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = SLIDES.length;

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
        return;
      }
      if (viewMode !== 'deck') return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(totalSlides - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewMode, totalSlides, isFullscreen]);

  useEffect(() => {
    if (!isExportingPdf) return;
    let cancelled = false;

    const runExport = async () => {
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
      if (cancelled || !exportStageRef.current) return;

      try {
        await exportSlidesToPdf(
          exportStageRef.current,
          'CBAS_聚隆四_圖卡教學簡報.pdf',
          (progress) => {
            if (!cancelled) setExportProgress(progress);
          }
        );
      } catch (err) {
        if (!cancelled) {
          setExportError(
            err instanceof Error ? err.message : 'PDF 匯出失敗，請改用「新分頁開啟」後按 Ctrl/Cmd+P 列印'
          );
        }
      } finally {
        if (!cancelled) {
          setIsExportingPdf(false);
          setExportProgress(null);
        }
      }
    };

    void runExport();
    return () => {
      cancelled = true;
    };
  }, [isExportingPdf]);

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      if (document.fullscreenElement && document.exitFullscreen) {
        try {
          await document.exitFullscreen();
        } catch {
          // Ignore exit errors inside sandboxed iframes
        }
      }
      setIsFullscreen(false);
      return;
    }

    setIsFullscreen(true);
    if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        // Iframe blocks native fullscreen API; in-app full-viewport theater mode remains active
      }
    }
  };

  const handleDownloadPdf = () => {
    if (isExportingPdf) return;
    setExportError(null);
    setExportProgress({ current: 0, total: totalSlides });
    setIsExportingPdf(true);
  };

  const jumpToSlide = (idx: number) => {
    setActiveIndex(idx);
    if (viewMode === 'overview') {
      setViewMode('deck');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSlide = SLIDES[activeIndex];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 flex flex-col bg-[#F8FAFC] text-[#0F172A] overflow-y-auto'
          : 'min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]'
      }
    >
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      {!isFullscreen && (
        <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => jumpToSlide(0)}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer hover:text-sky-700 transition-colors"
          >
            CBAS 圖卡教學簡報
          </button>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="簡報章節導覽"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {NAV_CHAPTERS.map((item) => {
              const isCurrent =
                viewMode === 'deck' &&
                (activeIndex === item.slideIndex ||
                  (item.slideIndex === 4 && activeIndex >= 4));
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => jumpToSlide(item.slideIndex)}
                  className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-sky-600 text-slate-900 font-semibold'
                      : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action — Blue Download PDF button always sticky at top-right */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-60 disabled:cursor-wait transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {isExportingPdf
                  ? `產生 PDF (${exportProgress?.current ?? 0}/${exportProgress?.total ?? totalSlides})...`
                  : '下載 PDF 簡報'}
              </span>
            </button>
          </div>
        </div>
      </header>
      )}

      {/* Main Content Workspace */}
      <main
        className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 ${
          isFullscreen ? 'max-w-[1360px] py-4 sm:py-6' : 'max-w-7xl py-6 sm:py-8'
        }`}
      >
        {/* Workspace Utility Toolbar: Overview Toggle, Fullscreen, Open in New Tab */}
        <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {isFullscreen && (
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-60 disabled:cursor-wait cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  {isExportingPdf
                    ? `產生 PDF (${exportProgress?.current ?? 0}/${exportProgress?.total ?? totalSlides})...`
                    : '下載 PDF 簡報'}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>結束全螢幕 (ESC)</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>全螢幕簡報</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setViewMode((prev) => (prev === 'deck' ? 'overview' : 'deck'))
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors whitespace-nowrap shrink-0"
            >
              {viewMode === 'deck' ? (
                <>
                  <Grid className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>總覽全部圖卡</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>返回簡報模式</span>
                </>
              )}
            </button>

            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>新分頁開啟全視窗</span>
            </a>
          </div>

          {exportError ? (
            <div role="alert" className="text-xs font-medium text-red-700">
              {exportError}
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              點右上角藍色「下載 PDF 簡報」即可匯出 8 頁 A4 橫式圖卡 PDF
            </div>
          )}
        </div>
        {viewMode === 'deck' ? (
          <div className="space-y-5">
            {/* Compact Deck Progress & Slide Selector Rail */}
            <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-sky-700 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-mono tabular-nums mr-1">{slide.number}.</span>
                      <span>{slide.navGroup === '出場與續約' && idx === 7 ? '口訣總表' : slide.navGroup === '概念入門' && idx === 1 ? '報價解剖' : slide.navGroup === '出場與續約' && idx === 5 ? '出場退息' : slide.navGroup === '出場與續約' && idx === 6 ? '續約秘訣' : slide.navGroup}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeIndex === 0}
                  aria-label="上一張圖卡"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>上一張</span>
                </button>
                <span className="font-mono text-xs font-semibold text-slate-600 px-2 tabular-nums">
                  {activeIndex + 1} / {totalSlides}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => Math.min(totalSlides - 1, prev + 1))
                  }
                  disabled={activeIndex === totalSlides - 1}
                  aria-label="下一張圖卡"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>下一張</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Active Infographic Slide Card */}
            <SlideFrame meta={activeSlide} totalSlides={totalSlides}>
              {renderSlideBody(activeIndex)}
            </SlideFrame>

            {/* Bottom Keyboard / Quick Hint */}
            <div className="no-print flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
              <span>提示：可使用鍵盤左右方向鍵（← / →）快速切換圖卡，或點擊「總覽全部圖卡」一次檢視 8 張完整簡報。</span>
              <span className="font-mono tabular-nums">
                範例標的：聚隆四 (14664) · 2026/11/16 收盤 14.00 · 轉換價 18.60 (除息調降) · 市價 104.05
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Workspace Toolbar */}
            <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  全部 8 張圖卡式教學簡報總覽
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  從「聚隆四 (14664)」出發，一次掌握 CBAS 核心公式、報價表解析、11.18 倍槓桿與出場續約機制
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>列印 / 另存 PDF</span>
              </button>
            </div>

            {/* All 8 Slides */}
            <div className="space-y-8">
              {SLIDES.map((meta, idx) => (
                <div key={meta.id} className="space-y-2">
                  <div className="no-print flex justify-end">
                    <button
                      type="button"
                      onClick={() => jumpToSlide(idx)}
                      className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-4 cursor-pointer"
                    >
                      聚焦檢視圖卡 {meta.number} →
                    </button>
                  </div>
                  <SlideFrame meta={meta} totalSlides={totalSlides}>
                    {renderSlideBody(idx)}
                  </SlideFrame>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Off-screen fixed-width 1280px stage mounted strictly during PDF generation */}
      {isExportingPdf && (
        <div
          ref={exportStageRef}
          aria-hidden="true"
          style={{ fontFamily: 'sans-serif' }}
          className="fixed -left-[99999px] top-0 w-[1280px] bg-[#F8FAFC] p-4 space-y-6 pointer-events-none"
        >
          {SLIDES.map((meta, idx) => (
            <div key={meta.id} data-export-slide={meta.id}>
              <SlideFrame meta={meta} totalSlides={totalSlides}>
                {renderSlideBody(idx)}
              </SlideFrame>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

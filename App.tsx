import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Type, Layers, Palette, Eye, Sliders, Sparkles, RefreshCw, Download, HelpCircle, Terminal } from 'lucide-react';
import { DepthControls } from './components/DepthControls';
import { ExportModal } from './components/ExportModal';
import { EyeTrainingGuide } from './components/EyeTrainingGuide';
import { Header } from './components/Header';
import { PatternControls } from './components/PatternControls';
import { PreviewViewport } from './components/PreviewViewport';
import { StereoControls } from './components/StereoControls';
import { TextInputPanel } from './components/TextInputPanel';
import { FontItem } from './fonts/fontLoader';
import { DepthMapResult } from './stereogram/depthMap';
import { DEFAULT_CONFIG, PRESETS } from './stereogram/presets';
import { StereogramRenderer } from './stereogram/stereogramRenderer';
import { Preset, RenderMetrics, StereogramConfig } from './types/stereogram';

export const App: React.FC = () => {
  const [config, setConfig] = useState<StereogramConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'text' | 'depth' | 'pattern' | 'stereo'>('text');
  
  // Rendered Data States
  const [stereogramData, setStereogramData] = useState<ImageData | null>(null);
  const [depthMapResult, setDepthMapResult] = useState<DepthMapResult | null>(null);
  const [metrics, setMetrics] = useState<RenderMetrics | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Modals & User Assets
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [customFonts, setCustomFonts] = useState<FontItem[]>([]);
  const [customPatternData, setCustomPatternData] = useState<{
    buffer: Uint8ClampedArray;
    width: number;
    height: number;
  } | undefined>(undefined);

  // Renderer Instance ref
  const rendererRef = useRef<StereogramRenderer | null>(null);
  const renderTimeoutRef = useRef<number | null>(null);

  // Initialize renderer
  useEffect(() => {
    rendererRef.current = new StereogramRenderer();
    return () => {
      rendererRef.current?.terminate();
    };
  }, []);

  // Main Render trigger with debounce
  const triggerRender = useCallback(
    (cfg: StereogramConfig, patData?: typeof customPatternData) => {
      if (renderTimeoutRef.current) {
        window.clearTimeout(renderTimeoutRef.current);
      }

      setIsRendering(true);

      renderTimeoutRef.current = window.setTimeout(async () => {
        if (!rendererRef.current) return;

        try {
          const res = await rendererRef.current.render(
            cfg,
            cfg.width || 1200,
            cfg.height || 800,
            patData
          );

          setStereogramData(res.stereogramData);
          setDepthMapResult(res.depthMapResult);
          setMetrics(res.metrics);
        } catch (err) {
          console.error('Render error:', err);
        } finally {
          setIsRendering(false);
        }
      }, 60); // 60ms debounce
    },
    []
  );

  // Update config helper
  const handleConfigChange = (updates: Partial<StereogramConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };
      triggerRender(next, customPatternData);
      return next;
    });
  };

  // Preset Selection
  const handleSelectPreset = (preset: Preset) => {
    setConfig((prev) => {
      const next: StereogramConfig = {
        ...prev,
        ...preset.config
      };
      triggerRender(next, customPatternData);
      return next;
    });
  };

  // Randomize Seed
  const handleRandomizeSeed = () => {
    const newSeed = Math.floor(Math.random() * 900000) + 100000;
    handleConfigChange({ seed: newSeed });
  };

  // Add custom font
  const handleAddCustomFont = (font: FontItem) => {
    setCustomFonts((prev) => [font, ...prev]);
  };

  // Custom image tile upload
  const handleCustomTileUpload = (data: { buffer: Uint8ClampedArray; width: number; height: number }) => {
    setCustomPatternData(data);
    setConfig((prev) => {
      const next = { ...prev, patternType: 'custom-image' as const };
      triggerRender(next, data);
      return next;
    });
  };

  // Initial render on mount
  useEffect(() => {
    triggerRender(config, customPatternData);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-accent selection:text-black">
      {/* Top Telemetry Header */}
      <Header
        config={config}
        onSelectPreset={handleSelectPreset}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        metrics={metrics}
        isRendering={isRendering}
        onRandomizeSeed={handleRandomizeSeed}
      />

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Parameter & Control Studio (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col bg-cyber-900/90 border border-cyber-700/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          {/* Controls Tabs Navigation */}
          <div className="grid grid-cols-4 bg-cyber-850 border-b border-cyber-700/60 text-xs font-mono">
            <button
              onClick={() => setActiveTab('text')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                activeTab === 'text'
                  ? 'border-cyber-accent text-cyber-accent bg-cyber-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Text & Font</span>
              <span className="sm:hidden">Text</span>
            </button>

            <button
              onClick={() => setActiveTab('depth')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                activeTab === 'depth'
                  ? 'border-cyber-emerald text-cyber-emerald bg-cyber-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Depth</span>
              <span className="sm:hidden">Depth</span>
            </button>

            <button
              onClick={() => setActiveTab('pattern')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                activeTab === 'pattern'
                  ? 'border-cyber-accent text-cyber-accent bg-cyber-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pattern</span>
              <span className="sm:hidden">Texture</span>
            </button>

            <button
              onClick={() => setActiveTab('stereo')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
                activeTab === 'stereo'
                  ? 'border-cyber-rose text-cyber-rose bg-cyber-900 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stereo & Eyes</span>
              <span className="sm:hidden">Optics</span>
            </button>
          </div>

          {/* Active Control Panel Body */}
          <div className="p-4 lg:p-5 max-h-[calc(100vh-210px)] overflow-y-auto space-y-4 custom-scrollbar">
            {activeTab === 'text' && (
              <TextInputPanel
                config={config}
                onChange={handleConfigChange}
                customFonts={customFonts}
                onAddCustomFont={handleAddCustomFont}
              />
            )}

            {activeTab === 'depth' && (
              <DepthControls
                config={config}
                onChange={handleConfigChange}
              />
            )}

            {activeTab === 'pattern' && (
              <PatternControls
                config={config}
                onChange={handleConfigChange}
                onCustomImageUpload={handleCustomTileUpload}
              />
            )}

            {activeTab === 'stereo' && (
              <StereoControls
                config={config}
                onChange={handleConfigChange}
              />
            )}
          </div>

          {/* Quick Presets Footer */}
          <div className="px-4 py-3 bg-cyber-950/70 border-t border-cyber-700/50 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 text-[11px]">
              Preset: <strong className="text-cyber-accent">{PRESETS.find(p => p.config.patternType === config.patternType)?.name || 'Custom Setup'}</strong>
            </span>
            <button
              onClick={handleRandomizeSeed}
              className="text-slate-300 hover:text-cyber-accent flex items-center gap-1 text-[11px] transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-cyber-accent" />
              <span>Shuffle Noise</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Precision Optical Viewport (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col h-full space-y-4">
          <PreviewViewport
            stereogramData={stereogramData}
            depthMapResult={depthMapResult}
            config={config}
            isRendering={isRendering}
          />
        </div>
      </main>

      {/* Export Modal */}
      {rendererRef.current && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          config={config}
          renderer={rendererRef.current}
        />
      )}

      {/* Eye Training Guide Modal */}
      <EyeTrainingGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
};

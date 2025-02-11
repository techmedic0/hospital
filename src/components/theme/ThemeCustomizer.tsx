import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Check, Palette } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, customColors, setCustomColors } = useThemeStore();
  const [previewColors, setPreviewColors] = useState(customColors);

  const presetThemes = [
    { name: 'default', label: 'Default' },
    { name: 'calm', label: 'Calm' },
    { name: 'professional', label: 'Professional' },
  ];

  const handleApplyTheme = () => {
    setCustomColors(previewColors);
    // Apply colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary-teal', previewColors.primary.teal);
    root.style.setProperty('--color-primary-blue', previewColors.primary.blue);
    root.style.setProperty('--color-accent-cyan', previewColors.accent.cyan);
    root.style.setProperty('--color-accent-coral', previewColors.accent.coral);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 p-3 rounded-full bg-primary-teal text-white shadow-lg
                 hover:bg-glow-teal transition-all duration-300 hover:shadow-glow"
      >
        <Palette className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-[calc(100%-2rem)] md:w-80 max-w-[320px] bg-white dark:bg-background-dark shadow-xl z-50
                     overflow-y-auto m-4 rounded-xl"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Theme Customizer</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-background-mint dark:hover:bg-primary-teal/20 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Preset Themes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {presetThemes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setTheme(theme.name)}
                        className={`p-2 rounded-lg border transition-all duration-300 ${
                          currentTheme === theme.name
                            ? 'border-primary-teal bg-background-mint'
                            : 'border-gray-200 hover:border-primary-teal'
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Custom Colors</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Primary Teal</label>
                      <input
                        type="color"
                        value={previewColors.primary.teal}
                        onChange={(e) =>
                          setPreviewColors({
                            ...previewColors,
                            primary: { ...previewColors.primary, teal: e.target.value },
                          })
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Primary Blue</label>
                      <input
                        type="color"
                        value={previewColors.primary.blue}
                        onChange={(e) =>
                          setPreviewColors({
                            ...previewColors,
                            primary: { ...previewColors.primary, blue: e.target.value },
                          })
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Accent Cyan</label>
                      <input
                        type="color"
                        value={previewColors.accent.cyan}
                        onChange={(e) =>
                          setPreviewColors({
                            ...previewColors,
                            accent: { ...previewColors.accent, cyan: e.target.value },
                          })
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Accent Coral</label>
                      <input
                        type="color"
                        value={previewColors.accent.coral}
                        onChange={(e) =>
                          setPreviewColors({
                            ...previewColors,
                            accent: { ...previewColors.accent, coral: e.target.value },
                          })
                        }
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleApplyTheme}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Apply Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeCustomizer;
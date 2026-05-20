import type { AiReadingSettings } from './AiReadingTypes';

const STORAGE_KEY = 'tarot-oracles-ai-settings';

export const DEFAULT_AI_READING_SETTINGS: AiReadingSettings = {
  enableAIReading: false,
  providerBaseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o-mini',
};

export function loadAiReadingSettings(): AiReadingSettings {
  if (typeof window === 'undefined') return DEFAULT_AI_READING_SETTINGS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_AI_READING_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<AiReadingSettings>;
    return {
      enableAIReading: parsed.enableAIReading ?? DEFAULT_AI_READING_SETTINGS.enableAIReading,
      providerBaseUrl: parsed.providerBaseUrl || DEFAULT_AI_READING_SETTINGS.providerBaseUrl,
      apiKey: parsed.apiKey || '',
      model: parsed.model || DEFAULT_AI_READING_SETTINGS.model,
    };
  } catch {
    return DEFAULT_AI_READING_SETTINGS;
  }
}

export function saveAiReadingSettings(settings: AiReadingSettings): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function clearAiReadingKey(settings: AiReadingSettings): AiReadingSettings {
  const nextSettings = { ...settings, apiKey: '' };
  saveAiReadingSettings(nextSettings);
  return nextSettings;
}
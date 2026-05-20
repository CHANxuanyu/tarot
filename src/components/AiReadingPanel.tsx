import { useEffect, useState } from 'react';
import { generateAiReading } from '../core/AiReadingClient';
import { clearAiReadingKey, loadAiReadingSettings, saveAiReadingSettings } from '../core/AiReadingStorage';
import { AiReadingError, type AiReadingContext, type AiReadingSettings } from '../core/AiReadingTypes';
import { useI18n } from '../i18n/I18nContext';

type Props = {
  context: AiReadingContext;
};

export function AiReadingPanel({ context }: Props) {
  const { t } = useI18n();
  const [settings, setSettings] = useState<AiReadingSettings>(() => loadAiReadingSettings());
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    saveAiReadingSettings(settings);
  }, [settings]);

  const updateSetting = <K extends keyof AiReadingSettings>(key: K, value: AiReadingSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleClearKey = () => {
    setSettings(prev => clearAiReadingKey(prev));
    setError('');
  };

  const handleGenerate = async () => {
    setError('');
    setLoading(true);

    try {
      const text = await generateAiReading({ settings, context });
      setResult(text);
    } catch (err) {
      setError(err instanceof AiReadingError ? t(`ai.error.${err.code}`) : t('ai.errorRequestFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-reading-panel">
      <div className="ai-reading-header">
        <div>
          <h2 className="ai-reading-title">{t('ai.title')}</h2>
          <p className="ai-reading-description">{t('ai.description')}</p>
        </div>
        <label className="ai-toggle">
          <input
            type="checkbox"
            checked={settings.enableAIReading}
            onChange={event => updateSetting('enableAIReading', event.target.checked)}
          />
          <span>{t('ai.enable')}</span>
        </label>
      </div>

      <div className="ai-security-note">
        {t('ai.securityNotice')}
      </div>

      {settings.enableAIReading && (
        <>
          <div className="ai-settings-grid">
            <label className="ai-field">
              <span>{t('ai.providerBaseUrl')}</span>
              <input
                value={settings.providerBaseUrl}
                onChange={event => updateSetting('providerBaseUrl', event.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </label>
            <label className="ai-field">
              <span>{t('ai.model')}</span>
              <input
                value={settings.model}
                onChange={event => updateSetting('model', event.target.value)}
                placeholder="gpt-4o-mini"
              />
            </label>
            <label className="ai-field ai-key-field">
              <span>{t('ai.apiKey')}</span>
              <input
                type="password"
                value={settings.apiKey}
                onChange={event => updateSetting('apiKey', event.target.value)}
                placeholder={t('ai.apiKeyPlaceholder')}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="ai-reading-actions">
            <button className="ai-action-btn primary" onClick={handleGenerate} disabled={loading}>
              {loading ? t('ai.generating') : t('ai.generate')}
            </button>
            <button className="ai-action-btn" onClick={handleClearKey} type="button">
              {t('ai.clearKey')}
            </button>
          </div>

          {error && <div className="ai-error">{error}</div>}

          {result && (
            <div className="ai-reading-result">
              <h3>{t('ai.resultTitle')}</h3>
              <div className="ai-reading-text">
                {result.split('\n').map((line, index) => (
                  <p key={index}>{line || '\u00a0'}</p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
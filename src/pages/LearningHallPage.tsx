import { useState, useEffect } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { useI18n } from '../i18n/I18nContext';
import { buildSingleCardReport } from '../core/TarotReadingEngine';

interface Interpretation {
  upright: { past: string[]; present: string[]; future: string[] };
  reversed: { past: string[]; present: string[]; future: string[] };
}

interface InterpData {
  interpretations: Record<string, Interpretation>;
}

export function LearningHallPage() {
  const { state } = useDivinationContext();
  const { locale, t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [interps, setInterps] = useState<InterpData | null>(null);

  useEffect(() => {
    fetch(`/themes/${state.themeId}/interpretations-zh.json`)
      .then(r => r.json())
      .then(setInterps)
      .catch(() => {});
  }, [state.themeId]);

  if (!state.cards) {
    return (
      <div className="page">
        <div className="loading">
          <div className="loading-symbol">✦</div>
          <div className="loading-text">{t('learn.loading')}</div>
        </div>
      </div>
    );
  }

  const allCards = state.cards.cards;
  const majorCards = allCards.filter(c => c.id <= 21);
  const displayList = majorCards
    .filter(c =>
      !search ||
      c.nameZh.includes(search) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
    );

  const selected = allCards.find(c => c.id === selectedId) || allCards[0];
  const imgPath = getThemeAssetPath(state.themeId, selected.image);
  const interp = interps?.interpretations[String(selected.id)];
  const uprightReport = buildSingleCardReport({
    drawn: { card: selected, reversed: false, position: '' },
    locale,
  });
  const reversedReport = buildSingleCardReport({
    drawn: { card: selected, reversed: true, position: '' },
    locale,
  });
  const uprightText = locale === 'zh-CN' ? (interp?.upright.present[0] || uprightReport.sections.essence) : uprightReport.sections.essence;
  const reversedText = locale === 'zh-CN' ? (interp?.reversed.present[0] || reversedReport.sections.essence) : reversedReport.sections.essence;

  const getCardName = (card: typeof allCards[number]) => (
    card.shortName?.[locale] ?? (locale === 'zh-CN' ? card.nameZh : card.name)
  );

  return (
    <div className="page">
      <div className="learn-layout">
        <div className="learn-sidebar">
          <div className="side-panel-title">{t('learn.title')}</div>

          <input
            className="learn-search"
            placeholder={t('learn.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="card-grid">
            {displayList.map(card => (
              <div
                key={card.id}
                className={`card-thumb${card.id === selectedId ? ' selected' : ''}`}
                onClick={() => setSelectedId(card.id)}
              >
                <img
                  className="card-thumb-img"
                  src={getThemeAssetPath(state.themeId, card.image)}
                  alt={getCardName(card)}
                  loading="lazy"
                  title={getCardName(card)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="learn-main">
          {selected && (
            <div className="card-detail-panel">
              <div className="card-detail-header">
                <img className="card-detail-img" src={imgPath} alt={getCardName(selected)} />
                <div className="card-detail-title">
                  <div className="card-detail-name-zh">{getCardName(selected)}</div>
                  <div className="card-detail-name-en">{selected.name.toUpperCase()}</div>
                  <div className="card-detail-keywords">
                    {uprightReport.keywords.map((kw, i) => (
                      <span key={i} className="card-keyword">{kw}</span>
                    ))}
                  </div>
                  <div className="card-detail-keywords" style={{ marginTop: '0.3rem' }}>
                    {reversedReport.keywords.map((kw, i) => (
                      <span key={i} className="card-keyword" style={{ opacity: 0.7, fontStyle: 'italic' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              </div>

              {uprightText && (
                <div className="card-meaning-section">
                  <div className="card-meaning-heading">{t('learn.uprightMeaning')}</div>
                  <div className="card-meaning-text">{uprightText}</div>
                </div>
              )}

              {reversedText && (
                <div className="card-meaning-section">
                  <div className="card-meaning-heading">{t('learn.reversedMeaning')}</div>
                  <div className="card-meaning-text">{reversedText}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

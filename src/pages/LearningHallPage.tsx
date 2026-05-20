import { useState, useEffect } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';

interface Interpretation {
  upright: { past: string[]; present: string[]; future: string[] };
  reversed: { past: string[]; present: string[]; future: string[] };
}

interface InterpData {
  interpretations: Record<string, Interpretation>;
}

export function LearningHallPage() {
  const { state } = useDivinationContext();
  const [filter, setFilter] = useState<'major' | 'minor'>('major');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [interps, setInterps] = useState<InterpData | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem('tarot-favorites') || '[]')
  );

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
          <div className="loading-text">加载牌义中…</div>
        </div>
      </div>
    );
  }

  const allCards = state.cards.cards;
  const majorCards = allCards.filter(c => c.id <= 21);
  const minorCards = allCards.filter(c => c.id > 21);
  const displayList = (filter === 'major' ? majorCards : minorCards)
    .filter(c =>
      !search ||
      c.nameZh.includes(search) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords.some(k => k.includes(search))
    );

  const selected = allCards.find(c => c.id === selectedId) || allCards[0];
  const imgPath = getThemeAssetPath(state.themeId, selected.image);
  const interp = interps?.interpretations[String(selected.id)];
  const uprightText = interp?.upright.present[0] || '';
  const reversedText = interp?.reversed.present[0] || '';

  const toggleFav = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('tarot-favorites', JSON.stringify(updated));
  };

  return (
    <div className="page">
      <div className="learn-layout">
        {/* Left sidebar: search + card grid */}
        <div className="learn-sidebar">
          <div className="side-panel-title">学习殿堂 · LEARNING HALL</div>

          <input
            className="learn-search"
            placeholder="搜索牌名或关键词…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="filter-tabs">
            <button
              className={`filter-tab${filter === 'major' ? ' active' : ''}`}
              onClick={() => setFilter('major')}
            >
              大阿卡那
            </button>
            <button
              className={`filter-tab${filter === 'minor' ? ' active' : ''}`}
              onClick={() => setFilter('minor')}
            >
              小阿卡那
            </button>
          </div>

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
                  alt={card.nameZh}
                  loading="lazy"
                />
                <div className="card-thumb-name">{card.nameZh}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: card detail */}
        <div className="learn-main">
          {selected && (
            <div className="card-detail-panel">
              <div className="card-detail-header">
                <img className="card-detail-img" src={imgPath} alt={selected.nameZh} />
                <div className="card-detail-title">
                  <div className="card-detail-name-zh">{selected.nameZh}</div>
                  <div className="card-detail-name-en">{selected.name.toUpperCase()}</div>
                  <div className="card-detail-keywords">
                    {selected.keywords.map((kw, i) => (
                      <span key={i} className="card-keyword">{kw}</span>
                    ))}
                  </div>
                  <div className="card-detail-keywords" style={{ marginTop: '0.3rem' }}>
                    {selected.keywordsReversed.map((kw, i) => (
                      <span key={i} className="card-keyword" style={{ opacity: 0.7, fontStyle: 'italic' }}>{kw}</span>
                    ))}
                  </div>
                </div>
              </div>

              {uprightText && (
                <div className="card-meaning-section">
                  <div className="card-meaning-heading">正位含义</div>
                  <div className="card-meaning-text">{uprightText}</div>
                </div>
              )}

              {reversedText && (
                <div className="card-meaning-section">
                  <div className="card-meaning-heading">逆位含义</div>
                  <div className="card-meaning-text">{reversedText}</div>
                </div>
              )}

              <button
                className={`card-fav-btn${favorites.includes(selected.id) ? ' active' : ''}`}
                onClick={() => toggleFav(selected.id)}
              >
                {favorites.includes(selected.id) ? '♥ 已收藏' : '♡ 加入收藏'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

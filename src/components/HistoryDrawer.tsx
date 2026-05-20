import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { getHistory, clearHistory, type ReadingRecord } from '../core/HistoryManager';
import { useI18n } from '../i18n/I18nContext';

export function HistoryDrawer() {
  const { state } = useDivinationContext();
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<ReadingRecord[]>([]);

  const handleOpen = () => {
    setRecords(getHistory());
    setOpen(true);
  };

  const handleClear = () => {
    clearHistory();
    setRecords([]);
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <button className="history-toggle" onClick={handleOpen} title={t('history.title')}>
        ☰
      </button>

      {open && (
        <div className="history-overlay" onClick={() => setOpen(false)}>
          <div className="history-drawer" onClick={e => e.stopPropagation()}>
            <div className="history-header">
              <h3>{t('history.title')}</h3>
              <button className="nav-btn" onClick={() => setOpen(false)}>✕</button>
            </div>

            {records.length === 0 ? (
              <p className="history-empty">{t('history.empty')}</p>
            ) : (
              <>
                <div className="history-list">
                  {records.map(r => (
                    <div key={r.id} className="history-item">
                      <span className="history-date">{formatDate(r.timestamp)}</span>
                      <div className="history-cards-summary">
                        {r.cards.map((c, i) => (
                          <span key={i} className="history-card-tag">
                            {locale === 'zh-CN' ? c.cardNameZh : c.cardName}
                            {c.reversed ? ' ↺' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="action-btn history-clear" onClick={handleClear}>
                  {t('history.clear')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { getHistory, clearHistory, type ReadingRecord } from '../core/HistoryManager';

export function HistoryDrawer() {
  const { state } = useDivinationContext();
  const copy = state.copy?.lang[state.lang];
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
    return d.toLocaleDateString(state.lang === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <button className="history-toggle" onClick={handleOpen} title={copy?.history}>
        ☰
      </button>

      {open && (
        <div className="history-overlay" onClick={() => setOpen(false)}>
          <div className="history-drawer" onClick={e => e.stopPropagation()}>
            <div className="history-header">
              <h3>{copy?.history || 'History'}</h3>
              <button className="nav-btn" onClick={() => setOpen(false)}>✕</button>
            </div>

            {records.length === 0 ? (
              <p className="history-empty">{copy?.noHistory || 'No readings yet'}</p>
            ) : (
              <>
                <div className="history-list">
                  {records.map(r => (
                    <div key={r.id} className="history-item">
                      <span className="history-date">{formatDate(r.timestamp)}</span>
                      <div className="history-cards-summary">
                        {r.cards.map((c, i) => (
                          <span key={i} className="history-card-tag">
                            {state.lang === 'zh' ? c.cardNameZh : c.cardName}
                            {c.reversed ? ' ↺' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="action-btn history-clear" onClick={handleClear}>
                  {state.lang === 'zh' ? '清除记录' : 'Clear All'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

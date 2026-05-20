import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';
import { buildCelticCrossReport } from '../core/TarotReadingEngine';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

export function ResultCelticCross({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  const [expandedCards, setExpandedCards] = useState<boolean>(false);

  if (state.drawnCards.length < 10) return null;

  const report = buildCelticCrossReport({
    drawnCards: state.drawnCards,
    question: state.question,
  });

  const isZh = state.lang === 'zh';
  const questionText = state.question || (isZh ? '无特定问题，本次解读将以通用能量为主。' : 'No specific question, reading will focus on general energy.');

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const getImg = (idx: number) => getThemeAssetPath(state.themeId, state.drawnCards[idx].card.image);

  function CcCard({ idx, className }: { idx: number; className: string }) {
    const drawn = state.drawnCards[idx];
    const rCard = report.cards[idx];
    return (
      <div className={className}>
        <div className={`celtic-map-card-wrap${drawn.reversed ? ' reversed' : ''}`}>
          <img src={getImg(idx)} alt={rCard.cardNameZh} />
          <div className="celtic-map-pos-label">{rCard.positionName}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="celtic-report-layout">
      <div className="celtic-header-section">
        <h1 className="celtic-main-title">{isZh ? '你的凯尔特十字深度解读报告' : 'Your Celtic Cross Depth Reading'}</h1>
        <div className="celtic-question-box">
          <div className="celtic-question-label">{isZh ? '你的问题' : 'YOUR QUERY'}</div>
          <div className="celtic-question-text">{questionText}</div>
        </div>
        <p className="celtic-overview-text">{report.overview}</p>
      </div>

      <div className="celtic-map-section">
        <div className="celtic-grid-desktop">
          <CcCard idx={4} className="cc-crown" />
          <CcCard idx={3} className="cc-past" />
          <div className="cc-center">
            <div className={`celtic-map-card-wrap${state.drawnCards[0].reversed ? ' reversed' : ''}`}>
              <img src={getImg(0)} alt={report.cards[0].cardNameZh} />
              <div className="celtic-map-pos-label">{report.cards[0].positionName}</div>
            </div>
            <div className="cc-challenge">
              <div className={`celtic-map-card-wrap crossed${state.drawnCards[1].reversed ? ' reversed' : ''}`}>
                <img src={getImg(1)} alt={report.cards[1].cardNameZh} />
              </div>
            </div>
          </div>
          <CcCard idx={5} className="cc-future" />
          <CcCard idx={2} className="cc-foundation" />
          <div className="cc-spacer" />
          <CcCard idx={9} className="cc-outcome" />
          <CcCard idx={8} className="cc-hopes" />
          <CcCard idx={7} className="cc-environ" />
          <CcCard idx={6} className="cc-self" />
        </div>

        <div className="celtic-map-mobile">
          {report.cards.map((rc, idx) => (
             <div key={idx} className="celtic-mobile-card-row">
                <div className="celtic-mobile-card-img">
                   <img src={getImg(idx)} alt={rc.cardNameZh} className={state.drawnCards[idx].reversed ? 'reversed' : ''} />
                </div>
                <div className="celtic-mobile-card-info">
                   <div className="celtic-mobile-pos">{rc.positionName}</div>
                   <div className="celtic-mobile-name">
                     {rc.cardNameZh} {rc.orientation === 'reversed' ? (isZh ? '(逆位)' : '(Rev.)') : ''}
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>

      <div className="celtic-sections-grid">
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '核心矛盾' : 'Core Conflict'}</h3>
          <p className="celtic-section-content">{report.sections.coreConflict}</p>
        </div>
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '深层原因' : 'Deep Cause'}</h3>
          <p className="celtic-section-content">{report.sections.deepCause}</p>
        </div>
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '意识与目标' : 'Conscious Direction'}</h3>
          <p className="celtic-section-content">{report.sections.consciousDirection}</p>
        </div>
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '自我与环境' : 'Self & Environment'}</h3>
          <p className="celtic-section-content">{report.sections.selfAndEnvironment}</p>
        </div>
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '情绪张力' : 'Emotional Tension'}</h3>
          <p className="celtic-section-content">{report.sections.emotionalTension}</p>
        </div>
        <div className="celtic-section-card">
          <h3 className="celtic-section-title">{isZh ? '未来趋势' : 'Future Trend'}</h3>
          <p className="celtic-section-content">{report.sections.futureTrend}</p>
        </div>
      </div>

      <div className="celtic-final-advice">
         <h3 className="celtic-section-title">{isZh ? '最终建议' : 'Final Advice'}</h3>
         <p className="celtic-section-content">{report.sections.finalAdvice}</p>
      </div>

      <div className="celtic-report-quote">
        <div className="celtic-quote-icon">“</div>
        <div className="celtic-quote-text">{report.sections.quote}</div>
      </div>

      <div className="celtic-details-toggle">
         <button className="celtic-toggle-btn" onClick={() => setExpandedCards(!expandedCards)}>
            {expandedCards 
              ? (isZh ? '收起单牌细读' : 'Hide Card Details') 
              : (isZh ? '展开十张牌细读' : 'View All 10 Card Details')}
         </button>
      </div>
      
      {expandedCards && (
        <div className="celtic-details-grid">
          {report.cards.map((c, idx) => (
            <div key={idx} className="celtic-detail-item">
               <div className="celtic-detail-header">
                  <span className="celtic-detail-pos">{c.positionName}</span>
                  <span className="celtic-detail-name">
                    {c.cardNameZh} {c.orientation === 'reversed' ? (isZh ? '(逆位)' : '(Rev.)') : ''}
                  </span>
               </div>
               <div className="celtic-detail-text">{c.positionReading}</div>
            </div>
          ))}
        </div>
      )}

      <div className="celtic-report-actions">
        <button className="cc-action-btn" onClick={handleReshuffle}>
          {isZh ? '重新抽牌' : 'Reshuffle'}
        </button>
        <button className="cc-action-btn primary" onClick={onCopy}>
          {isZh ? '复制全文' : 'Copy Full Report'}
        </button>
        <button className="cc-action-btn" onClick={onSave}>
          {isZh ? '保存解读' : 'Save Reading'}
        </button>
      </div>
    </div>
  );
}

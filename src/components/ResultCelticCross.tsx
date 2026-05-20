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
  if (state.drawnCards.length < 10) return null;

  const report = buildCelticCrossReport({
    drawnCards: state.drawnCards,
    question: state.question,
  });

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const getImg = (idx: number) => getThemeAssetPath(state.themeId, state.drawnCards[idx].card.image);

  function CcCard({ idx, className, small = false }: { idx: number; className: string; small?: boolean }) {
    const drawn = state.drawnCards[idx];
    return (
      <div className={className}>
        <div className={`cc-card-wrap${small ? ' small' : ''}${drawn.reversed ? ' reversed' : ''}`}>
          <img src={getImg(idx)} alt={drawn.card.nameZh} />
          <div className="cc-pos-label">{report.cards[idx].positionName}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="celtic-result" style={{ paddingTop: '2rem' }}>
      <div>
        <div className="gold-heading">{state.lang === 'zh' ? '凯尔特十字解读' : 'CELTIC CROSS READING'}</div>
        <div className="gold-heading-en">TEN POSITIONS · COMPLETE GUIDANCE</div>
      </div>

      <div className="celtic-body">
        {/* The Cross + Staff grid */}
        <div className="celtic-grid-wrap">
          <div className="celtic-grid">
            <CcCard idx={4} className="cc-crown" />
            <CcCard idx={3} className="cc-past" />
            {/* Center: position 0 (present) + position 1 (challenge rotated) */}
            <div className="cc-center">
              <div className="cc-card-wrap" style={{ width: '100px', height: '160px' }}>
                <img src={getImg(0)} alt={state.drawnCards[0].card.nameZh} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="cc-pos-label">{report.cards[0].positionName}</div>
              </div>
              <div className="cc-challenge">
                <div className="cc-card-wrap small" style={{ position: 'relative', top: 'unset', left: 'unset', transform: 'none' }}>
                  <img src={getImg(1)} alt={state.drawnCards[1].card.nameZh} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
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
        </div>

        {/* Position interpretations */}
        <div className="celtic-interpretations">
          <div className="celtic-interp-item">
            <div className="celtic-interp-header">
              <div className="celtic-interp-pos">{state.lang === 'zh' ? '总览' : 'Overview'}</div>
            </div>
            <div className="celtic-interp-text">{report.overview}</div>
          </div>

          {report.cards.map((card, idx) => (
            <div key={idx} className="celtic-interp-item">
              <div className="celtic-interp-header">
                <div className="celtic-interp-num">{idx + 1}</div>
                <div className="celtic-interp-pos">{card.positionName}</div>
                <div className="celtic-interp-card">
                  {card.cardNameZh}
                  {card.orientation === 'reversed'
                    ? (state.lang === 'zh' ? ' 逆' : ' Rev.')
                    : (state.lang === 'zh' ? ' 正' : '')}
                </div>
              </div>
              <div className="celtic-interp-text">{card.positionReading}</div>
            </div>
          ))}

          <div className="celtic-interp-item">
            <div className="celtic-interp-header">
              <div className="celtic-interp-pos">{state.lang === 'zh' ? '分区报告' : 'Section Report'}</div>
            </div>
            <div className="celtic-interp-text">
              {report.sections.coreConflict}
              {'\n\n'}{report.sections.deepCause}
              {'\n\n'}{report.sections.consciousDirection}
              {'\n\n'}{report.sections.selfAndEnvironment}
              {'\n\n'}{report.sections.emotionalTension}
              {'\n\n'}{report.sections.futureTrend}
              {'\n\n'}{report.sections.finalAdvice}
            </div>
          </div>
        </div>
      </div>

      <div className="result-actions">
        <button className="jewel-btn" onClick={handleReshuffle}>
          <span className="jewel-btn-icon">⟳</span>
          {state.lang === 'zh' ? '重新洗牌' : 'Reshuffle'}
        </button>
        <button className="jewel-btn" onClick={onCopy}>
          <span className="jewel-btn-icon">⧉</span>
          {state.lang === 'zh' ? '复制结果' : 'Copy Result'}
        </button>
        <button className="jewel-btn" onClick={onSave}>
          <span className="jewel-btn-icon">✦</span>
          {state.lang === 'zh' ? '保存到日记' : 'Save to Diary'}
        </button>
      </div>
    </div>
  );
}

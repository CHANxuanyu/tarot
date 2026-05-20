import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { getThemeAssetPath } from '../core/ThemeLoader';

interface Props {
  onCopy: () => void;
  onSave: () => void;
}

// Celtic Cross position interpretations (0-indexed)
const CC_MEANINGS_ZH = [
  '当下核心处境，牌面指示此刻内心或外在的主要状态。',
  '阻碍或助力，横卧之牌揭示与现状交织的挑战或资源。',
  '根基与根源，此牌指向问题最深层的无意识基础。',
  '顶部能量，潜在的可能性或你正在趋向的目标。',
  '近期过去，已过去的事件或阶段仍对现在产生影响。',
  '即将到来的能量，短期内将浮现的趋势或事件。',
  '自我与立场，你如何看待这个处境，内在的态度与信念。',
  '外部环境，周围的人与环境对你的影响与期望。',
  '希望与恐惧，内心深处的渴望或最担忧的可能性。',
  '最终结局，所有能量聚合后的最可能走向。',
];

const CC_MEANINGS_EN = [
  'The Present: the core of the current situation.',
  'The Challenge: what crosses and complicates the present.',
  'Foundation: the deep root or unconscious basis.',
  'Crown: potential possibilities and what you aspire to.',
  'Recent Past: events that have passed but still influence now.',
  'Near Future: energies about to emerge in the short term.',
  'Self: your inner attitude and beliefs about the situation.',
  'Environment: the influence of those and world around you.',
  'Hopes & Fears: your deepest desire or greatest concern.',
  'Outcome: the most likely final resolution of all energies.',
];

export function ResultCelticCross({ onCopy, onSave }: Props) {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();
  if (state.drawnCards.length < 10) return null;

  const handleReshuffle = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const getImg = (idx: number) => getThemeAssetPath(state.themeId, state.drawnCards[idx].card.image);
  const meanings = state.lang === 'zh' ? CC_MEANINGS_ZH : CC_MEANINGS_EN;

  function CcCard({ idx, className, small = false }: { idx: number; className: string; small?: boolean }) {
    const drawn = state.drawnCards[idx];
    return (
      <div className={className}>
        <div className={`cc-card-wrap${small ? ' small' : ''}${drawn.reversed ? ' reversed' : ''}`}>
          <img src={getImg(idx)} alt={drawn.card.nameZh} />
          <div className="cc-pos-label">{drawn.position}</div>
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
                <div className="cc-pos-label">{state.drawnCards[0].position}</div>
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
          {state.drawnCards.map((drawn, idx) => (
            <div key={idx} className="celtic-interp-item">
              <div className="celtic-interp-header">
                <div className="celtic-interp-num">{idx + 1}</div>
                <div className="celtic-interp-pos">{drawn.position}</div>
                <div className="celtic-interp-card">
                  {drawn.card.nameZh}
                  {drawn.reversed
                    ? (state.lang === 'zh' ? ' 逆' : ' Rev.')
                    : (state.lang === 'zh' ? ' 正' : '')}
                </div>
              </div>
              <div className="celtic-interp-text">{meanings[idx]}</div>
            </div>
          ))}
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

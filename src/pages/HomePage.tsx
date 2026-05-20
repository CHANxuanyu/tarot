import { useNavigate } from 'react-router-dom';
import { useDivinationContext } from '../store/DivinationContext';
import { MoonPhasePanel } from '../components/MoonPhasePanel';
import { TodayGuidance } from '../components/TodayGuidance';
import type { SpreadId } from '../core/types';

const SPREAD_OPTIONS: Array<{
  id: SpreadId;
  icon: string;
  nameZh: string;
  desc: string;
}> = [
  { id: 'single-card', icon: '✦', nameZh: '单牌占卜', desc: 'Single Card · 一问一答' },
  { id: 'three-card',  icon: '⟁', nameZh: '三牌阵',   desc: 'Three Card · 过去现在未来' },
  { id: 'celtic-cross',icon: '✙', nameZh: '凯尔特十字', desc: 'Celtic Cross · 十位解析' },
];

export function HomePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useDivinationContext();

  const handleSelectSpread = (spreadId: SpreadId) => {
    dispatch({ type: 'SET_SPREAD', payload: spreadId });
    dispatch({ type: 'RESET' });
    navigate('/reading');
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_QUESTION', payload: e.target.value });
  };

  if (state.stage === 'loading') {
    return (
      <div className="loading">
        <div className="loading-symbol">✦</div>
        <div className="loading-text">正在加载神秘能量…</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="home-layout">
        {/* Left panel: moon phases + zodiac */}
        <aside className="side-panel">
          <MoonPhasePanel />
        </aside>

        {/* Center: main content */}
        <main className="home-main">
          <div className="home-title-zh">塔 罗 启 示</div>
          <div className="home-title-en">T H E &nbsp; O R A C L E S</div>

          <div className="home-arch-container">
            <img
              src="/assets/images/hero-arch.png"
              alt="神秘玫瑰窗"
              className="home-arch-img"
            />
          </div>

          <div className="section-divider">
            <span>选择牌阵</span>
          </div>

          <div className="spread-options">
            {SPREAD_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className="spread-btn"
                onClick={() => handleSelectSpread(opt.id)}
              >
                <div className="spread-btn-icon">{opt.icon}</div>
                <div className="spread-btn-text">
                  <span className="spread-btn-name-zh">{opt.nameZh}</span>
                  <span className="spread-btn-desc">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="home-question-wrapper">
            <div className="home-question-label">请在心中默想你的问题</div>
            <input
              className="home-question-input"
              placeholder="在此输入问题（可选）"
              value={state.question}
              onChange={handleQuestionChange}
              maxLength={60}
            />
          </div>
        </main>

        {/* Right panel: today's guidance */}
        <aside className="side-panel right">
          <TodayGuidance />
        </aside>
      </div>
    </div>
  );
}

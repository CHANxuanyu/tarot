import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { ResultSingleCard } from './ResultSingleCard';
import { ResultThreeCard } from './ResultThreeCard';
import { ResultCelticCross } from './ResultCelticCross';
import { buildCelticCrossReport, buildSingleCardReport, buildThreeCardReport } from '../core/TarotReadingEngine';
import { saveReading } from '../core/HistoryManager';

export function ResultStage() {
  const { state } = useDivinationContext();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const buildResultText = () => {
    const singleDrawn = state.drawnCards[0];

    if (state.spreadId === 'single-card' && singleDrawn) {
      const report = buildSingleCardReport({
        drawn: singleDrawn,
        question: state.question,
      });
      const orientationLabel = report.orientation === 'upright' ? '正位' : '逆位';
      const questionText = state.question || '无特定问题，本次解读将以通用能量为主。';

      return [
        `塔罗单牌解读报告 — ${new Date().toLocaleDateString('zh-CN')}`,
        `问题：${questionText}`,
        `牌面：${report.card.nameZh} / ${report.card.nameEn}（${orientationLabel}）`,
        `原型：${report.identity.archetype}`,
        `元素：${report.identity.element}`,
        `星象：${report.identity.astrology}`,
        report.identity.mythicAssociation.length ? `神话关联：${report.identity.mythicAssociation.join(' · ')}` : '',
        `牌面象征：${report.symbols.join(' · ')}`,
        `关键词：${report.keywords.join(' · ')}`,
        '',
        '【牌意精解】',
        report.sections.essence,
        '',
        '【对你问题的回应】',
        report.sections.questionResponse,
        '',
        '【隐藏提醒】',
        report.sections.hiddenReminder,
        '',
        '【行动建议】',
        report.sections.actionAdvice,
        '',
        '【一句启示】',
        report.sections.quote,
      ].filter(Boolean).join('\n');
    }

    if (state.spreadId === 'three-card' && state.drawnCards.length >= 3) {
      const report = buildThreeCardReport({
        drawnCards: state.drawnCards,
        question: state.question,
      });
      const questionText = state.question || '无特定问题，本次解读将以通用能量为主。';

      return [
        `塔罗三牌阵解读报告 — ${new Date().toLocaleDateString('zh-CN')}`,
        `问题：${questionText}`,
        '',
        ...report.cards.flatMap(card => [
          `【${card.positionName}】${card.cardNameZh} / ${card.cardNameEn}（${card.orientation === 'upright' ? '正位' : '逆位'}）`,
          `关键词：${card.keywords.join(' · ')}`,
          card.roleReading,
          '',
        ]),
        '【综合牌路】',
        report.storyline,
        '',
        '【隐藏提醒】',
        report.hiddenReminder,
        '',
        '【行动建议】',
        report.actionAdvice,
        '',
        '【一句启示】',
        report.quote,
      ].filter(Boolean).join('\n');
    }

    if (state.spreadId === 'celtic-cross' && state.drawnCards.length >= 10) {
      const report = buildCelticCrossReport({
        drawnCards: state.drawnCards,
        question: state.question,
      });
      const questionText = state.question || '无特定问题，本次解读将以通用能量为主。';

      return [
        `凯尔特十字深度解读报告 — ${new Date().toLocaleDateString('zh-CN')}`,
        `问题：${questionText}`,
        '',
        '【总览】',
        report.overview,
        '',
        ...report.cards.flatMap(card => [
          `【${card.positionName}】${card.cardNameZh} / ${card.cardNameEn}（${card.orientation === 'upright' ? '正位' : '逆位'}）`,
          `关键词：${card.keywords.join(' · ')}`,
          card.positionReading,
          '',
        ]),
        '【核心冲突】',
        report.sections.coreConflict,
        '',
        '【深层原因】',
        report.sections.deepCause,
        '',
        '【意识方向】',
        report.sections.consciousDirection,
        '',
        '【自我与环境】',
        report.sections.selfAndEnvironment,
        '',
        '【情绪张力】',
        report.sections.emotionalTension,
        '',
        '【未来趋势】',
        report.sections.futureTrend,
        '',
        '【最终建议】',
        report.sections.finalAdvice,
        '',
        '【一句启示】',
        report.sections.quote,
      ].filter(Boolean).join('\n');
    }

    const lines: string[] = [
      `塔罗占卜结果 — ${new Date().toLocaleDateString('zh-CN')}`,
    ];
    if (state.question) lines.push(`问题：${state.question}`);
    lines.push('');
    state.drawnCards.forEach(d => {
      lines.push(`【${d.position}】${d.card.nameZh} ${d.reversed ? '（逆位）' : '（正位）'}`);
    });
    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildResultText());
    } catch {
      const ta = document.createElement('textarea');
      ta.value = buildResultText();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    saveReading(state.drawnCards);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const actionProps = { onCopy: handleCopy, onSave: handleSave };

  return (
    <div className="reading-page" style={{ alignItems: 'flex-start', padding: '1rem 0' }}>
      {(copied || saved) && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,22,14,0.96)', border: '1px solid var(--gold)',
          borderRadius: '4px', padding: '0.5rem 1.5rem',
          fontFamily: 'var(--font-zh)', fontSize: '0.85rem', color: 'var(--gold-bright)',
          zIndex: 999, pointerEvents: 'none',
        }}>
          {copied ? '✓ 已复制到剪贴板' : '✓ 已保存到日记'}
        </div>
      )}

      {state.spreadId === 'single-card'  && <ResultSingleCard  {...actionProps} />}
      {state.spreadId === 'three-card'   && <ResultThreeCard   {...actionProps} />}
      {state.spreadId === 'celtic-cross' && <ResultCelticCross {...actionProps} />}
    </div>
  );
}

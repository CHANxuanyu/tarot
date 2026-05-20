import { useState } from 'react';
import { useDivinationContext } from '../store/DivinationContext';
import { ResultSingleCard } from './ResultSingleCard';
import { ResultThreeCard } from './ResultThreeCard';
import { ResultCelticCross } from './ResultCelticCross';
import { AiReadingPanel } from './AiReadingPanel';
import { buildCelticCrossReport, buildSingleCardReport, buildThreeCardReport } from '../core/TarotReadingEngine';
import { saveReading } from '../core/HistoryManager';
import { useI18n } from '../i18n/I18nContext';

export function ResultStage() {
  const { state } = useDivinationContext();
  const { locale, t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const buildResultText = () => {
    const singleDrawn = state.drawnCards[0];

    if (state.spreadId === 'single-card' && singleDrawn) {
      const report = buildSingleCardReport({
        drawn: singleDrawn,
        question: state.question,
        locale,
      });
      const orientationLabel = report.orientation === 'upright' ? t('orientation.upright') : t('orientation.reversed');
      const questionText = state.question || t('question.none');

      return [
        `${t('copy.singleTitle')} — ${new Date().toLocaleDateString(locale)}`,
        `${t('copy.question')}：${questionText}`,
        `${t('copy.card')}：${report.card.nameZh} / ${report.card.nameEn}（${orientationLabel}）`,
        `${t('copy.archetype')}：${report.identity.archetype}`,
        `${t('copy.element')}：${report.identity.element}`,
        `${t('copy.astrology')}：${report.identity.astrology}`,
        report.identity.mythicAssociation.length ? `${t('copy.myth')}：${report.identity.mythicAssociation.join(' · ')}` : '',
        `${t('copy.symbols')}：${report.symbols.join(' · ')}`,
        `${t('copy.keywords')}：${report.keywords.join(' · ')}`,
        '',
        `【${t('section.essence')}】`,
        report.sections.essence,
        '',
        `【${t('section.questionResponse')}】`,
        report.sections.questionResponse,
        '',
        `【${t('section.hiddenReminder')}】`,
        report.sections.hiddenReminder,
        '',
        `【${t('section.actionAdvice')}】`,
        report.sections.actionAdvice,
        '',
        `【${t('section.quote')}】`,
        report.sections.quote,
      ].filter(Boolean).join('\n');
    }

    if (state.spreadId === 'three-card' && state.drawnCards.length >= 3) {
      const report = buildThreeCardReport({
        drawnCards: state.drawnCards,
        question: state.question,
        locale,
      });
      const questionText = state.question || t('question.none');

      return [
        `${t('copy.threeTitle')} — ${new Date().toLocaleDateString(locale)}`,
        `${t('copy.question')}：${questionText}`,
        '',
        ...report.cards.flatMap(card => [
          `【${card.positionName}】${card.cardNameZh} / ${card.cardNameEn}（${card.orientation === 'upright' ? t('orientation.upright') : t('orientation.reversed')}）`,
          `${t('copy.keywords')}：${card.keywords.join(' · ')}`,
          card.roleReading,
          '',
        ]),
        `【${t('section.storyline')}】`,
        report.storyline,
        '',
        `【${t('section.hiddenReminder')}】`,
        report.hiddenReminder,
        '',
        `【${t('section.actionAdvice')}】`,
        report.actionAdvice,
        '',
        `【${t('section.quote')}】`,
        report.quote,
      ].filter(Boolean).join('\n');
    }

    if (state.spreadId === 'celtic-cross' && state.drawnCards.length >= 10) {
      const report = buildCelticCrossReport({
        drawnCards: state.drawnCards,
        question: state.question,
        locale,
      });
      const questionText = state.question || t('question.none');

      return [
        `${t('copy.celticTitle')} — ${new Date().toLocaleDateString(locale)}`,
        `${t('copy.question')}：${questionText}`,
        '',
        `【${t('copy.overview')}】`,
        report.overview,
        '',
        ...report.cards.flatMap(card => [
          `【${card.positionName}】${card.cardNameZh} / ${card.cardNameEn}（${card.orientation === 'upright' ? t('orientation.upright') : t('orientation.reversed')}）`,
          `${t('copy.keywords')}：${card.keywords.join(' · ')}`,
          card.positionReading,
          '',
        ]),
        `【${t('section.coreConflict')}】`,
        report.sections.coreConflict,
        '',
        `【${t('section.deepCause')}】`,
        report.sections.deepCause,
        '',
        `【${t('section.consciousDirection')}】`,
        report.sections.consciousDirection,
        '',
        `【${t('section.selfAndEnvironment')}】`,
        report.sections.selfAndEnvironment,
        '',
        `【${t('section.emotionalTension')}】`,
        report.sections.emotionalTension,
        '',
        `【${t('section.futureTrend')}】`,
        report.sections.futureTrend,
        '',
        `【${t('section.finalAdvice')}】`,
        report.sections.finalAdvice,
        '',
        `【${t('section.quote')}】`,
        report.sections.quote,
      ].filter(Boolean).join('\n');
    }

    const lines: string[] = [
      `${t('copy.genericTitle')} — ${new Date().toLocaleDateString(locale)}`,
    ];
    if (state.question) lines.push(`${t('copy.question')}：${state.question}`);
    lines.push('');
    state.drawnCards.forEach(d => {
      lines.push(`【${d.position}】${d.card.nameZh} ${d.reversed ? `（${t('orientation.reversed')}）` : `（${t('orientation.upright')}）`}`);
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
  const aiReadingContext = {
    spreadId: state.spreadId,
    locale,
    question: state.question,
    drawnCards: state.drawnCards,
    localReportText: buildResultText(),
  };

  return (
    <div className="reading-page" style={{ alignItems: 'center', flexDirection: 'column', padding: '1rem 0' }}>
      {(copied || saved) && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,22,14,0.96)', border: '1px solid var(--gold)',
          borderRadius: '4px', padding: '0.5rem 1.5rem',
          fontFamily: 'var(--font-zh)', fontSize: '0.85rem', color: 'var(--gold-bright)',
          zIndex: 999, pointerEvents: 'none',
        }}>
          {copied ? t('toast.copied') : t('toast.saved')}
        </div>
      )}

      {state.spreadId === 'single-card'  && <ResultSingleCard  {...actionProps} />}
      {state.spreadId === 'three-card'   && <ResultThreeCard   {...actionProps} />}
      {state.spreadId === 'celtic-cross' && <ResultCelticCross {...actionProps} />}
      <AiReadingPanel context={aiReadingContext} />
    </div>
  );
}

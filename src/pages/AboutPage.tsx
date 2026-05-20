import { useI18n } from '../i18n/I18nContext';

function MultilineText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <span key={index}>
          {paragraph}
          {index < text.split('\n\n').length - 1 && <><br /><br /></>}
        </span>
      ))}
    </>
  );
}

export function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="page">
      <div className="about-page">
        <div className="about-hero">
          <div className="about-medallion">🌙</div>
          <div className="about-title-zh">{t('about.title')}</div>
          <div className="about-title-en">{t('app.logoEn')}</div>
          <div className="section-divider" style={{ maxWidth: 360, margin: '0.5rem auto' }}>
            <span>✦</span>
          </div>
        </div>

        <div className="about-columns">
          <div className="about-column">
            <div className="about-col-title-zh">{t('about.ourStory')}</div>
            <div className="about-col-title-en">{t('about.ourStoryEn')}</div>
            <div className="about-col-divider" />
            <div className="about-col-text">
              <MultilineText text={t('about.storyText')} />
            </div>
          </div>

          <div className="about-column">
            <div className="about-col-title-zh">{t('about.wisdom')}</div>
            <div className="about-col-title-en">{t('about.wisdomEn')}</div>
            <div className="about-col-divider" />
            <div className="about-col-text">
              <MultilineText text={t('about.wisdomText')} />
            </div>
          </div>

          <div className="about-column">
            <div className="about-col-title-zh">{t('about.contact')}</div>
            <div className="about-col-title-en">{t('about.contactEn')}</div>
            <div className="about-col-divider" />
            <div className="about-col-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div className="about-contact-item">
                <span className="about-contact-label">{t('about.email')}</span>
                <span>hello@tarotoracles.com</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">{t('about.website')}</span>
                <span>www.tarotoracles.com</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">{t('about.weibo')}</span>
                <span>{t('about.weiboValue')}</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">{t('about.wechat')}</span>
                <span>TarotOracles</span>
              </div>
            </div>
            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t('about.quote')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
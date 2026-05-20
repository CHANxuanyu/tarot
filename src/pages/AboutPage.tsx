export function AboutPage() {
  return (
    <div className="page">
      <div className="about-page">
        {/* Hero medallion */}
        <div className="about-hero">
          <div className="about-medallion">🌙</div>
          <div className="about-title-zh">塔 罗 启 示</div>
          <div className="about-title-en">T H E &nbsp; O R A C L E S</div>
          <div className="section-divider" style={{ maxWidth: 360, margin: '0.5rem auto' }}>
            <span>✦</span>
          </div>
        </div>

        {/* Three columns */}
        <div className="about-columns">
          <div className="about-column">
            <div className="about-col-title-zh">关于我们</div>
            <div className="about-col-title-en">OUR STORY</div>
            <div className="about-col-divider" />
            <div className="about-col-text">
              塔罗启示诞生于对神秘学的深切热爱。每一张塔罗牌都是宇宙智慧的低语，引领我们走向内在的真相与未来的可能。
              <br /><br />
              我们相信，塔罗不是命运的裁决，而是内心的镜子。它折射出你已知晓却尚未言说的一切。
              <br /><br />
              在这里，每一次占卜都是一场与自己的对话，每一张翻开的牌都是一个新的视角。
            </div>
          </div>

          <div className="about-column">
            <div className="about-col-title-zh">塔罗的智慧</div>
            <div className="about-col-title-en">TAROT WISDOM</div>
            <div className="about-col-divider" />
            <div className="about-col-text">
              塔罗是一面映照内心世界的镜子，揭示隐藏的机遇与挑战，帮助我们更深刻地理解过去、把握当下、创造未来。
              <br /><br />
              78张牌构成一套完整的生命密码——22张大阿卡那对应人生的重大主题，56张小阿卡那呈现日常生活的细节与变化。
              <br /><br />
              让塔罗的智慧成为你的向导，在命运的星河中找到属于你的光芒。
            </div>
          </div>

          <div className="about-column">
            <div className="about-col-title-zh">联系我们</div>
            <div className="about-col-title-en">CONTACT US</div>
            <div className="about-col-divider" />
            <div className="about-col-text" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div className="about-contact-item">
                <span className="about-contact-label">邮箱</span>
                <span>hello@tarotoracles.com</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">网站</span>
                <span>www.tarotoracles.com</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">微博</span>
                <span>@塔罗启示</span>
              </div>
              <div className="about-contact-item">
                <span className="about-contact-label">微信</span>
                <span>TarotOracles</span>
              </div>
            </div>
            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              "The cards are mirrors of the soul, windows to the unseen, and whispers from the eternal."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

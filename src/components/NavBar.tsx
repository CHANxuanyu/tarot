import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: '首页', end: true },
  { to: '/reading', label: '在线占卜' },
  { to: '/learn', label: '学习殿堂' },
  { to: '/calendar', label: '星象日历' },
  { to: '/about', label: '关于' },
];

export function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <span className="nav-logo-zh">塔罗启示</span>
        <span className="nav-logo-sep">✦</span>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.3em', opacity: 0.7 }}>THE ORACLES</span>
      </NavLink>

      <ul className="nav-items">
        {NAV_ITEMS.map(item => (
          <li key={item.to} className="nav-item">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

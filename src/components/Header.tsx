import React from 'react';

const Header = React.memo(() => {
  const [expanded, setExpanded] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);

  const onClick = React.useCallback(() => {
    if (!toggled) {
      setToggled(true);
    }
    setExpanded(!expanded);
  }, [expanded, toggled]);

  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="Яндекс.Дом"></a>
      <button 
        className="header__menu" 
        aria-expanded={expanded ? 'true' : 'false'} 
        onClick={onClick}
      >
        <span className="header__menu-text a11y-hidden">
          {expanded ? 'Закрыть меню' : 'Открыть меню'}
        </span>
      </button>
      <ul className={`header__links${expanded ? ' header__links_opened' : ''}${toggled ? ' header__links-toggled' : ''}`}>
        <li className="header__item">
          <a className="header__link header__link_current" href="/" aria-current="page">
            Сводка
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/devices">
            Устройства
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/scripts">
            Сценарии
          </a>
        </li>
      </ul>
    </header>
  );
});

Header.displayName = 'Header';

export default Header; 
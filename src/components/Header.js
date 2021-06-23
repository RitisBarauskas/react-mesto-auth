import React from 'react';
function Header() {
  return (
    <header className="header">
        <a href="/" className="header__link" target="_self">
            <div className="header__logo"> </div>
        </a>
        <div className="header__auth">
            Войти
        </div>
    </header>
  );
}

export default Header;
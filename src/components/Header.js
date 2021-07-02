import React from 'react';
import {Route, Switch, Link} from "react-router-dom";

function Header({email, handleLogout}) {
  return (
    <header className="header">
        <Link to="/" className="header__link">
            <div className="header__logo"></div>
        </Link>
        <div className="header__auth">
            <Switch>
                <Route exact path="/">
                        <p className="header__text">{email}</p>
                        <Link
                            to="/sign-in"
                            onClick={handleLogout}
                            className="header__nav-link header__nav-link_logout"
                        >Выйти</Link>
                </Route>

                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__nav-link">Зарегистрироваться</Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__nav-link">Войти</Link>
                </Route>
            </Switch>

        </div>
    </header>
  );
}

export default Header;
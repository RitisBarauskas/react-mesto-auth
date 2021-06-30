import {NavLink} from "react-router-dom";

const Register = () => {
    return (
        <div className="sign">
            <h2 className="sign__title">
                Регистрация
            </h2>
            <form className="sign__form" name="sign-up-form">
                <input className="sign__input" placeholder="Email"/>
                <input className="sign__input" placeholder="Пароль"/>
                <input className="sign__button" type="submit" value="Зарегистрироваться"/>
                <p className="sign__text">Уже зарегистрированы? <NavLink className="sign__link" to="/sign-in">Войти</NavLink></p>
            </form>
        </div>
    );
}

export default Register;

const Login = () => {
    return (
        <div className="sign">
            <h2 className="sign__title">
                Вход
            </h2>
            <form className="sign__form" name="sign-in-form">
                <input className="sign__input" placeholder="Email"/>
                <input className="sign__input" placeholder="Пароль"/>
                <input className="sign__button" type="submit" value="Войти"/>
            </form>
        </div>
    );
}

export default Login;
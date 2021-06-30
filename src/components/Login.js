import React from 'react';

const Login = ({handleSignIn}) => {

    const [data, setData] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setData({
            ...data,
            [name]: value
        })

    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleSignIn(data);
    }

    return (
        <div className="sign">
            <h2 className="sign__title">
                Вход
            </h2>
            <form className="sign__form" name="sign-in-form" onSubmit={handleSubmit}>
                <input
                    className="sign__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    value={data.email}
                />
                <input
                    className="sign__input"
                    name="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    type="password"
                    value={data.password}
                />
                <input
                    className="sign__button"
                    type="submit"
                    value="Войти"
                />
            </form>
        </div>
    );
}

export default Login;
import { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, error, clearError, request } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const changeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form });
			message(data.message);
		} catch (error) {}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form });
			auth.login(data.token, data.userId);
		} catch (error) {}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи Ссылку</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
								<label
									htmlFor="email"
									style={{ transform: 'translateY(-14px) scale(0.8)' }}
								>
									Email
								</label>
							</div>
							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									value={form.password}
									className="yellow-input"
									onChange={changeHandler}
								/>
								<label
									htmlFor="password"
									style={{ transform: 'translateY(-14px) scale(0.8)' }}
								>
									Пароль
								</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{ marginRight: 10 }}
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button
							onClick={registerHandler}
							disabled={loading}
							className="btn grey lighten-1 black-text"
						>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;

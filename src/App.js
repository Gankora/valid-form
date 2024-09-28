import styles from './app.module.css';
import { useStore } from './Components/useStore';
import { useState, useRef } from 'react';

function App() {
	const submitButtonRef = useRef(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null); // ошибка первого пароля
	const [passwordRepeatError, setPasswordRepeatError] = useState(null); // ошибка сравнения паролей

	const { getState, updateState } = useStore();
	/*
	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};
	*/

	// Задействует кнопку регистрации данных
	const onDataLog = (e) => {
		e.preventDefault();
		sendFormData(getState());
		updateState({ email: '', password: '', secondPassword: '' });
		alert('Регистрация успешно пройдена');
	};

	const sendFormData = (formData) => {
		console.log(formData);
	};

	// инициализируем переменные для использования в JSX разметке
	const { email, password, secondPassword } = getState();

	// валидация email
	const validationEmail = ({ target }) => {
		//updateState('email', target.value);
		updateState({ email: target.value });
		const cyrillicRegex = /[а-яА-Я]/;
		const emailRegex =
			/^(([^<>()[\]\\%^№"'?/|*&$#!.,;:+-\s@"]{1,}(\.[^<>()[\]\\%^№"'?/|*&$#!.,;:+-\s@"]{3,})*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		let newError = null;

		if (target.value === '') {
			newError = 'Необходимо заполнить email-адрес';
		} else if (cyrillicRegex.test(target.value)) {
			newError = 'В имени почты не должно быть кириллицы';
		} else if (!emailRegex.test(target.value)) {
			newError = 'Неверный формат e-mail';
		}

		setEmailError(newError);
	};

	// валидация пароля
	const validationPassword = ({ target }) => {
		//updateState('password', target.value);
		updateState({ password: target.value });
		const cyrillicRegex = /[а-яА-Я]/;
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

		let newError = null;

		if (target.value === '') {
			newError = 'Необходимо заполнить пароль';
		} else if (cyrillicRegex.test(target.value)) {
			newError = 'В названии пароля нельзя использовать кириллицу';
		} else if (!passwordRegex.test(target.value)) {
			newError =
				'Пароль должен содержать минимум 5 символов, включая хотя бы одну заглавную букву и одну цифру, без пробелов';
		}

		setPasswordError(newError);
	};
	// валидация 2 пароля
	const validationSecondPassword = ({ target }) => {
		//updateState('secondPassword', target.value);
		updateState({ secondPassword: target.value });
		if (password === '') {
			setPasswordError('Необходимо заполнить пароль');
			updateState({ secondPassword: '' });
		}
	};

	// сравнение двух паролей при клике на кнопку
	const validationForm = () => {
		if (email.trim() === '') {
			setEmailError('Необходимо заполнить email-адрес');

			setTimeout(() => {
				setEmailError(null);
			}, 3000);
		} else {
			setEmailError(null);
		}

		if (password.trim() === '') {
			setPasswordError('Необходимо заполнить пароль');

			setTimeout(() => {
				setPasswordError(null);
			}, 3000);
		} else {
			setPasswordError(null);
		}

		if (password !== secondPassword) {
			setPasswordRepeatError('Ошибка совместимости значений пароля');
			//updateState('secondPassword', '');
			updateState({ secondPassword: '' });
			setTimeout(() => {
				setPasswordRepeatError(null);
			}, 3000);
		} else {
			setPasswordRepeatError(null);
		}
	};

	const focusForm = () => {
		if (email !== '' && secondPassword.trim().length === password.trim().length - 1) {
			submitButtonRef.current.focus();
		}
	};
	// JSX
	return (
		<div className={styles.app}>
			<h2>Регистрация пользователя</h2>
			<form onSubmit={onDataLog} onChange={focusForm} className={styles.validForm}>
				<input
					className={styles.validInput}
					name="email"
					type="email"
					placeholder="Введите email"
					value={email}
					onChange={validationEmail}
				/>
				{emailError && <p className={styles.errorLabel}>{emailError}</p>}
				<input
					className={styles.validInput}
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={validationPassword}
				/>
				{passwordError && <p className={styles.errorLabel}>{passwordError}</p>}
				<input
					className={styles.validInput}
					name="secondPassword"
					type="password"
					placeholder="Повтор пароля"
					value={secondPassword}
					onChange={validationSecondPassword}
					disabled={passwordError}
				/>
				{passwordRepeatError && (
					<p className={styles.errorLabel}>{passwordRepeatError}</p>
				)}
				<br />
				<br />
				<button
					className={styles.validButton}
					type="Submit"
					onClick={validationForm}
					disabled={emailError || passwordError || passwordRepeatError}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
				<br />
			</form>
		</div>
	);
}

export default App;

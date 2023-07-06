import { useState } from 'react';
import Button from '../../components/button/Button';
import CheckBox from '../../components/input/Checkbox';
import EmailInput from '../../components/input/EmailInput';
import Label from '../../components/input/Label';
import PasswordInput from '../../components/input/PasswordInput';
import useUpdateTitle from '../../hooks/useUpdateTitle';
import Link from '../../components/Link';
import { useNavigate } from 'react-router-dom';
import http from '../../util/http';
import Notification from '../../components/Notification';
import isEmpty from '../../util/isEmpty';
import isEmail from '../../util/isEmail';
import useLoading from '../../hooks/useLoading';
import { useCallback } from 'react';

/**
 * Login page
 */
function Login() {
	const [checked, setChecked] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [notification, setNotification] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useLoading(loading);

	const [role, setRole] = useState('student');

	useUpdateTitle(`${role} login`);

	const toggleChecked = () => setChecked(!checked);

	/**
	 * Login request for user
	 */
	const login = useCallback(async () => {
		if (isEmpty(email))
			return setNotification({
				text: 'email is required',
				type: 'error',
			});

		if (isEmpty(password))
			return setNotification({
				text: 'password is required',
				type: 'error',
			});

		if (!isEmail(email))
			return setNotification({
				text: 'please enter a valid email',
				type: 'error',
			});

		setLoading(true);

		try {
			await http.post(
				`login/${role}`,
				{ email, password, onetime: !checked },
				{
					headers: {
						'content-type': 'application/json',
					},
				}
			);

			setNotification({
				text: 'logged in success, redirecting please wait...',
				type: 'success',
			});

			navigate('/');
		} catch (error) {
			setNotification({
				text: error.response.data.message[0],
				type: 'error',
			});
		} finally {
			setLoading(false);
		}
	}, [checked, email, password, navigate, role]);

	return (
		<div className="bg-white p-4 max-w-3xl flex-grow rounded-sm shadow-2xl">
			<div className="p-2"></div>
			<h1 className="text-3xl text-gray-900 font-semibold tracking-normal font-lato my-4">
				{role.slice(0, 1).toUpperCase()}
				{role.slice(1)} login
			</h1>

			<Label>Login as</Label>
			<div className="flex justify-between items-center bg-white my-2 text-center">
				<span
					onClick={() => setRole('student')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'student' && 'bg-slate-800 text-white'
					}`}>
					Student
				</span>
				<span
					onClick={() => setRole('parent')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'parent' && 'bg-slate-800 text-white'
					}`}>
					Parent
				</span>
				<span
					onClick={() => setRole('school')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'school' && 'bg-slate-800 text-white'
					}`}>
					School
				</span>
				<span
					onClick={() => setRole('librarian')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'librarian' && 'bg-slate-800 text-white'
					}`}>
					Librarian
				</span>
				<span
					onClick={() => setRole('accountant')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'accountant' && 'bg-slate-800 text-white'
					}`}>
					Accountant
				</span>
				<span
					onClick={() => setRole('admin')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'admin' && 'bg-slate-800 text-white'
					}`}>
					Admin
				</span>
				<span
					onClick={() => setRole('super-admin')}
					className={`p-1 cursor-pointer w-full border ${
						role === 'super-admin' && 'bg-slate-800 text-white'
					}`}>
					Super Admin
				</span>
			</div>
			<Label>Email</Label>
			<EmailInput
				name="email"
				value={email}
				onInput={(e) => setEmail(e.target.value)}
			/>

			<div className="p-1"></div>

			<Label>Password</Label>
			<PasswordInput
				name="password"
				value={password}
				onInput={(e) => setPassword(e.target.value)}
			/>

			<div className="flex justify-between mt-1">
				<div>
					<CheckBox checked={checked} onChange={toggleChecked} />
					<span className="ml-1"></span>
					<Label small={true} onClick={toggleChecked}>
						remember me
					</Label>
				</div>
				<div>
					<Label small={true}>
						<Link to={`/forgot-password`}>forgot password?</Link>
					</Label>
				</div>
			</div>

			<div className="p-2"></div>
			<Button onClick={login}>Login</Button>
			<div className="p-2"></div>
			{notification.text && (
				<Notification
					type={notification.type}
					onClose={() => setNotification({})}
					closeOnBGClick={true}>
					{notification.text}
				</Notification>
			)}
		</div>
	);
}

export default Login;

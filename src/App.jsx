import 'react-phone-input-2/lib/style.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './css/App.css';
import Loading from './components/Loading';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Default = lazy(() => import('./pages/auth/Default'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const LoginHandler = lazy(() => import('./pages/auth/LoginHandler'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const CreateSuperUser = lazy(() => import('./pages/CreateSuperUser'));
const Login = lazy(() => import('./pages/auth/Login'));
const Center = lazy(() => import('./components/Center'));
const Logout = lazy(() => import('./pages/auth/Logout'));
const School = lazy(() => import('./pages/school/Schools'));
const AddSchool = lazy(() => import('./pages/school/Add'));
const Users = lazy(() => import('./pages/users/Users'));
const AddUser = lazy(() => import('./pages/users/Add'));

function App() {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{/* Create super user */}
				<Route
					path="/create-super-admin"
					element={
						<Center>
							<CreateSuperUser />
						</Center>
					}
				/>
				{/* Login */}
				<Route
					path="/login"
					element={
						<LoginHandler>
							<Outlet />
						</LoginHandler>
					}>
					<Route index element={<Login />} />
				</Route>
				{/* Dashboard */}
				<Route path="forgot-password" element={<ForgotPassword />} />
				<Route path="reset-password" element={<ResetPassword />} />
				<Route
					path="/"
					element={
						<Dashboard>
							<Outlet />
						</Dashboard>
					}>
					<Route index />
					{/* Schools */}
					<Route path="school">
						<Route index element={<School />} />
						<Route path="add" element={<AddSchool />} />
						<Route path="edit/:school_id" element={<AddSchool />} />
					</Route>
					<Route path="users/:role" element={<Users />} />
					<Route path="users/:role/add" element={<AddUser />} />
					<Route path="logout" element={<Logout />} />
				</Route>
				{/* 404 */}
				<Route
					path="*"
					element={
						<Center>
							<NotFound />
						</Center>
					}
				/>
			</Routes>
		</Suspense>
	);
}
export default App;

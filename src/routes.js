import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard"
import OrganizationDetails from "./pages/OrganizationDetails";
import EventDetails from "./pages/EventDetails"
import ErrorPage from "./pages/ErrorPage"
import Attendance from "./pages/Attendance"
import Header from "./components/Header";

const AuthRoute = () => {
	const user = localStorage.getItem("user")
	if (!user) {
		return <Navigate to='/login' replace />;
	}
	// && (JSON.stringify(window.location.href.replace(window.location.origin, '')) === '/login' || JSON.stringify(window.location.href.replace(window.location.origin, '')) === '/registration')
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

const Router = () => {
	return (
		<Routes>
			<Route exact path='/login' element={<Login />} />
			<Route exact path='/registration' element={<Registration />} />
			<Route element={<AuthRoute />}>
				<Route exact path='/' element={<Dashboard />} />
				<Route exact path='/dashboard' element={<Dashboard />} />
				<Route exact path='/organization' element={<OrganizationDetails />} />
				<Route exact path='/organization/:org_id/:org_name' element={<OrganizationDetails />} />
				<Route
					exact
					path='/organization/event/:org_id/:event_id'
					element={<EventDetails />}
				/>
				<Route
					exact
					path='/organization/event/attendance/:event_id'
					element={<Attendance />}
				/>
				{/* <Route exact path='/tasks' element={<Tasks />} />
				<Route exact path='/task/create' element={<CreateTask />} />
				<Route exact path='/task/:task_id' element={<Task />} />
				<Route exact path='/profile/:user_id' element={<Profile />} /> */}
			</Route>
			<Route path='*' element={<ErrorPage />} />
		</Routes>
	);
};

export default Router;
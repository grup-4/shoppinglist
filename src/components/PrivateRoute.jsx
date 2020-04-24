import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				JSON.parse(localStorage.getItem('isLogin')) === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

export default PrivateRoute;
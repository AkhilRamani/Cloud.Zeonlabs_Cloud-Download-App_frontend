import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router-dom'

import './styles/global.styles.scss'
import ReduxWrapper from './redux/ReduxWrapper'
import MainApp from './pages/MainApp/MainApp'
import Auth from './pages/Auth/Auth'
import ActivateAccount from './pages/VerifyEmail/ActivateAccount'
import {ProtectedRoute} from './ProtectedRoute'
import ForgotPass from './pages/ForgotPass/forgotPass';
import ResetPassword from './pages/ForgotPass/ResetPassword';
import EditProfile from './pages/EditProfile/EditProfile';
import { routes } from './common/constants';
import DownloadFile from './pages/DownloadFile/DownloadFile';
import TandC from './pages/TermsAndConditions/TandC';
import { fetchProfile } from './apis/sendRequest.api';

function App() {
	useEffect(() => {
		fetchProfile()
	}, [])

  	return (
  		<ReduxWrapper>
			<Switch>
				<Route path={routes.AUTH} exact component={Auth} />
				<Route path={routes.FORGOT_PASS} exact component={ForgotPass} />
				<Route path={routes.RESET_PASS} exact component={ResetPassword} />
				<Route path={routes.ACTIVATE_ACCOUNT} exact component={ActivateAccount} />
				<Route path={routes.T_AND_C} exact component={TandC} />
				<Route path={routes.DOWNLD_FILE} exact component={DownloadFile} />

				<ProtectedRoute path={routes.APP} exact component={MainApp} />
				<ProtectedRoute path={routes.EDIT_PROFILE} exact component={EditProfile} />

				<Route component={() => <h3>Not found</h3>} />

			</Switch>
		</ReduxWrapper>
  	);
}

export default App;

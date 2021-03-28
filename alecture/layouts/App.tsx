import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';

const App = () => {
    return (
        // Switch : 여러개 라우터 중 하나만 보여주는 거
        <Switch>
            {/* path: / 로 들어오면 login 으로 돌려보냄 */}
            <Redirect exact path="/" to="/login" /> 
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
        </Switch>
    );
}

export default App;
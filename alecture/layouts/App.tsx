import React from 'react';
import loadable from '@loadable/component'
import { Switch, Route, Redirect } from 'react-router-dom';

// 페이지 단위로 코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));

const App = () => {
    return (
        // Switch : 여러개 라우터 중 하나만 보여주는 거
        <Switch>
            {/* path: / 로 들어오면 login 으로 돌려보냄 */}
            <Redirect exact path="/" to="/login" /> 
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/workspace/channel" component={Channel} />
        </Switch>
    );
}

export default App;
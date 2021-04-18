import React, { FC, useCallback, useState } from 'react';
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Channels, Chats, WorkspaceName, MenuScroll, ProfileModal, LogOutButton } from '@layouts/Workspace/styles';
import useSWR from 'swr';
import { Redirect, Switch, Route } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import axios from 'axios'
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu'

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace:FC = ({children}) => {

    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 2000, 
        // dedupingInterval : 캐시 유지 기간. 이 기간 내에는 캐시에서 불러옴
    });

    const [showUserMenu, setShowUserMenu] = useState(false);

    const onLogout = useCallback(() => {
        axios.post('/api/users/logout', null, {
            withCredentials: true,
        })
        .then(() => {
            mutate(false, false); // data에 false 값 셋팅
            // SWR이 컴포넌트를 넘나들면서 전역 로컬스토리지 역할을 함 
        })
    }, []);

    // toggle 함수
    const onClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev);
    }, [showUserMenu]);

    if (!data) {
        return <Redirect to="/login" />;
    } else {
        console.log('else')
        console.log(data)
        // debugger
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url('', {s: '28px', d: 'retro'})}  alt={''} />
                        {showUserMenu && (
                            <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img src={''} alt={''} />
                                    <div>
                                        <span id="profile-name">{data.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>  
                        )}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspace>test</Workspace>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>menu scroll</MenuScroll>
                </Channels>
                <Chats>
                <Switch>
                    <Route exact path="/workspace/channel" component={Channel} />
                    <Route exact path="/workspace/dm" component={DirectMessage} />
                </Switch>
                </Chats>
            </WorkspaceWrapper>
        </div>
    )
}

export default Workspace;
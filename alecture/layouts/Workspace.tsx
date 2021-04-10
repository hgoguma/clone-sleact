import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios'

const Workspace:FC = ({children}) => {

    const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);

    const onLogout = useCallback(() => {
        axios.post('/api/users/logout', null, {
            withCredentials: true,
        })
        .then(() => {
            mutate(false); // date에 false 값 셋팅
            // SWR이 컴포넌트를 넘나들면서 전역 로컬스토리지 역할을 함 
        })
    }, []);

    return (
        <button onClick={onLogout}>로그아웃</button>
    )
}

export default Workspace;
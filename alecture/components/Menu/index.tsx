import React, { CSSProperties, FC, useCallback, useState } from 'react';
import { CreateMenu, CloseModalButton } from './styles';
import useSWR from 'swr';
import { Redirect, Switch, Route } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import axios from 'axios';

// Props 정의
interface Props {
    style: CSSProperties;
    show: boolean;
    onCloseModal: () => void;
    closeButton?: boolean;
}

// 부모 태그로 이벤트 전달 막기
const stopPropagation = useCallback((e) => {
    e.stopPropagation();
}, []);

const [closeButton, setCloseButton] = useState(false);

// 제네릭 타입으로 Props 정의
const Menu:FC<Props> = ({children, style, show, onCloseModal}) => {
    
    return (
        <CreateMenu onClick={onCloseModal}>
            <div style={style} onClick={stopPropagation}>
                {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
                {children}
            </div>
        </CreateMenu>
        
    )
}

// Props의 디폴트 값 설정
Menu.defaultProps = {
    closeButton: true,
}

export default Menu;
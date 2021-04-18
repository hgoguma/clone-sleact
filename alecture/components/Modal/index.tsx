import React, { FC, useCallback } from 'react';
import { CreateMenu, CloseModalButton } from './styles';
import useSWR from 'swr';
import { Redirect, Switch, Route } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import axios from 'axios'

const Menu:FC = ({children}) => {
    
    return (
        <CreateMenu>
            <div>
                {children}
            </div>
        </CreateMenu>
        
    )
}

export default Menu;
import React from 'react';
import {Button} from "../Button/Button";
import {toggleThemeAC} from "../../model/app-slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const Header = () => {

    const dispatch = useAppDispatch();

    return (
        <div>
            <Button title={'Change theme'} className={'btnChangeTheme'}
                    onClick={() => dispatch(toggleThemeAC())}/>
        </div>

    );
};


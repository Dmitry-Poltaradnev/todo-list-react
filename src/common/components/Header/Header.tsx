import React from 'react';
import {Button} from "../Button/Button";
import {toggleThemeAC} from "../../../features/todolists/model/app-slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import s from '../../theme/Theme.module.css'

export const Header = () => {

    const dispatch = useAppDispatch();

    return (
        <div>
            <Button title={'Change theme'} className={s.btnChangeTheme}
                    onClick={() => dispatch(toggleThemeAC())}/>
        </div>

    );
};


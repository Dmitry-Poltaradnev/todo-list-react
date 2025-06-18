import {useAppSelector} from "../hooks/useAppSelector";
import {selectAppTheme} from "../model/app-selectors";
import {ThemeType} from "../model/app-slice";
import {FC, ReactNode} from "react";

export const ThemeWrapper: FC<{ children: ReactNode }> = ({children}) => {
    const themeValue = useAppSelector(selectAppTheme)

    return (
        <div className={themeValue === ThemeType.White ? 'whiteTheme' : 'blackTheme'}>
            {children}
        </div>
    )
}
export enum ThemeType {
    White = 'white',
    Dark = 'dark',
}

const initThemeState: ThemeType = ThemeType.White

type ThemeReducerType = ChangeThemeType

type ChangeThemeType = ReturnType<typeof toggleThemeAC>

export const themeReducer = (state: ThemeType = initThemeState, action: ThemeReducerType): ThemeType => {
    switch (action.type) {
        case 'TOGGLE-THEME': {
            return state === ThemeType.White ? ThemeType.Dark : ThemeType.White
        }
        default:
            return state;
    }
}

export const toggleThemeAC = () => {
    return {type: 'TOGGLE-THEME'} as const;
}
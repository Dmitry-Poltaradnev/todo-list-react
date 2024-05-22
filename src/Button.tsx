import React from 'react';

type buttonPropType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
}

export const Button = ({title, onClickHandler, disabled}: buttonPropType) => {
    return (
        <button disabled={disabled} onClick={onClickHandler}>{title}</button>
    );
};
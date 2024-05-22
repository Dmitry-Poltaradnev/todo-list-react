import React from 'react';

type buttonPropType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    classes?: string
}

export const Button = ({title, onClickHandler, disabled, classes}: buttonPropType) => {
    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={onClickHandler}>
            {title}</button>
    );
};
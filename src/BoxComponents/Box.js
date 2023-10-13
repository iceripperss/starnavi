import React from 'react';
import "./BoxComponents.css";
import clsx from "clsx";

export const Box = ({id, setBoxes, active}) => (
    <div className={clsx("box", active && "activeBox")} onMouseEnter={() =>
        setBoxes(
            (prevState) => (prevState.map((item) => (item.id === id ? {
                    ...item,
                    active: !item.active
                } : item))
            ))
    }/>
);

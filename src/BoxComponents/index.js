import React, {useEffect, useState} from 'react';
import './BoxComponents.css';
import axios from "axios";
import {Box} from "./Box";

export const BoxComponents = () => {
    const [modes, setModes] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [fields, setFields] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("https://60816d9073292b0017cdd833.mockapi.io/modes").then((response) => {
            setModes(response.data);
            setLoading(false);
            setFields(response.data[0].field);
        }).catch((error) => console.log(error));
    }, []);

    const calculatedBoxes = (fields) => {
        let calculatedBoxes = [];
        for (let i = 0; i < fields; i++) {
            calculatedBoxes.push({id: i, active: false});
        }
        setBoxes(calculatedBoxes);
    }

    return (
        <>
            <div className="picker">
                <label style={{marginRight: 10}}>Pick mode</label>
                {loading ? <span>Loading ... </span> : <select style={{marginRight: 10}} onChange={(e) => {
                    setFields(e.target.value);
                }}>
                    {modes.map((mode) => (<option key={mode.name} value={mode.field}>{mode.name}</option>))}
                </select>}
                <button onClick={() => calculatedBoxes(fields)} type="button">Start</button>
            </div>
            <div>
                <div className="boxes">
                    {boxes && boxes.map((box) => (
                        <Box key={box.id} id={box.id} active={box.active} setBoxes={setBoxes}/>))}
                </div>
            </div>
            <div className="aside">
                <h4>Hover squares</h4>
                {boxes.map((item) => {
                    const row = (item.id - item.id % 5) / 5 + 1;
                    const col = item.id % 5 + 1
                    const result = `row ${row} col ${col}`;

                    if (item.active) {
                        return (<div key={item.id} className="asideItem">{result}</div>)
                    }
                })}
            </div>
        </>
    );
};

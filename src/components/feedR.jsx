import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedR.css';

function FeedR() {
    const [novelTextWordArrays, setNovelTextWordArrays] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(1000);

    const loadWord = () => {
        axios
            .get(`/retrieve?url=https://lightnovelreader.org/historys-strongest-senior-brother/chapter-1`)
            .then(resp => {
                // setNovelTextWordArrays(resp.data);
                // console.log(novelTextWordArrays);
                console.log('Data: ', resp.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setTimeout(() => {
            setCurrentWord(novelTextWordArrays[index]);
            setIndex(index + 1);
        }, delay);
    }, [index, delay, novelTextWordArrays]);

    return (
        <div className="FeedR">
            <button onClick={ () => loadWord() }>Click Me</button>
            <h2>{ currentWord }</h2>
        </div>
    );
}

export default FeedR;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedR.css';

const punctuationDelaySystem = (() => {
    let publicAPIs = {};

    let delayMapping = {
        '.': 500,
        ',': 300
    };
    publicAPIs.addPunctuationDelay = (word) => {
        let finalDelay = 0;
        if (word.includes('.')) finalDelay += delayMapping['.'];
        if (word.includes(',')) finalDelay += delayMapping[','];
        return finalDelay;
    }

    return publicAPIs;
})();

function FeedR() {
    const baseDelay = 350;

    const [novelTextWordArrays, setNovelTextWordArrays] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [pastWords, setPastWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(baseDelay);
    const [feedrTimeout, setFeedrTimeout] = useState(null);
    const [isFeeding, setIsFeeding] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const pastFeed = document.querySelector('.past-feeds');

    const loadWords = async () => {
        if (isReset) {
            setIndex(0);
            setPastWords([]);
        }
        let response = await axios.get(`/retrieve?url=https://lightnovelreader.org/historys-strongest-senior-brother/chapter-1`);
        setNovelTextWordArrays(response.data.wordArr);
        setIsFeeding(!isFeeding);
    }

    const updateFeedr = () => {
        if (isFeeding) {
            pastFeed && pastFeed.scrollBy({
                top: 1000,
                left: 0,
                behavior: 'smooth'
            });

            clearTimeout(feedrTimeout);
            setFeedrTimeout(setTimeout(() => {
                let newPastWords = pastWords;
                newPastWords.push(currentWord);
                setPastWords(newPastWords);
                console.log(pastWords);

                let word = novelTextWordArrays[index];
                setCurrentWord(word);
                setIndex(index + 1);
                setDelay(baseDelay + punctuationDelaySystem.addPunctuationDelay(word));
                
            }, delay));
        } else {
            clearTimeout(feedrTimeout);
        }
    }

    useEffect(() => {
        updateFeedr();
    }, [index, delay, novelTextWordArrays,]);

    return (
        <div className="FeedR">
            <div className="feed-reel">
                <div className="past-feeds">
                    <ul>
                        {pastWords && pastWords.map(word => <li>{word}</li>)}
                    </ul>
                </div>
                <h2 className='feedr-reel'>{currentWord}</h2>
            </div>
            <button id='start-feedr-btn' style={ isFeeding ? { transform: 'rotateZ(90deg)' } : { transform: 'rotateZ(0deg)' } } onClick={() => loadWords()}>{ isFeeding ?  '=' : '>' }</button>
        </div>
    );
}

export default FeedR;

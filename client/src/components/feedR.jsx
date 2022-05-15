import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedR.css';

import FeedReel from './feedReel';
import FeedrControls from './feedrControls';
import InputForm from './inputForm';

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
    publicAPIs.addWordLengthDelay = (baseDelay, word) => {
        return word.length * baseDelay;
    }

    return publicAPIs;
})();

function FeedR() {
    const baseDelay = 350;
    const baseWordDelay = 35;

    const [novelTextWordArrays, setNovelTextWordArrays] = useState([]);
    const [currentWord, setCurrentWord] = useState('');
    const [pastWords, setPastWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(baseDelay);
    const [feedrTimeout, setFeedrTimeout] = useState(null);
    const [isFeeding, setIsFeeding] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [areWordsLoaded, setAreWordsLoaded] = useState(false);
    const [url, setUrl] = useState('');

    const pastFeed = document.querySelector('.past-feeds');

    const startFeed = async () => {
        if (isReset) {
            setIndex(0);
            setPastWords([]);
            setCurrentWord('');
            setIsReset(false);
            setAreWordsLoaded(false);
        }
        // const backupUrl = 'https://lightnovelreader.org/historys-strongest-senior-brother/chapter-1';

        let response = await axios.get(`/retrieve?url=${url}`);

        setNovelTextWordArrays(response.data.wordArr);

        setIsFeeding(true);
        setAreWordsLoaded(true);
    }
    const pauseFeed = () => {
        if (areWordsLoaded) {
            setIsFeeding(false);
        }
    }
    const resumeFeed = () => {
        if (areWordsLoaded) {
            setIsFeeding(true);
        }
    }

    const updateFeedr = () => {
        if (isFeeding) {
            pastFeed
                && pastFeed.scrollBy({
                    top: 1000,
                    left: 0,
                    behavior: 'smooth'
                });

            clearTimeout(feedrTimeout);
            setFeedrTimeout(setTimeout(() => {
                let newPastWords = pastWords;
                newPastWords.push(currentWord);
                setPastWords(newPastWords);

                let word = novelTextWordArrays[index];

                setCurrentWord(word);

                setIndex(index + 1);
                setDelay(baseDelay + punctuationDelaySystem.addPunctuationDelay(word) + punctuationDelaySystem.addWordLengthDelay(baseWordDelay, word));
            }, delay));
        } else {
            clearTimeout(feedrTimeout);
        }
    }

    useEffect(() => {
        updateFeedr();
    }, [index, delay, novelTextWordArrays]);

    return (
        <div className="FeedR">
            <InputForm url={url} setUrl={setUrl} isFeeding={isFeeding} />
            <FeedReel currentWord={currentWord} pastWords={pastWords} />
            <FeedrControls
                startFeed={ startFeed }
                pauseFeed={ pauseFeed }
                resumeFeed={ resumeFeed }
                resetFeed={() => {
                    setIsReset(true);
                    startFeed();
                }} 
                isFeeding={isFeeding} />
        </div>
    );
}

export default FeedR;

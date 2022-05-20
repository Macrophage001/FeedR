import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './feedR.css';

import FeedReel from './feedReel';
import FeedrControls from './feedrControls';
import FeedROptionsMenu from './feedROptionsMenu';
import { Inputs, InputTypeSelection } from './inputs';

const punctuationDelaySystem = (() => {
    let publicAPIs = {};

    let delayMapping = {
        '.': 500,
        ',': 300
    }

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

    const baseFontFamilies = [
        `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        `'Courier New', Courier, monospace`,
        `'Times New Roman', Times, serif`,
        `Cambria, Cochin, Georgia, Times, 'Times New Roman', serif`
    ];

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
    const [file, setFile] = useState(null);
    const [isOptionsEnabled, setIsOptionsEnabled] = useState(false);
    const [text, setText] = useState('');

    const [isPastFeedEnabled, setIsPastFeedEnabled] = useState(true)
    const [inputType, setInputType] = useState(0);

    const root = document.querySelector(':root');
    const pastFeed = useRef(null);
    const radioButtons = useRef([]);

    const startFeed = async (inputType) => {
        inputType = Math.floor(inputType);

        console.log('Input Type: ', inputType, typeof inputType);
        if (isReset) {
            setIndex(0);
            setPastWords([]);
            setCurrentWord('');
            setIsReset(false);
            setAreWordsLoaded(false);
        }
        // const backupUrl = 'https://lightnovelreader.org/historys-strongest-senior-brother/chapter-1';
        let response;
        switch (inputType) {
            case 0:
                console.log('POSTING RETRIEVE SITE REQUEST!');
                response = await axios.get(`/retrieve?url=${url}`);
                break;
            case 1:
                console.log('POSTING RETRIEVE FILE REQUEST!');

                const data = new FormData();
                data.append('file', file);
                console.warn(file);

                response = await axios.post(`/retrieve-file`, data);
                break;
            case 2:
                console.log('POSTING RETRIEVE TEXT REQUEST!');
                console.log('TEXT: ', text);

                response = await axios.post('/retrieve-text', { text });
                break;
            default:
                console.error('Invalid request!');
                break;
        }

        console.log(response.data.wordArr);
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

    const updateFeedr = useCallback(() => {
        if (isFeeding) {
            pastFeed.current?.scrollBy({
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
        }
    }, [isFeeding, currentWord]);

    useEffect(() => {
        updateFeedr();
    }, [updateFeedr]);

    const updateRadioButtons = (index) => {
        for (let i = 0; i < radioButtons.current.length; i++) {
            let btn = radioButtons.current[i];
            if (i === index) {
                if (!btn.classList.contains('btn-selected'))
                    btn.classList.add('btn-selected');
            } else {
                btn.classList.remove('btn-selected');
            }
        }
    }

    const setFontSize = (fontSize) => root.style.setProperty('--feedr-font-size', `${fontSize}px`);

    const setFontFamily = (index) => {
        root.style.setProperty('--feedr-font-family', baseFontFamilies[index]);
        updateRadioButtons(index);
    }

    const toggleOptionsMenu = () => setIsOptionsEnabled(!isOptionsEnabled);

    return (
        <>
            <div className="FeedR">
                <div className="hamburger" onClick={toggleOptionsMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>

                <Inputs
                    index={inputType}
                    url={url}
                    setUrl={setUrl}
                    isFeeding={isFeeding}
                    setFile={setFile}
                    text={text}
                    setText={setText}
                    startFeed={startFeed} />

                <InputTypeSelection setInputType={setInputType} isFeeding={isFeeding} />

                <FeedReel isPastFeedEnabled={isPastFeedEnabled} currentWord={currentWord} pastWords={pastWords} pastFeedRef={pastFeed} />

                <FeedrControls
                    inputType={inputType}
                    startFeed={startFeed}
                    pauseFeed={pauseFeed}
                    resumeFeed={resumeFeed}
                    resetFeed={() => {
                        setIsReset(true);
                        startFeed();
                    }}
                    isFeeding={isFeeding}
                    areWordsLoaded={areWordsLoaded} />
            </div>
            <FeedROptionsMenu
                    isOptionsEnabled={isOptionsEnabled}
                    isPastFeedEnabled={isPastFeedEnabled}

                    setIsPastFeedEnabled={setIsPastFeedEnabled}
                    setFontFamily={setFontFamily}
                    setFontSize={setFontSize}
                    radioButtonsRef={radioButtons} />
        </>
    );
}

export default FeedR;

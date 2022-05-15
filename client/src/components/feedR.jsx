import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedR.css';

import FeedReel from './feedReel';
import FeedrControls from './feedrControls';
import InputFormSite from './inputFormSite';
import InputFormFile from './inputFormFile';
import FeedROptionsMenu from './feedROptionsMenu';

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

    const root = document.querySelector(':root');
    const pastFeed = document.querySelector('.past-feeds');
    const radioButtons = document.querySelectorAll('.radio-btn');

    const startFeed = async (flag) => {
        if (isReset) {
            setIndex(0);
            setPastWords([]);
            setCurrentWord('');
            setIsReset(false);
            setAreWordsLoaded(false);
        }
        // const backupUrl = 'https://lightnovelreader.org/historys-strongest-senior-brother/chapter-1';

        let response = null;
        switch (flag) {
            case 0:
                response = await axios.get(`/retrieve?url=${url}`);
                break;
            case 1:
                response = await axios.post(`/retrieveFile`, { file });
                break;
            default:
                console.error('Invalid request!');
                break;
        }

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

    const setFontSize = (fontSize) => {
        root.style.setProperty('--feedr-font-size', `${fontSize}px`);
    }

    const updateRadioButtons = (index) => {
        for (let i = 0; i < radioButtons.length; i++) {
            let btn = radioButtons[i];
            if (i === index) {
                if (!btn.classList.contains('btn-selected'))
                    btn.classList.add('btn-selected');
            } else {
                btn.classList.remove('btn-selected');
            }
        }
    }
    const setFontFamily = (index) => {
        root.style.setProperty('--feedr-font-family', baseFontFamilies[index]);
        updateRadioButtons(index);
    }
    const toggleOptionsMenu = () => {
        setIsOptionsEnabled(!isOptionsEnabled);
    }

    useEffect(() => {
        updateFeedr();
    }, [index, delay, novelTextWordArrays]);

    return (
        <div className="FeedR">
            <div className="hamburger" onClick={ toggleOptionsMenu }>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <InputFormSite url={url} setUrl={setUrl} isFeeding={isFeeding} />
            {/* <InputFormFile setFile={setFile} onFileUploaded={() => startFeed(1)} /> */}
            <FeedReel currentWord={currentWord} pastWords={pastWords} />
            <FeedrControls
                startFeed={() => startFeed(0)}
                pauseFeed={pauseFeed}
                resetFeed={() => {
                    setIsReset(true);
                    startFeed();
                }}
                isFeeding={isFeeding} />
            <FeedROptionsMenu isOptionsEnabled={ isOptionsEnabled }  setFontFamily={ setFontFamily } setFontSize={ setFontSize } />
        </div>
    );
}

export default FeedR;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './feedR.css';

import FeedReel from './feedReel';
import FeedrControls from './feedrControls';
import InputFormSite from './inputFormSite';
import InputFormFile from './inputFormFile';

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

    const root = document.querySelector(':root');
    const pastFeed = document.querySelector('.past-feeds');
    const currentWordElement = document.querySelector('.current-word');

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

    useEffect(() => {
        updateFeedr();
    }, [index, delay, novelTextWordArrays]);

    return (
        <div className="FeedR">
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
            <div className="feedr-options-menu">
                <div className="feedr-font-size">
                    <div className="feedr-font-controls" onChange={ (e) => setFontSize(e.target.value) }>
                        <p>A<span>-</span></p>
                        <ul>
                            <li>
                                <input type="radio" name="font-size" value={14} />
                                <p>14</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={16} />
                                <p>16</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={18} />
                                <p>18</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={20} />
                                <p>20</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={22} />
                                <p>20</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={24} />
                                <p>22</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={26} />
                                <p>24</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={28} />
                                <p>26</p>
                            </li>
                            <li>
                                <input type="radio" name="font-size" value={28} />
                                <p>28</p>
                            </li>
                        </ul>
                        <p>A<span>+</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedR;

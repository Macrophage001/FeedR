import React, { useState } from 'react'
import { generateUUID } from '../utils/uuidGenerator';

const CurrentWord = (props) => <h2 className='current-word'>{props.word}</h2>

function FeedReel(props) {
    const { pastWords, currentWord, pastFeedRef, isPastFeedEnabled } = props;
    const [isMouseOver, setIsMouseOver] = useState(false);

    // console.log(isPastFeedEnabled);

    return (
        <div className="feed-reel">
            <div
                ref={pastFeedRef}
                onMouseOver={(e) => setIsMouseOver(true)}
                onMouseLeave={(e) => setIsMouseOver(false)}
                className={ `past-feeds ${isPastFeedEnabled ? 'smooth-visible-animation' : 'smooth-hidden-animation'}` }
                style={isMouseOver ? { overflowX: 'hidden', overflowY: 'scroll' } : { overflow: 'hidden' }}>
                <ul>
                    {pastWords?.map((word, i) => <li key={ generateUUID(`${i}:${word}`) } >{word}</li>)}
                </ul>
            </div>
            <CurrentWord word={currentWord} />
        </div>
    )
}

export default FeedReel;
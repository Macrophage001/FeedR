import React, { useState } from 'react'

const CurrentWord = (props) => <h2 className='current-word'>{ props.word }</h2>

function FeedReel(props) {
    const { pastWords, currentWord, pastFeedRef } = props;
    const [ isMouseOver, setIsMouseOver ] = useState(false);

    return (
        <div className="feed-reel">
            <div 
                ref={pastFeedRef}
                onMouseOver={ (e) => setIsMouseOver(true) }
                onMouseLeave={ (e) => setIsMouseOver(false) }
                className="past-feeds" 
                style={ isMouseOver ? { overflowX: 'hidden', overflowY: 'scroll' } : { overflow: 'hidden' } }>
                <ul>
                    {pastWords && pastWords.map(word => <li>{word}</li>)}
                </ul>
            </div>
            <CurrentWord word={ currentWord }/>
        </div>
    )
}

export default FeedReel;
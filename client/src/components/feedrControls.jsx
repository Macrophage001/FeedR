import React from 'react'

function FeedrControls(props) {
    const { inputType, startFeed, pauseFeed, resumeFeed, isFeeding, areWordsLoaded, resetFeed } = props;

    return (
        <div className="feedr-controls">
            <button
                id='feedr-btn'
                style={isFeeding ? { transform: 'rotateZ(90deg)' } : { transform: 'rotateZ(0deg)' }}
                onClick={ isFeeding ? pauseFeed : () => startFeed(inputType) }>
                    {
                        isFeeding 
                            ? <img src="./assets/pause-button.png" alt="pause" style={{width: '2rem', height: '2rem'}}/> 
                            : <img src="./assets/play.png" alt="play" style={{width: '2rem', height: '2rem'}} />
                    }
                </button>
            {/* <button 
                id='feedr-btn' 
                style={{ display: 'none' }} 
                className={isFeeding ? 'smooth-visible-animation' : 'smooth-hidden-animation'} 
                onClick={resetFeed}>
                    
            </button> */}
        </div>
    )
}

export default FeedrControls
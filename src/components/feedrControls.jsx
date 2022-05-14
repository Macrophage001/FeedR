import React from 'react'

function FeedrControls(props) {
    const { startFeed, pauseFeed, resumeFeed, isFeeding, resetFeed } = props;

    return (
        <div className="feedr-controls">
            <button
                id='feedr-btn'
                style={isFeeding ? { transform: 'rotateZ(90deg)' } : { transform: 'rotateZ(0deg)' }}
                onClick={ isFeeding ? pauseFeed : startFeed }>{isFeeding ? '=' : '>'}</button>
            <button id='feedr-btn' style={ { display: 'none' } }  className={isFeeding ? 'smooth-visible-animation' : 'smooth-hidden-animation'} onClick={resetFeed}>&#10226;</button>
        </div>
    )
}

export default FeedrControls
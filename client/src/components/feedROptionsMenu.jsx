import React, { useRef } from 'react'

import '../styles/feedROptions.css'

const CheckBox = ({ className, checked, imgs, onChange }) => (
    <img
        className={className}
        src={checked ? imgs.checkedImg : imgs.uncheckedImg}
        alt={checked ? 'Checked' : 'Unchecked'}
        onClick={onChange} />
)

const OptionFontFamily = (props) => {
    const { setFontFamily, radioButtonsRef } = props;

    return (
        <div className="feedr-font-family">
            <ul>
                <li>
                    <button ref={element => radioButtonsRef.current[0] = element} className='radio-btn' onClick={(e) => setFontFamily(0)} >Segoe</button>
                </li>
                <li>
                    <button ref={element => radioButtonsRef.current[1] = element} className='radio-btn' onClick={(e) => setFontFamily(1)} >Courier</button>
                </li>
                <li>
                    <button ref={element => radioButtonsRef.current[2] = element} className='radio-btn' onClick={(e) => setFontFamily(2)} >Times</button>
                </li>
                <li>
                    <button ref={element => radioButtonsRef.current[3] = element} className='radio-btn' onClick={(e) => setFontFamily(3)} >Cambria</button>
                </li>
            </ul>
        </div>
    )
}
const OptionFontSize = (props) => {
    const { setFontSize } = props;

    return (
        <div className="feedr-font-size">
            <div className="feedr-font-controls" onChange={(e) => setFontSize(e.target.value)}>
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
    )
}
const ToggleOptions = ({ isPastFeedEnabled, handleToggleOption_isPastFeedEnabled }) => (
    <div className="feedr-toggle-options">
        <ul>
            <li>
                <CheckBox
                    className='feedr-toggle-option'
                    checked={isPastFeedEnabled}
                    onChange={handleToggleOption_isPastFeedEnabled}
                    imgs={{ checkedImg: './assets/options/historyEnabled.png', uncheckedImg: './assets/options/historyDisabled.png' }} />
            </li>
        </ul>
    </div>
)
const OptionWordSpeed = () => {
    const dropdownRef = useRef(null);
    const buttonRefs = useRef([]);

    const toggleDropdown = () => {
        dropdownRef.current.classList.toggle('show');
    }

    const setWordSpeed = (index) => {

    }

    return (
        <div className="feedr-word-speed">
            <div className="feedr-font-controls" onChange={(e) => setWordSpeed(e.target.value)}>
                <div className="speedometer-icon"><p>A...</p><img src='./assets/options/speedometerSlow.png' alt='word-speed-slow' /></div>
                <ul>
                    <li>
                        <input type="radio" name="word-speed" value={1} />
                        <p>1</p>
                    </li>
                    <li>
                        <input type="radio" name="word-speed" value={1.1} />
                        <p>1.1</p>
                    </li>
                    <li>
                        <input type="radio" name="word-speed" value={1.2} />
                        <p>1.2</p>
                    </li>
                    <li>
                        <input type="radio" name="word-speed" value={1.3} />
                        <p>1.3</p>
                    </li>
                    <li>
                        <input type="radio" name="word-speed" value={1.4} />
                        <p>1.4</p>
                    </li>
                </ul>
                <div className="speedometer-icon"><p>ABC...</p><img src='./assets/options/speedometerFast.png' alt='word-speed-fast' /></div>
            </div>
        </div>
    )
}

function FeedROptionsMenu(props) {
    const {
        setFontFamily,
        setFontSize,
        isOptionsEnabled,
        isPastFeedEnabled,
        setIsPastFeedEnabled,
        radioButtonsRef,
        setWordSpeed
    } = props;

    const handleToggleOption_isPastFeedEnabled = () => {
        setIsPastFeedEnabled(!isPastFeedEnabled);
    }

    return (
        <div className={`feedr-options-menu ${isOptionsEnabled ? 'show-options-menu-animation' : 'hide-options-menu-animation'}`}>
            <OptionFontFamily setFontFamily={setFontFamily} radioButtonsRef={radioButtonsRef} />
            <OptionFontSize setFontSize={setFontSize} />
            <OptionWordSpeed setWordSpeed={setWordSpeed} />
            <ToggleOptions isPastFeedEnabled={isPastFeedEnabled} handleToggleOption_isPastFeedEnabled={handleToggleOption_isPastFeedEnabled} />
        </div>
    )
}

export default FeedROptionsMenu
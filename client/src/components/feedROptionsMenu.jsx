import React from 'react'

const OptionFontFamily = (props) => {
    const { setFontFamily } = props;

    return (
        <div className="feedr-font-family">
            <ul>
                <li>
                    <button className='radio-btn' onClick={(e) => setFontFamily(0)} >Segoe</button>
                </li>
                <li>
                    <button className='radio-btn' onClick={(e) => setFontFamily(1)} >Courier</button>
                </li>
                <li>
                    <button className='radio-btn' onClick={(e) => setFontFamily(2)} >Times</button>
                </li>
                <li>
                    <button className='radio-btn' onClick={(e) => setFontFamily(3)} >Cambria</button>
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

function FeedROptionsMenu(props) {
    const { setFontFamily, setFontSize, isOptionsEnabled } = props;

    return (
        <div className={ `feedr-options-menu ${isOptionsEnabled ? 'show-options-menu-animation' : 'hide-options-menu-animation'}` }>
            <OptionFontFamily setFontFamily={setFontFamily} />
            <OptionFontSize setFontSize={ setFontSize } />
        </div>
    )
}

export default FeedROptionsMenu
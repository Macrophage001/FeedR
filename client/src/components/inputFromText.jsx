import React from 'react'

function InputFormText(props) {
    const { isFeeding, text, setText } = props;

    return (
        <form className={ `feedr-input ${isFeeding ? 'smooth-hidden-animation' : 'smooth-visible-animation'}` }>
            <textarea id='url-textbox' value={text} placeholder='...' onChange={(e) => setText(e.target.value)} />
        </form>
    )
}

export default InputFormText;
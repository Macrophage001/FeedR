import React from 'react'

function InputForm(props) {
    const { isFeeding, url, setUrl } = props;

    return (
        <form className={isFeeding ? 'smooth-hidden' : ''}>
            <input id='url-textbox' type="text" value={url} placeholder='http://...' onChange={(e) => setUrl(e.target.value)} />
        </form>
    )
}

export default InputForm
import React from 'react'

function InputFormSite(props) {
    const { isFeeding, url, setUrl } = props;
    return (
        <form className='feedr-input'>
            <input id='url-textbox' type="text" value={url} placeholder='http://...' onChange={(e) => setUrl(e.target.value)} />
        </form>
    )
}

export default InputFormSite
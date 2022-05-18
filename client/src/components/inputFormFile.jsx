import React from 'react'

function InputFormFile(props) {
    const { isFeeding, handleFileSelect, startFeed } = props;

    return (
        <form className='feedr-input feedr-file'>
            <input id='url-textbox' type="file" onChange={handleFileSelect} />
        </form>
    )
}

export default InputFormFile
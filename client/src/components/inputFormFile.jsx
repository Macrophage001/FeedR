import React from 'react'

function InputFormFile(props) {
    const { isFeeding, handleFileSelect, startFeed } = props;

    return (
        <form onSubmit={ (e) => {
            e.preventDefault();
            startFeed(1);
        } } className={ `feedr-input feedr-file ${isFeeding ? 'smooth-hidden-animation' : 'smooth-visible-animation'}` }>
            <input id='url-textbox' type="file" onChange={handleFileSelect} />
            <button id='feedr-upload-btn'  type='submit'>Upload!</button>
        </form>
    )
}

export default InputFormFile
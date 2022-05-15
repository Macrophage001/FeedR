import React from 'react'

function InputFormFile(props) {
    const { isFeeding, setFile, onFileUploaded } = props;

    return (
        <form action='javascript:void(0);' className={`feedr-input feedr-file ${isFeeding ? 'smooth-hidden-animation' : ''}`}>
            <input id='url-textbox' type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button id='feedr-upload-btn'  onClick={ onFileUploaded }>Upload!</button>
        </form>
    )
}

export default InputFormFile
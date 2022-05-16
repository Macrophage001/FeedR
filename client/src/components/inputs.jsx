import React from 'react'
import InputFormSite from './inputFormSite';
import InputFormFile from './inputFormFile';
import InputFormText from './inputFromText';

export const Inputs = (props) => {
    const { index, url, setUrl, isFeeding, setFile, text, setText, startFeed } = props;

    return (
        <>
        {
            {
                0: <InputFormSite url={url} setUrl={setUrl} isFeeding={isFeeding} />,
                1: <InputFormFile handleFileSelect={ (e) => setFile(e.target.files[0]) } startFeed={startFeed} />,
                2: <InputFormText text={text} setText={setText} isFeeding={isFeeding} />
            }[index]
        }
        </>
    )
}

export const InputTypeSelection = (props) => {
    const { setInputType, isFeeding } = props;

    return (
        <div className={`feedr-input-area ${isFeeding ? 'smooth-hidden-animation' : ''}`} onChange={(e) => setInputType(e.target.value)}>
            <form className='feedr-input-selection'>
                <ul>
                    <li>
                        <input type="radio" name="input-type" value={0} />
                        <p>Site</p>
                    </li>
                    <li>
                        <input type="radio" name="input-type" value={1} />
                        <p>File</p>
                    </li>
                    <li>
                        <input type="radio" name="input-type" value={2} />
                        <p>Text</p>
                    </li>
                </ul>
            </form>
        </div>
    )
}
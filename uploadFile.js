import React from "react";
import { useState } from "react";

function ImportFile(props) {
    const [selectedFile, setSelectedFile] = useState({});
    const [isFileSelect, setIsFileSelect] = useState(false);

    const handleSubmit = (evt) => {

    };

    const handleInput = (evt) => {
        setSelectedFile(evt.target.files[0]);
        setIsFileSelect(true);
    }

    return (
        <div>
            <input type="file" name="file" onChange={handleInput} />
            {
                isFileSelect ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Please select a file to show details</p>
                )
            }
            <button onClick={evt => handleSubmit(evt)}>Submit</button>
        </div>
    )
}

export default ImportFile;
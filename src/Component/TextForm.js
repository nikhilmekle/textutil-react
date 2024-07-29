import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from './Alert'; // Adjust the import path based on your project structure

export default function TextUtils() {
    const [totalWords, setTotalWords] = useState(0);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [text, setText] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType , setAlertType]= useState('warning');

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); // Hide alert after 3 seconds
    };

    const upperCaseClick = () => {
        if (totalWords === 0) {
            showAlertMessage("Please enter some text!");
            setAlertType('warning');
        } else {
            let newText = text.toUpperCase();
            setText(newText);
        }
    };

    const lowerCaseClick = () => {
        if (totalWords === 0) {
            showAlertMessage("Please enter some text!");
            setAlertType('warning');
        } else {
            let newText = text.toLowerCase();
            setText(newText);
        }
    };

    const copyClick = () => {
        if (totalWords === 0) {
            showAlertMessage("Please enter some text!");
            setAlertType('warning');
        } else {
            navigator.clipboard.writeText(text);
            showAlertMessage("Text copied!");
            setAlertType('success ');
        }
    };

    const clearClick = () => {
        let newText = '';
        setText(newText);
        setTotalWords(0);
        setTotalCharacters(0);
        setReadingTime(0);
    };

    const handleOnChange = (event) => {
        let newText = event.target.value;
        setText(newText);
        setTotalWords(newText.trim().split(/\s+/).filter(word => word).length);
        setTotalCharacters(newText.length);
        setReadingTime((0.008 * newText.trim().split(/\s+/).filter(word => word).length).toFixed(2));
    };

    return (
        <div>   {showAlert && <Alert message={alertMessage} alertType={alertType }/>}
            <div className="container" style={{ height: "auto",width:'auto', marginTop: "70px", borderRadius: "10px", border: "1px solid black", padding:'10px 10px 30px 10px'}}>
                
                <div className="row" style={{ marginTop: "20px", display: "flex", alignItems: "center", gap:'50px'}}>
                    <div className="col-2">
                        <h6 style={{ textAlign: "center", fontWeight: "normal" }}>Total Words</h6>
                        <h2 id="totalWords" style={{ textAlign: "center" }}>{totalWords}</h2>
                    </div>
                    <div className="col-2">
                        <h6 style={{ textAlign: "center", fontWeight: "normal" }}>Total Characters</h6>
                        <h2 id="totalCharacters" style={{ textAlign: "center" }}>{totalCharacters}</h2>
                    </div>
                    <div className="col-2">
                        <h6 style={{ textAlign: "center", fontWeight: "normal" }}>Minutes for Reading</h6>
                        <h2 id="totalMinutes" style={{ textAlign: "center" }}>{readingTime}</h2>
                    </div>
                </div>
                <hr></hr>
                <div className="row" style={{gap:'50px'}}>
                    <div className="col-8">
                        <textarea
                            className="form-control"
                            id="textarea"
                            value={text}
                            onChange={handleOnChange}
                            placeholder='Type or paste your text'
                            style={{ backgroundColor: "rgb(255, 255, 255)", height: "380px", marginLeft: "20px", fontSize: "25px", border: "2px solid black" }}
                        ></textarea>
                    </div>
                    <div className="col-3" style={{backgroundColor:'black', display: "flex", flexDirection: "column", gap: "40px", width:'auto' , height:'auto', marginLeft:'30px'}}>
                        <button className="btn btn-primary" onClick={upperCaseClick} style={{ height: "50px" ,fontSize: "17px", fontWeight: "bold" , marginTop: "20px"}}>Convert To UpperCase</button>
                        <button className="btn btn-primary" onClick={lowerCaseClick} style={{ height: "50px", fontSize: "17px", fontWeight: "bold" }}>Convert To LowerCase</button>
                        <button className="btn btn-primary" onClick={copyClick} style={{ height: "50px", fontSize: "17px", fontWeight: "bold" }}>Copy</button>
                        <button className="btn btn-primary" onClick={clearClick} style={{ height: "50px", fontSize: "17px", fontWeight: "bold" }}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

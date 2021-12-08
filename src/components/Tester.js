import React from 'react'
import { useState, useEffect } from 'react';
import CustomParams from './CustomParams';



export default function Tester() {

    const [url, setUrl] = useState(""); // URL of api
    const [response, setResponse] = useState("Your Response will be shown here");// Response Container 
    const [method, setMethod] = useState("");// get current method (GET or POST)
    const [type, setType] = useState("");// get current type (JSON or Custom Params)
    const [jValue, setJvalue] = useState("");// get json value
    const [setParam, setSetParams] = useState("");



    // to type url
    const handleWriteUrl = (event) => {
        setUrl(event.target.value);
    }

    // to type response
    const handleWriteResponse = (event) => {
        setResponse(event.target.value);
    }

    // get value of method
    const handleChangeMethod = (event) => {
        setMethod(event.target.value);
        console.log(event.target.value);
    }

    // get value of type
    const handleChangeType = (event) => {
        setType(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "JSON") {
            // show jsonParam
            // hide customParam
            document.getElementById('jsonGroup').style.display = "block";
            document.getElementById('customGroup').style.display = "none";

        } else {
            // show customParam
            // hide jsonParam
            document.getElementById('customGroup').style.display = "block";
            document.getElementById('jsonGroup').style.display = "none";

        }
    }

    // get json value
    const handleJsonValue = (event) => {
        setJvalue(event.target.value);
    }

    // Prettify response
    const handlePrettierResponse = (text) => {
        // text = JSON.stringify(text);
        let regex = /[{[,]./g;
        console.log(text.match(regex).length);
        while (text.search(regex) !== -1) {
            let index = text.search(regex);
            let arr = text.split('');
            arr.splice(index + 1, 0, "\n", "\t");
            text = arr.join('');
        }
        //1.  "([\w ,:\d-\.\/\\\[\]+])+"

        // 154 "}"
        // Tester.js:76 217 "}"
        // Tester.js:76 280 "}"
        // Tester.js:76 343 "}"
        // Tester.js:76 406 "}"
        // Tester.js:76 469 "}"
        // Tester.js:76 532 "}"

        // closing bracket "}, ]" should have \n before
        let closingReg = /[^\n\t][\]}]/g;
        console.log(text.match(closingReg).length);
        console.log(text.search(closingReg));
        while (text.search(closingReg) !== -1) {
            let index = text.search(closingReg) + 1;
            console.log(index, text.charAt(index));
            let arr = text.split('');
            arr.splice(index, 0, "\n", "\t");
            text = arr.join('');
        }

        return text;
    }


    // fetch api
    const handleFetchBtn = () => {
        if (method === "GET") {
            setResponse("FETCHING YOUR DATA...");
            fetch(`${url}`, {
                "method": `${method}`
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(typeof data);
                    setResponse(handlePrettierResponse(data));
                });
        } else if (method === "POST" && type === "JSON") {
            setResponse("FETCHING YOUR DATA...");
            fetch(`${url}`, {
                method: 'POST',
                body: `${jValue}`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    setResponse(handlePrettierResponse(data));
                });
        } else if (method === "POST" && type === "Custom") {
            setResponse("FETCHING YOUR DATA...");
            let job = document.getElementById('paramValue').value;
            let value = document.getElementById('value').value;
            let data = {
                name: "Harsh",
                job: value
            }
            console.log(JSON.stringify(data));
            fetch(`${url}`, {
                method: 'POST',
                body: `${JSON.stringify(data)}`,
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    setResponse(handlePrettierResponse(data));
                });
        }

    }

    var counter = 1;
    // return all params
    const populateParams = (number) => {
        
    }

    



    return (
        <div className="container my-3 ">
            {/* Url */}
            <div className="container my-3">
                <h3>URl : </h3>
                <div className="mb-3">
                    <input type="text" className="form-control" id="url" onChange={handleWriteUrl} value={url} placeholder="Enter URL" />
                </div>
            </div>


            {/* Method */}
            <div className="container my-3">
                <h3>Select Method</h3>
                <div className="form-check mx-3">
                    <input className="form-check-input" type="radio" value="GET" onChange={handleChangeMethod} name="method" id="GET" />
                    GET
                </div>
                <div className="form-check mx-3">
                    <input className="form-check-input" type="radio" value="POST" onChange={handleChangeMethod} name="method" id="POST" />
                    POST
                </div>
            </div>

            {/* JSON or Custom Parameters "Type" */}
            <div className="container my-3">
                <h3>Data</h3>
                <div className="form-check mx-3">
                    <input className="form-check-input" type="radio" value="JSON" onChange={handleChangeType} name="dataType" id="JSON" />
                    JSON
                </div>
                <div className="form-check mx-3">
                    <input className="form-check-input" type="radio" value="Custom" onChange={handleChangeType} name="dataType" id="Custom" />
                    Custom Parameters
                </div>
            </div>

            {/* a div to get parameters of api */}
            <div className="container my-3">

                {/* for JSON */}
                <div className="container" id="jsonGroup" style={{ "display": "none" }}>
                    <textarea className="form-control" id="jsonParam" spellCheck="false" rows="5" value={jValue} onChange={handleJsonValue} style={{ "backgroundColor": "#282c34", "color": "#ed8c85" }}></textarea>
                </div>

                {/* for Custom Params */}
                <div className="container" id="customGroup" style={{ "display": "none" }}>
                    {populateParams()}
                </div>


            </div>

            {/* Fetch Button */}
            <div className="container">
                <button className="btn btn-primary" onClick={handleFetchBtn}>Send</button>
            </div>

            {/* Response Container */}
            <div className="container">
                <div className="my-5">
                    <h2>Result</h2>
                    <textarea className="form-control" spellCheck="false" id="responseContainer" onChange={handleWriteResponse} value={response} rows="20" cols="20" style={{ "backgroundColor": "#282c34", "color": "#ed8c85", "fontSize": "20px" }}></textarea>
                </div>
            </div>
        </div>
    )
}

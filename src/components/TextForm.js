import React, { useState } from 'react'


export default function TextForm(props) {
    // Uppercase
    const handleUpClick = () => {
        // console.log('Upper case was clicked');
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Convert to UpperCase", "success");
    };

    // to write 
    const handleOnChange = (event) => {
        // console.log('You changed the textarea');
        setText(event.target.value);
    };

    // to change bootstrap code to jsx *** for => htmlFor, style="width: 18rem" => style={{width: "18rem"}}
    const handleHtmlToReactJsxClick = () => {
        let code = text;

        // class => className, tabindex => tabIndex
        // **** for class to className
        let regex = /class=/;
        while (code.search(regex) !== -1) {
            // console.log(code.search(regex));
            code = code.replace(regex, "className=");
        }

        // tabindex => tabIndex
        let tab = /tabindex=/;
        while (code.search(tab) !== -1) {
            // console.log(code.search(tab));
            code = code.replace(tab, "tabIndex=");
        }

        // href="#" => href="/"
        let slash = /href="#"/;
        while (code.search(slash) !== -1) {
            // console.log(code.search(slash));
            code = code.replace(slash, 'href="/"');
        }


        //    closing singular tags
        // <img> => <img/>
        // <hr> => <hr/>
        let input = /<([inputhrbmg])+ ([ \w"=\-@#.\n\t>])+>/gi;
        // get the index of first character of the matched regex and puts " /" before ">".
        while (code.search(input) !== -1) {
            let index = code.search(input);
            while (code.charAt(index) !== '>') {
                // console.log(index, code.charAt(index));
                index++;
            }
            // console.log(index);
            let arrOfStr = code.split('');
            arrOfStr.splice(index, 0, ' ', '/');
            code = arrOfStr.join('');
        }

        // to remove "/" from p tag. It is an error of the "input" regex.
        let para = /<p ([ \w=\-"'@\n\t])+\/>/gi;
        while (code.search(para) !== -1) {
            let index = code.search(para);
            while (code.charAt(index) !== '/') {
                // console.log(index, code.charAt(index));
                index++;
            }
            let arrOfStr = code.split('');
            arrOfStr.splice(index, 1);
            code = arrOfStr.join('');
        }
        setText(code);
    };

    // LowerCase
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Convert to LowerCase", "success");
    };

    // clear
    const handleClearClick = () => {
        let newText = "";
        setText(newText)
    }

    // copy
    const handleCopyClick = () => {
        let textUtils = document.getElementById('myBox');
        textUtils.select();
        document.execCommand('copy');
    }

    // for word
    const regex = /([a-z.&,])+/gi;
    const decide = () => {
        if (text === "") {
            return 0;
        }

        return text.match(regex).length;
    }

    // to capitalize first char of first word, after '.' and after enter.
    const handleCapitalizeClick = () => {
        const regex = /\.([ \n\t])+[a-z]/g;
        let code = text;
        while(code.search(regex) !== -1){
            let index = code.search(regex);
            console.log(code.charAt(index));
            while(code.charAt(index) !== /a-z/){
                index++;
            }
            let arrOfStr = code.split('');
            arrOfStr.splice(index, 1, code.charAt(index).toUpperCase);
            code = arrOfStr.join('');

        }

    }


    const [text, setText] = useState('');
    // text = "New Text";  // wrong way to change the state
    // setText("New Text"); // right way to change the state
    return (
        <>
            <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h2>{props.heading}</h2>
                <div className="mb-3">
                    <textarea className="form-control" id="myBox" rows="8" value={text} style={{ backgroundColor: props.mode === "dark" ? "#282c34" : "white", color: props.mode === "dark" ? "#bc9caf" : "black" }} onChange={handleOnChange} spellCheck="false"></textarea>
                </div>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleHtmlToReactJsxClick}>Convert Boostrap Html to React JSX</button>
                <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear</button>
                <button className="btn btn-primary mx-2" onClick={handleCapitalizeClick}>Capitalize</button>
                <button className="btn btn-primary mx-2" data-clipboard-target="#myBox" id="btnCopy" onClick={handleCopyClick}>Copy to Clipboard</button>

            </div>
            <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h2>Your text Summary</h2>
                <p>{decide()} words and {text.length} Characters</p>
                <p>{0.008 * text.split(" ").length} Minutes Read</p>
                <h3>Preview</h3>
                <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here."}</p>
            </div>
        </>
    )
}

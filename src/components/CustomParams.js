import React from 'react'

// number
// populateParams
export default function CustomParams(props) {

    return (
        <>
            <div className="input-group my-3 d-flex align-items-center" >
                <div className="form-check" >
                    <input className="form-check-input" type="checkbox" id={`validParam${props.number}`} />
                </div>
                <input type="text" aria-label="Parameter"  className="form-control mx-3 " id={`paramValue${props.number}`} placeholder="Parameter" />
                <input type="text" aria-label="Value" className="form-control mx-3 " id={`value${props.number}`} placeholder="value" />
            </div>
        </>
    )
}

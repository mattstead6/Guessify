import React from "react";

function Instructions(){
    return(
        <>

                <div className="modal" id="modal">
                    <div className ="modal-header"></div>
                    <div className = "title">Please Read</div>
                    <button className="close-button">CLOSE</button>
                    <div className="modal-body">These are the instructions</div>
                </div>
                <div id="overlay"></div>
    </>
    )}

export default Instructions;

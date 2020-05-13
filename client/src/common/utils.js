import React from 'react';

export const Utils = {
    drawSpinner: () => {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100px"}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    },
}
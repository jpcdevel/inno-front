import React from 'react'
import MoonLoader from "react-spinners/MoonLoader";

function Loader({loading, color}) {
    return (
        <>
            <div className="loader">
                <MoonLoader
                    loading={loading}
                    color={color}
                    size={20}
                />
            </div>
        </>
    )
}

export default Loader;
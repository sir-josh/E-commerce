import React from 'react';

import './spinner-loader.styles.scss';

const SpinnerLoader = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading ? (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    ):(
        <WrappedComponent {...otherProps} />
    );
};

export default SpinnerLoader;
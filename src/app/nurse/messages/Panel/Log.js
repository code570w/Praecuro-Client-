import React from 'react';

const Log = () => {

    const notice = () => {
        return (
            <div className="notice-text">
                Call Log<br/>This section is under construction.
            </div>
        );
    };

    return (
        <div className="list">
            {notice()}
        </div>
    );
};

export default Log;

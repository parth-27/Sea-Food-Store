import React from 'react';
import PropTypes from 'prop-types';    

// stateless function in React.
const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
                </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
            {/* fetching data using props. props is an object */}
        </header>
    )
}

Header.propTypes = {
    tagline:PropTypes.string.isRequired
}

export default Header;
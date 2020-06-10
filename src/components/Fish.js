import React from 'react';
import {formatPrice} from '../helpers';
import PropTypes from 'prop-types';    

class Fish extends React.Component{
    render(){
            const {details} = this.props;
            const isAvailable = details.status === 'available';
            const buttonText = isAvailable? 'Add to Order':'Sold Out';
        return(
            // passing name with the help of variable.
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                {details.name}
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">
                        {formatPrice(details.price)}
                    </span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

Fish.protoTypes = {
    details: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    addToOrder: PropTypes.func.isRequired
}

export default Fish;
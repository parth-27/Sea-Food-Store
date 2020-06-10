import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';    


// creating a component.
// props to pass data from one component to other component and state to hold the data.
export default class StorePicker extends React.Component{

    // constructor(){
    //     super();    // runs the React.Component first than StorePicker.
    //     this.goToStore = this.goToStore.bind(this);     // we have to bind every single function other than the render. Because only render is bind and not other by default.
    // }

    goToStore(event){
        // first grab the text from the box.
        event.preventDefault();
        const storeId = this.storeInput.value;
        console.log(this.storeInput.value);   

        // second do the transition from / to /store/..
        this.props.history.push(`/store/${storeId}`);
    }


    // render method are bound to the component while other method like goToStore doesn't bound to the component.
	render(){
        //return <p>Hello World</p>;
        
        // creating paragraph tag with class Name Testing and text React is Awesome.
        //return React.createElement('p',{className:'Testing'},'React is Awesome');

        return(
            // JSX will return only one element so make it a parent element.
            <form className = "store-selector" onSubmit={(e) => this.goToStore(e)}>    
                {/* we can bind onSubmit event by this.goToStore.bind(this) or with the help of constructor. */}

                {/* comment in jsx */}
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
                <button type="submit">Visit Store</button>
            </form>
        )   
    }

}

StorePicker.contextType={
    router: PropTypes.object
}


// getting our router OR surface our router.
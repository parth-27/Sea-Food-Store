import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';

class Inventory extends React.Component {

    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.renderLogin = this.renderLogin.bind(this);
        // this.authenticate = this.authenticate.bind(this);
        // this.authHandler = this.authHandler.bind(this);
        // this.state = {
        //     uid:null,
        //     owner:null
        // }
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];

        const updatedFish = {
            ...fish
            , [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>

                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
                <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available" >Fresh!</option>
                    <option value="unavailable" >Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}>
                </textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    // authenticate(provider){
    //     console.log(`Trying to login with ${provider}`);
    //     base.AuthWithOAuthPopup(provider,this.authHandler);
    // }

    // authHandler(err,authData){
    //     console.log(authData);
    // }

    // renderLogin() {
    //     return (
    //         <nav className="login">
    //             <h2>Inventory</h2>
    //             <p>Sign in to manage your store's inventory</p>
    //             <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
    //             <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
    //             <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
    //         </nav>
    //     )
    // }

    render() {
        const logout = <button>Log Out!!</button>


        // check if they are not logged in at all
        // if (!this.state.uid) {
        //     return <div>{this.renderLogin()}</div>
        // }

        // check if they are the owner of the current store.
        // if(this.state.uid !== this.state.owner){
        //     return(
        //         <div>
        //             <p>Sorry you are not the owner of the Store</p>
        //             {logout}
        //         </div>
        //     )
        // }    


        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>load Sample Fishes</button>
            </div>

        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired
};

export default Inventory;
import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import firebase from 'firebase';

class Inventory extends React.Component {

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }


    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid:null,
            owner:null
        }
    }

    // life cycle hooks.
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
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

    
    authHandler = async authData => {
        // 1 .Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };

    authenticate = provider => {
        if (provider === 'github') {
            const authProvider = new firebase.auth.GithubAuthProvider();    
            firebase
                .auth()
                .signInWithPopup(authProvider)
                .then(this.authHandler);
        }
        else if (provider === 'facebook') {
            const authProvider = new firebase.auth.FacebookAuthProvider();
            firebase
                .auth()
                .signInWithPopup(authProvider)
                .then(this.authHandler);
        }
        else
        {
            const authProvider = new firebase.auth.TwitterAuthProvider();
            firebase
                .auth()
                .signInWithPopup(authProvider)
                .then(this.authHandler);
        }
    };

    
    // authenticate = (provider) => {
    //     console.log(`Trying to login with ${provider}`);
    //     console.log(this.props.storeId);
    //     if (provider === 'github') {
    //         var provider = new firebase.auth.GithubAuthProvider();

    //         provider.addScope('repo');

    //         firebase.auth().signInWithPopup(provider).then( (result) => {
    //             console.log(result);

    //             // grab the store info if the user has successfully authenticate.
    //             const storeRef = firebase.database().ref(this.props.storeId);

    //             // query the firebase once for the data
    //             storeRef.once('value', (snapshot) => {
    //                 const data = snapshot.val() || {};

    //                 // claim it as our own if there is no owner already.
    //                 if (!data.owner) {
    //                     storeRef.set({
    //                         owner: result.user.uid
    //                     });
    //                 }

    //                 this.setState({
    //                     uid: result.user.uid,
    //                     owner: data.owner || result.user.uid
    //                 })
    //             });

    //         }).catch(function (error) {
    //             console.log(error);
    //         });    
    //     }
    //     else if (provider === 'facebook') {
    //         var provider = new firebase.auth.FacebookAuthProvider();

    //         provider.addScope('user_birthday');

    //         firebase.auth().signInWithPopup(provider).then( (authData) => {
    //             console.log(authData);

    //             // grab the store info if the user has successfully authenticate.
    //             const storeRef = firebase.database().ref(this.props.storeId);

    //             // query the firebase once for the data
    //             storeRef.once('value', (snapshot) => {
    //                 const data = snapshot.val() || {};

    //                 // claim it as our own if there is no owner already.
    //                 if (!data.owner) {
    //                     storeRef.set({
    //                         owner: authData.user.uid
    //                     });
    //                 }

    //                 this.setState({
    //                     uid: authData.user.uid,
    //                     owner: data.owner || authData.user.uid
    //                 })
    //             });

    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    //     }
    //     else
    //     {
    //         var provider = new firebase.auth.TwitterAuthProvider();

    //         // here we have to use arrow functions because in normal functions storeId won't be accessible because of this keyword.
    //         firebase.auth().signInWithPopup(provider).then( (authData) => {
    //             console.log(authData);

    //             // grab the store info if the user has successfully authenticate.
    //             const storeRef = firebase.database().ref(this.props.storeId);

    //             // query the firebase once for the data
    //             storeRef.once('value', (snapshot) => {
    //                 const data = snapshot.val() || {};

    //                 // claim it as our own if there is no owner already.
    //                 if (!data.owner) {
    //                     storeRef.set({
    //                         owner: authData.user.uid
    //                     });
    //                 }

    //                 this.setState({
    //                     uid: authData.user.uid,
    //                     owner: data.owner || authData.user.uid
    //                 })
    //             });

    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    //     }

    //     //base.AuthWithOAuthPopup(provider,this.authHandler); 
        
    // }

    
    // logout method
    logout() {
        firebase.auth().signOut();
        this.setState({ uid: null });
    }


    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
            </nav>
        )
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!!</button>


        //check if they are not logged in at all
        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        // check if they are the owner of the current store.
        if(this.state.uid !== this.state.owner){
            return(
                <div>
                    <p>Sorry you are not the owner of the Store</p>
                    {logout}
                </div>
            )
        }    


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
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
};

export default Inventory;
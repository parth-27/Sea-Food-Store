import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from './../sample-fishes'; 
import Fish from './Fish';
import { object } from 'prop-types';
import base from '../base';
import PropTypes from 'prop-types';    

class App extends React.Component {
	
	constructor(){
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		// getinitial state.
		this.state = {
			fishes: {},		// we are syncing fishes to the firebase.
			order:{},	// we are not syncing order to the firebase. But we are syncing to the localStorage.

		}
	}
	
	componentWillMount(){
		// this run right before the app is render
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,{
			context:this,
			state: 'fishes'
		});

		// check if there is any order in localstorage.
		const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`);

		if (localStorageRef) {
			// update our APP componen's order state
			this.setState({
				order: JSON.parse(localStorageRef)		// first converting localStorageREf to object and than storing it.
			})
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps,nextState){
		localStorage.setItem(`order-${this.props.match.params.storeId}`,
		JSON.stringify(nextState.order));	// converting nextState.order to string using json method.
	}


	addFish(fish){
		// update our state. First take copy of the current state than update the state.
		const fishes = {...this.state.fishes};
		// add in our new fishes.
		const timestamp = Date.now();
		fishes[`fishes-${timestamp}`] = fish;


		// set state.
		this.setState({fishes:fishes})
	}

	loadSamples(){
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key){
		// take a copy of the state.
		const order = {...this.state.order};

		// update or add new number of fish ordered.
		order[key] = order[key] + 1 || 1; 

		// set state.
		this.setState({order:order});
	}

	updateFish(key,updatedFish)
	{
		const fishes = {...this.state.fishes}
		fishes[key] = updatedFish;
		this.setState({fishes});	// destructutring.
	}

	removeFish(key){
		const fishes = {...this.state.fishes};

		fishes[key] = null;		// we can't use delete becuase of the firebase.
		this.setState({fishes});
	}

	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];	// we can use delete because order is store in localstorage and not in firebase.
		this.setState({order});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Sea Food Market"/>
					<ul className="list-of-fishes">
						{/* For looping over something in react we need and array and use map method on it. */}
						{Object
						.keys(this.state.fishes)
						.map(key => <Fish key={key} index={key} details = {this.state.fishes[key]} addToOrder={this.addToOrder}
							params={this.props.match.params}
						/>)
						}
					</ul>
					{/* here we have made tagline as props which will be available to use in the components for fetching the data */}
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
				addFish={this.addFish} 
				loadSamples={this.loadSamples} 
				fishes={this.state.fishes}
				updateFish={this.updateFish}
				removeFish={this.removeFish}
				/>
			</div>
		)
	}
}

App.propTypes = {
	params : PropTypes.object.isRequired
}

export default App;
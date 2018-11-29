import React, { Component } from 'react';
import AddContribution from './addContribution';
import Contribution from './contribution';

class App extends Component {
	constructor(){
		super();
		this.state = {
			comic: Object,
			isLoaded: false,
			newestComicNumber: Number,
			comicNumber: null,
			contributions: [],
		}
	}
	getContributions = async () => {
		const contributions = await fetch(`/api/v1/contributions?comic=${this.state.comicNumber}`);
		const contributionsParsedJSON = await contributions.json();
		return contributionsParsedJSON
	}
	addContribution = async (contribution) => {
		try {
			await fetch('/api/v1/contributions', {
				method: 'POST',
				body: JSON.stringify(contribution),
				headers: {
				'Content-Type': 'application/json'
				},
			});
		} catch(err){
			return(err)
		}
		this.componentDidMount();
	}
	deleteContribution = async (id) => {
		fetch(`/api/v1/contributions/${id}`, {method: "DELETE"});
		this.componentDidMount();
	}
	updateContribution = async (contribution, id) => {
		try {
			await fetch(`/api/v1/contributions/${id}`, {
				method: 'PUT',
				body: JSON.stringify(contribution),
				headers: {
				'Content-Type': 'application/json'
				},
			});
		} catch(err){
			return(err)
		}
		this.componentDidMount();
	}
	generateChosenComic = async () => {
		try{
			const comic = await fetch(`https://xkcd.now.sh/${this.state.comicNumber}`);
			const parsedComic = await comic.json();
			return parsedComic;
		}catch(err){
			return err;
		}	
	}
	generateFirstComic = async () => {
		try{
			const comic = await fetch(`https://xkcd.now.sh`);
			const parsedComic = await comic.json();
			this.setState({
				...this.state,
				newestComicNumber: parsedComic.num,
				comicNumber: parsedComic.num
			})
			return parsedComic;
		}catch(err){
			return err;
		}	
	}
	async componentDidMount (){
		if(this.state.comicNumber){
			await this.generateChosenComic().then((comic) => {
				this.setState({
					...this.state,
					comic: comic,
					isLoaded: true,
				});
			})
			this.getContributions().then((contributions) => {
				if(contributions.data !== undefined){
					this.setState({contributions: contributions.data})	
				}
			}).catch((err) => {
				return(err);
			});	
		} else {
			await this.generateFirstComic().then((comic) => {
				this.setState({
					...this.state,
					comic: comic,
					isLoaded: true,
					comicNumber: comic.num
				});
			});
			this.getContributions().then((contributions) => {
				if(contributions.data !== undefined){
					this.setState({contributions: contributions.data})	
				}
			}).catch((err) => {
				return(err);
			});	
		}
	}
	chooseComic = async (e) => {
		e.preventDefault();
		let nextComic;
		if(e.currentTarget.id === "random"){
			nextComic = Math.ceil(Math.random()* this.state.newestComicNumber)
		} else if(e.currentTarget.id === "next"){
			nextComic = this.state.comicNumber + 1
		} else if(e.currentTarget.id === "previous"){
			nextComic = this.state.comicNumber - 1
		} else if(e.currentTarget.id === "select"){
			nextComic = parseInt(e.currentTarget.firstChild.value);
		}
		await this.setState({
			...this.state,
			isLoaded: false,
			comicNumber: nextComic,
			contributions: [],
		})
		this.componentDidMount();
	}
	render (){
		console.log(this.state);
		if (!this.state.isLoaded){
			return(
				<div>Loading...</div>
			)
		}else {
			return (
				<div className="App">
					<div id="Grid">
						<nav id="navbar" className="center">
							<button id="previous"onClick={this.chooseComic}>previous</button>
							<button id="random"onClick={this.chooseComic}>random</button>
							<button id="next"onClick={this.chooseComic}>next</button>
							<form action="3" id="select"onSubmit={this.chooseComic}>
								<input type="text" placeholder="find comic by number"/>
								<input type="submit" value="find" />
							</form>
						</nav>
						<div className="center" id="comic-display">
							<h1>Comic {this.state.comic.num}: {this.state.comic.title}</h1>
							<div className="comic-container">
								<img id="comic" className="center" src={this.state.comic.img} alt='i guess this has to be here'/>
							</div>
							
						</div>
						<div id="new-contribution">
							<AddContribution addContribution={this.addContribution} comicNumber={this.state.comicNumber}/>
						</div>
						<div id="explinations">
							<h2>Explanations</h2>
							{this.state.contributions.map((contribution, i) => {
								return (
									<div key={i}>
										<Contribution contribution={contribution} deleteContribution={this.deleteContribution} updateContribution={this.updateContribution}/>
									</div>	
								)	
							})}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default App;

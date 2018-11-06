import React, {Component} from 'react';

class Contribution extends Component{
    constructor(){
        super();
        this.state = {
            contribution: {
                comment: String,
                sources: [String], 
            },
            numberOfSources: 1,
            display: true,
        }
    }
    handleDelete = () => {
        this.props.deleteContribution(this.props.contribution._id);
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const comment = document.getElementById("comment")
        await this.setState({
            contribution: {
                comment: comment.value,
            }
        })
        const tempSourceArray = [];
        for(let i = 0; i < this.state.numberOfSources; i++){
            let addSource = document.getElementById(`source[${i}]`)
            tempSourceArray.push(addSource.value);
            addSource.remove();
        }
        await this.setState({
            contribution:{
                ...this.state.contribution,
                sources: tempSourceArray,
            },
            numberOfSources: 0,
            display: true,
        })
        this.props.updateContribution(this.state.contribution, this.props.contribution._id);   
        document.getElementById("new-contribution").reset();
    }
    addSource = async (e) => {
        e.preventDefault()
        let count = this.state.numberOfSources
        await this.setState({
            numberOfSources: count+= 1,
        })
        const newSource = document.createElement("input");
        newSource.id = `source[${this.state.numberOfSources - 1}]`;
        newSource.type = "url";
        const form = document.getElementById("new-contribution");
        const button = document.getElementById("additional-sources");
        form.insertBefore(newSource, button)
    }
    openEdit = (e) => {
        e.preventDefault();
        this.setState({
            display: false,
        })
    }
    render(){
        if(this.state.display){
            return(
               <div>
                    <p>{this.props.contribution.comment}</p>
                    {this.props.contribution.sources !== undefined?  
                        this.props.contribution.sources.map((source, i) => {
                            const shortenedURL = source.slice(8, 50);
                            return(
                                <div key={i}>
                                    <a href={source}>{shortenedURL}</a>
                                </div>  
                            )
                        }) : <div/>
                    }
                    <button onClick={this.openEdit}>Edit Contribution</button>
                    <button onClick={this.handleDelete}>Delete Contribution</button>
                </div> 
            )  
        } else {
            return (
                <form id="new-contribution" onSubmit={this.handleSubmit}>
                    explination/comment: <br/><textarea id="comment" name="comment" type="text" onChange={this.updateContribution}/><br/>
                    sources: <br/><input id="source[0]" type="url"/>
                    <button id="additional-sources"onClick={this.addSource}>add another source</button><br/>
                    <input type="submit"/>
                </form>  
            )
        } 
    }
}

export default Contribution;
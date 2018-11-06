import React, {Component} from 'react';

class AddContribution extends Component {
    constructor(){
        super();
        this.state = {
            contribution: {
                comic: Number,
                comment: String,
                sources: [String], 
            },
            numberOfSources: 1,
            
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const comment = document.getElementById("comment")
        await this.setState({
            contribution: {
                comic: this.props.comicNumber,
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
        })
        this.props.addContribution(this.state.contribution);   
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
    render(){
        return(
            <div>
                <h3>Add a Contribution</h3>
                <form id="new-contribution" onSubmit={this.handleSubmit}>
                    explination/comment: <br/><textarea id="comment" name="comment" type="text" onChange={this.updateContribution}/><br/>
                    sources: <br/><input id="source[0]" type="url"/>
                    <button id="additional-sources"onClick={this.addSource}>add another source</button><br/>
                    <input type="submit"/>
                </form> 
            </div>
            
        )
    }
}

export default AddContribution;
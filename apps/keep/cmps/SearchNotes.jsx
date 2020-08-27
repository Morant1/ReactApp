

export class SearchNotes extends React.Component {

    state = {
        value: ''
    }

    onFilter = ({target}) => {
        const {value} = target;
        this.setState({value},()=>{
            this.props.onSetFilter(this.state.value);
       })
       
    }


    render() {
        return (
            <React.Fragment>
                <input placeholder="Search notes" value={this.state.title}
                 onChange={(ev)=> {this.onFilter(ev)}}></input>
            </React.Fragment>
        )
    }
}



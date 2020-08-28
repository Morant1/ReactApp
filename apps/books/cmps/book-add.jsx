import BookAddResults from "./book-add-results.jsx"


export class BookAdd extends React.Component {
    
    state = {
        keyword: '',
    }

    onInputChange = (ev) => {
        const value = ev.target.value
        this.setState({keyword: value})
    }
    
    onAddBook = () => {
        this.props.whenChange()
        this.setState({keyword:''})
    }

    render() {
        return (
            <div className="google-search-container">
                <input name="search" value={this.state.keyword} className="google-search-input"  onChange={ this.onInputChange } placeholder="Search book"></input>
                <BookAddResults searchQuery={this.state.keyword} whenChange={this.onAddBook} />
            </div>
        )
    }
}

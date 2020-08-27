import { keepService } from '../keep/services/keepService.js';
import { DynamicCmp } from '../keep/cmps/DynamicCmp.jsx';
import { AddNotes } from '../keep/cmps/AddNotes.jsx';

export class KeepApp extends React.Component {

    state = {
        lists: [],
    
    }


    componentDidMount() {
        this.loadNotes()
    }
    
    loadNotes = () => {
        keepService.getNotes()
        .then ((lists)=>this.setState({lists}))
    }
    
    removeList = (listId) => {
        keepService.removeList(listId);
        this.loadNotes()
        

    }

    changeColor = (color,id) => {
        keepService.changeBgc(color,id);
        this.loadNotes()
    }

    render() {
        // const booksToShow = this.getBooksForDisplay();
        return (
            <div className="main-container">
            <AddNotes loadNotes={this.loadNotes}/>
            <div className="main-keep-container">
            {this.state.lists.map((list) => {
                    return <DynamicCmp key={list.id} list={list} removeList={this.removeList}
                    changeColor={this.changeColor}/>
                })}
            </div>
            </div>
        )
    }
}



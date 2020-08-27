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

    pinnedNote = (id,isPinned) => {
        let pinned = !isPinned;
        keepService.setPinned(id,pinned);
        this.loadNotes();

    }
    getListsForDisplay() {
        const lists = this.state.lists;
        return lists.sort(list => !list.isPinned ? 1 : -1)
    }

    render() {
        const listToShow = this.getListsForDisplay();
        return (
            <div className="main-container">
            <AddNotes loadNotes={this.loadNotes}/>
            <div className="main-keep-container">
            {listToShow.map((list) => {
                    return <DynamicCmp key={list.id} list={list} removeList={this.removeList}
                    changeColor={this.changeColor} loadNotes={this.loadNotes} pinnedNote={this.pinnedNote}/>
                })}
            </div>
            </div>
        )
    }
}



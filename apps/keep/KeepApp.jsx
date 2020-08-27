import { keepService } from '../keep/services/keepService.js';
import { DynamicCmp } from '../keep/cmps/DynamicCmp.jsx';
import { AddNotes } from '../keep/cmps/AddNotes.jsx';
import { SearchNotes } from '../keep/cmps/SearchNotes.jsx';
import eventBus from '../../services/event-bus-service.js'

export class KeepApp extends React.Component {

    state = {
        lists: [],
        filterBy:''
    
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
        eventBus.emit('notify', { msg: `Note deleted`, type: 'fail'})
        

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
        let sortedList;

        const lists = this.state.lists;
        sortedList =  lists.sort(list => !list.isPinned ? 1 : -1);
        if (!this.state.filterBy) {
            return sortedList
        } else {
             const filteredList = sortedList.filter(list => {
            if (list.info.txt) {
                    return list.info.txt.toLocaleUpperCase().includes(this.state.filterBy.toLocaleUpperCase())
            }
            
            if (list.info.todos) {
                let todos = list.info.todos.map(todo => todo.txt.toLocaleUpperCase());
                return todos.join(",").includes(this.state.filterBy.toLocaleUpperCase())
            }})

            return filteredList;
        }
    }
    
    onSetFilter = (filterBy) => {
        this.setState({filterBy});
     
    }

    render() {
        const listToShow = this.getListsForDisplay();
        return (
            <React.Fragment>
            <div className="search-container">
                <SearchNotes  filterBy={this.state.filterBy} onSetFilter={this.onSetFilter}/>
            </div>
            <div className="main-container">
            <AddNotes loadNotes={this.loadNotes}/>
            <div className="main-keep-container">
            {listToShow.map((list) => {
                    return <DynamicCmp key={list.id} list={list} removeList={this.removeList}
                    changeColor={this.changeColor} loadNotes={this.loadNotes} pinnedNote={this.pinnedNote}/>
                })}
            </div>
            </div>
            </React.Fragment>
        )
    }
}



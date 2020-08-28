import { keepService } from '../keep/services/keepService.js';
import { DynamicCmp } from '../keep/cmps/DynamicCmp.jsx';
import { AddNotes } from '../keep/cmps/AddNotes.jsx';
import {BusService}from '../../services/event-bus-service.js'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class KeepApp extends React.Component {

    state = {
        lists: [],
        filterBy:''
    
    }

    componentDidMount() {
        this.loadNotes()
        BusService.on('searchUpdated',this.onSetFilter)

    }
    
    loadNotes = () => {
        keepService.getNotes()
        .then ((lists)=>this.setState({lists}))
    }
    
    removeList = (listId) => {
        keepService.removeList(listId);
        this.loadNotes()
        BusService.emit('notify', { msg: `Note deleted`, type: 'fail'})
        

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
        sortedList =  lists.sort(list => !list.isPinned ? 1 : 0);
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
        const pinnedList = listToShow.filter(list=> list.isPinned);
        const unPinnedList = listToShow.filter(list=> !list.isPinned);
        
        
        return (
            <React.Fragment>
                <Router>
            <div className="main-container">
            <Route><AddNotes loadNotes={this.loadNotes} exact path="/keep/addNote" searchParams={this.props.location.search}/></Route>
            {pinnedList.length
            ?   
            <React.Fragment>        
            <div className="main-keep-container-pinned">
                {pinnedList.map((list) => {
                    return <DynamicCmp key={list.id} list={list} removeList={this.removeList}
                    changeColor={this.changeColor} loadNotes={this.loadNotes} pinnedNote={this.pinnedNote}/>
             })}
            
             </div>
              <div className="border-line"></div>
              </React.Fragment>  
             :null
             }        
            <div className="main-keep-container">
            {unPinnedList.map((list) => {
                    return <DynamicCmp key={list.id} list={list} removeList={this.removeList}
                    changeColor={this.changeColor} loadNotes={this.loadNotes} pinnedNote={this.pinnedNote}/>
                })}
            </div>
            </div>
            </Router>
            </React.Fragment>
        )
    }
}


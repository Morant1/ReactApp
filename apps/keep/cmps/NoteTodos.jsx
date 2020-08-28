import { utils } from '../../../services/utils.js';
import { ItemTodo } from '../cmps/ItemTodo.jsx';

export class NoteTodos extends React.Component {


    render() {
        return (
            <div className="note-content">
                <div className="type">
                <img src="apps\keep\assets\icons\thumbtack-solid.svg" className={`icon ${this.props.list.isPinned? 'pinned':''} `} 
                onClick={()=>{this.props.pinnedNote(this.props.list.id,this.props.list.isPinned)}}/>
                    <img className="icon" src="apps\keep\assets\icons\list-outline.svg" />
                </div>
                <ul>{this.props.list.info.todos.map((todo) => {
                    return <ItemTodo todo={todo} key={utils.makeId()}/>
                })}</ul>
            </div>
        )
    }
}

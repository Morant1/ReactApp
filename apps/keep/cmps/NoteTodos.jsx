import { utils } from '../services/utils.js';

export class NoteTodos extends React.Component {
    render() {
        return (
            <div className="note note-todos">
                <h3>{this.props.list.info.label}</h3>
        <ul>{this.props.list.info.todos.map((todo)=> {
            return <li className="list-todos "key={utils.makeId()}>{todo.txt}<span>{todo.doneAt}</span></li>
        })}</ul>
        </div>
        )
    }
}


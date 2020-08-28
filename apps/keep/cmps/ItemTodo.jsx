import {LongTxt} from './LongTxt.jsx'
export class ItemTodo extends React.Component {

     state = {
        completed: false
    }

    isCompleted = () => {
        let completed = !this.state.completed;
        this.setState({completed})
    }

    getStyle = () => {
            return {
                cursor: 'pointer',
                listStyleType: 'square',
                textDecoration: this.state.completed? 'line-through': 'none'
            }
        }

    render() {
        return (
            <li className="item-todo" style={this.getStyle()} onClick={this.isCompleted}>
                <LongTxt txt = {this.props.todo.txt}/>
            </li>
        )
    }
}


import { NoteText } from '../cmps/NoteText.jsx';
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteVideo } from '../cmps/NoteVideo.jsx';
import { NoteTodos} from '../cmps/NoteTodos.jsx';
import { ModalColor } from '../cmps/ModalColor.jsx';
import { EditNotes } from '../cmps/EditNotes.jsx';
import { SendNoteToEmail } from '../cmps/SendNoteToEmail.jsx';

export class DynamicCmp extends React.Component {

    state = {
        currType : this.props.list.type,
        isColor: false,
        isEdit: false,
        isDone: false
    }

    openColorPicker = () => {
        var colorToggle = !this.state.isColor
        this.setState({isColor : colorToggle})
    }

    openEditor = () => {
        var editToggle = !this.state.isEdit
        this.setState({isEdit : editToggle},()=>{console.log(this.state.isEdit)})
    }

    getCmp = () => {
        switch (this.state.currType) {
            case 'text':
                return <NoteText { ...this.props } />
            case 'img':
                return <NoteImg { ...this.props } />
            case 'video':
                return <NoteVideo { ...this.props } />
            case 'todo':
                return <NoteTodos { ...this.props } />
        }
    }

    getValueByType = () => {
        let todoList;

        if (this.state.currType === 'todo') {
            todoList = this.props.list.info.todos.map((todo)=>{
                return todo.txt
            })
        }

        switch (this.state.currType) {
            case 'text':
                return this.props.list.info.txt;
            case 'img':
                return "";
            case 'video':
                return "";
            case 'todo':
                return todoList
        }
    }

    isDone = () => {
        let isDone = !this.state.isDone;
        this.setState({isDone})
    }
    getStyle = () => {
        return {
            borderColor: this.state.isDone ? 'black': '#e0e0e0'
        }
    }
    
    render() {
        let classNote = (this.state.isEdit) ? 'edit-note' : 'note';


        return (
            <div className={`${classNote} note-${this.state.currType} picker-${this.props.list.style.bgc}`} style={this.getStyle()}>
                {!this.state.isEdit && this.getCmp()}

                {this.state.isEdit && <EditNotes list={this.props.list} loadNotes={this.props.loadNotes}
                type = {this.getValueByType}
                openEditer={this.openEditor}/>}

                <div className="icons">
                 {!this.state.isEdit && <img src="apps\keep\assets\icons\create-outline.svg" className="icon" onClick={this.openEditor}/>}
                <img src="apps\keep\assets\icons\trash-outline.svg" className="icon" onClick={()=>{this.props.removeList(this.props.list.id)}}/>
                <img src="apps\keep\assets\icons\color-palette-outline.svg" className="icon"
                onClick={this.openColorPicker}/>
                 <img src="apps\keep\assets\icons\checkbox-outline.svg" className="icon" onClick={this.isDone}/>

                {this.state.isColor && <ModalColor openColorPicker={this.openColorPicker} changeColor = {this.props.changeColor} id={this.props.list.id}/>}
                <SendNoteToEmail list={this.props.list} getValueByType={this.getValueByType}/>

                </div>
            </div>

        )
    }
}


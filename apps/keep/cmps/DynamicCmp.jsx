import { NoteText } from '../cmps/NoteText.jsx';
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteVideo } from '../cmps/NoteVideo.jsx';
import { NoteTodos} from '../cmps/NoteTodos.jsx';
import { ModalColor } from '../cmps/ModalColor.jsx';

export class DynamicCmp extends React.Component {

    state = {
        currType : this.props.list.type,
        isColor: false
    }

    openColorPicker = () => {
        var colorToggle = !this.state.isColor
        this.setState({isColor : colorToggle})
        console.log("OPEN")
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
    render() {
        return (
            <div className={`note note-${this.state.currType}`}>
                {this.getCmp()}
                <div className="icons">
                <img src="apps\keep\assets\icons\trash-outline.svg" className="icon" onClick={()=>{this.props.removeList(this.props.list.id)}}/>
                <img src="apps\keep\assets\icons\color-palette-outline.svg" className="icon"
                onClick={this.openColorPicker}/>
                {this.state.isColor && <ModalColor changeColor = {this.props.changeColor} id= {this.props.list.id}/>}

                </div>
            </div>

        )
    }
}


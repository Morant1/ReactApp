import {LongTxt} from './LongTxt.jsx'

export class NoteText extends React.Component {

    
    render() {

        return (
        <div className="note-content">
                <div className="type">
                <img src="apps\keep\assets\icons\thumbtack-solid.svg" className={`icon ${this.props.list.isPinned? 'pinned':''} `} 
                onClick={()=>{this.props.pinnedNote(this.props.list.id,this.props.list.isPinned)}}/>
                <img className="icon"src="apps\keep\assets\icons\text-outline.svg"/>
                </div>
                <div className="text-input">
                    <LongTxt txt = {this.props.list.info.txt}/>
                </div>
            </div>
        )
    }
}




import { keepService } from "../services/keepService.js";


export class AddNotes extends React.Component {

    state = {
        text: '',
        type: '',
        isOn: false,
        placeholder: ''
    }


    onChangeInput = ({target}) => {
        if (this.state.isOn) {
        const {value} = target;
        console.log(value)
        this.setState(
            {text: value }
            )
        }
    }

    addType = (type) => {
        if (type === "text")  this.setState({type,placeholder:'Enter your text',isOn: true})
        if (type === "img")  this.setState({type,placeholder:'Enter image URL...',isOn: true})
        if (type === "video")  this.setState({type,placeholder:'Enter video video...',isOn: true})
        if (type === "todo")  this.setState({type,placeholder:'Enter comma separated list...',isOn: true})
    }

    onSubmit = () => {
        if (!this.state.text) return;
          keepService.addNote(this.state.type,this.state.text);
          this.props.loadNotes();
          this.setState({text:'',type:'',isOn: false,placeholder: ''})
    
    }

    render() {
        return (
            <div className="input-container">
            <div className="input">
                 <textarea rows="3" cols="70" placeholder={this.state.placeholder} value={this.state.text} onChange={this.onChangeInput} >
            </textarea>
            <div className="main-icons">
                <div>
            <img onClick={()=>{this.addType("text")}}className="icon"src="apps\keep\assets\icons\text-outline.svg"/>
            <img onClick={()=>{this.addType("img")}}className="icon"src="apps\keep\assets\icons\image-outline.svg"/> 
            <img onClick={()=>{this.addType("todo")}}className="icon"src="apps\keep\assets\icons\list-outline.svg"/>
            <img onClick={()=>{this.addType("video")}}className="icon"src="apps\keep\assets\icons\videocam-outline.svg"/>
            </div>
            <div className="add-icon">
            <img onClick={this.onSubmit} className="icon"src="apps\keep\assets\icons\add-circle-outline.svg"/>
            </div>
            </div>
            </div>
            </div>
        )
    }
}



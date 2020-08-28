import { keepService } from "../services/keepService.js";
import {BusService} from '../../../services/event-bus-service.js';

const {withRouter } = ReactRouterDOM

class _AddNotes extends React.Component {

    state = {
        text: '',
        type: 'text',
        // isOn: false,
        placeholder: 'Enter your text'
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchParams !== this.props.searchParams) {
            this.updateFromQueryString()
        }
    }
    componentDidMount(){
        this.updateFromQueryString();
    }
    updateFromQueryString = () => {
        const search = this.props.searchParams;
        const params = new URLSearchParams(search);
        var text = params.get('text');
        if (!text) text = ''
        this.setState({text:text,type:'text'},()=>{this.onSubmit()})
        
    }

    onChangeInput = ({target}) => {
        // if (this.state.isOn) {
        const {value} = target;
        this.setState(
            {text: value }
            )
        // }
    }

    addType = (type) => {
        
        if (type === "text")  this.setState({type,placeholder:'Enter your text',text:'',isOn: true})
        if (type === "img")  this.setState({type,placeholder:'Enter image URL...',text:'',isOn: true})
        if (type === "video")  this.setState({type,placeholder:'Enter video URL...',text:'',isOn: true})
        if (type === "todo")  this.setState({type,placeholder:'Enter comma separated list...',text:'',isOn: true})
    }

    onSubmit = () => {
        
        if (!this.state.text) return;
          keepService.addNote(this.state.type,this.state.text);
          this.props.loadNotes();
          BusService.emit('notify', { msg: `Note added`, type: 'success'})
        //   this.setState({text:'',type:'',isOn: false,placeholder: 'Choose your note type'})
            this.setState({text: ''});
    
    }

    render() {
        return (
            <div className="input-container">
            <div className="input">
                <textarea  placeholder={this.state.placeholder} value={this.state.text} onChange={this.onChangeInput} >
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


export const AddNotes = withRouter(_AddNotes);




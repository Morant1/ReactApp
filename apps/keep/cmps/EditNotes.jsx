import { keepService } from "../services/keepService.js";

export class EditNotes extends React.Component {
    state = {
        value: this.props.type()
    }


    onChangeInput = ({target}) => {

        const {value} = target;
        console.log(value)
        this.setState(
            { value }
            )
        
    }


    onSubmit = () => {
        keepService.editNote(this.props.list.type,this.state.value,this.props.list.id);
        this.props.openEditer();
        this.props.loadNotes();
     
    
    }

   
    render() {
      
        return (
            <React.Fragment>
            {this.props.list.type === 'img' && 
             <img src={`${this.props.list.info.url}`}/>}
             {this.props.list.type === 'video' && 
              <iframe width="170" height="150"
              src={`https://www.youtube.com/embed/${this.props.list.info.url}?autoplay=1`}>
             </iframe>}

            <textarea value={this.state.value} onChange={this.onChangeInput}
             placeholder= {(this.props.list.type === 'img' || this.props.list.type === 'video') ? 'Enter new url' : '' }>
            </textarea>
            <div>
            <img className="icon" src="apps\keep\assets\icons\add-circle-outline.svg" onClick={this.onSubmit}/>
            <img className="icon" src="apps\keep\assets\icons\log-out-outline.svg" onClick={this.props.openEditer}/>
            </div>
            </React.Fragment>
            
        )
    }
}



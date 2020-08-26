import { NoteText } from '../cmps/NoteText.jsx';
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteVideo } from '../cmps/NoteVideo.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';


export class DynamicCmp extends React.Component {

    state = {
        currType : this.props.list.type
    }


    getCmp = () => {
        switch (this.state.currType) {
            case 'text':
                return <NoteText { ...this.props } />
            case 'img':
                return <NoteImg { ...this.props } />
            case 'video':
                return <NoteVideo { ...this.props } />
            case 'todos':
                return <NoteTodos { ...this.props } />
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.getCmp()}
            </React.Fragment>

        )
    }
}


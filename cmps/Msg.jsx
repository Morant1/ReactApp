import {BusService} from '../services/event-bus-service.js';

const { Link } = ReactRouterDOM;

export class Msg extends React.Component {
    state = {
        isShown: false,
        msg: '',
        type: ''
    }
    unsubscribe;
    componentDidMount() {
        this.unsubscribe = BusService.on('notify', (data) => {
            this.setState({ isShown: true, msg: data.msg, type: data.type , id: data.id})
            setTimeout(() => this.setState({ isShown: false }), 3000)
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        const { isShown, msg, type } = this.state
        return (
            <div className={ `msgBox ${type}` }>
                { isShown && <h2>{ msg }</h2>  }
                         
            </div>
        )
    }
}

import {BusService} from '../services/event-bus-service.js'

export function GlobalSearch(props) {
    return <section className="global-search">
        <input type="text" placeholder="Filter by Name" onChange={(ev)=>{
            BusService.emit('searchUpdated',ev.target.value)
        }}/>
    </section>
}
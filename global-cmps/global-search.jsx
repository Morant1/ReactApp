export function GlobalSearch(props) {
    return <section className="global-search">
        <input type="text" placeholder="Filter by Name" onChange={(ev)=>{
            props.onSetFilter(ev.target.value)
        }}/>
    </section>
}
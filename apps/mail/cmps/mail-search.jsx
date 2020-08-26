export function mailFilter(props) {
    return <section className="mail-filter">
        <h2>Book Filter</h2>
        <input type="text" placeholder="Search" onChange={(ev)=>{
            props.onSetFilter(ev.target.value)
        }}/>
    </section>
}
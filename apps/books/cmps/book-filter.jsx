export function BookFilter(props) {
    return <section className="books-filter">
        <h2>Book Filter</h2>
        <input type="text" placeholder="Filter by Name" onChange={(ev)=>{
            props.onSetFilter(ev.target.value)
        }}/>
    </section>
}
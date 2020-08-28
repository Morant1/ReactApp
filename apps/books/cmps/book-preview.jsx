import {getBookCurrency} from './book-currency.jsx'
const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {
    return <Link to={ `/book/${book.id}` }><article key={book.id} className="book-preview">
        
        <img src={book.thumbnail} />
        <h3>{book.title}</h3>
        <h4>{getBookCurrency(book.listPrice)}</h4>
    </article></Link>
}

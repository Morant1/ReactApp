import {getBookCurrency} from './book-currency.jsx'
const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {
    return <Link to={ `/book/${book.id}` }><article key={book.id} className="book-preview">
        <h3>{book.title}</h3>
        <img src={book.thumbnail} />
        <h4>{getBookCurrency(book.listPrice)}</h4>
    </article></Link>
}

import {getBookCurrency} from './book-currency.jsx'
const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {
    return <Link to={ `/book/${book.id}` }><article key={book.id} className="book-preview">
        <div className="book-image-container">
        <img src={book.thumbnail} />
        </div>
        <h3>{book.title}</h3>
        <h4>{getBookCurrency(book.listPrice)}</h4>
    </article></Link>
}

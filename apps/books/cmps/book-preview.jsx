import {getBookCurrency} from './book-currency.jsx'
const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {
    return <Link to={ `/book/${book.id}` }><article key={book.id} className="book-preview">
        <div className="book-image-container">
        <img src={book.thumbnail} />
        </div>
        <div className="book-preview-title-container">
        <h3>{book.title}</h3>
        </div>
        <div className="book-preview-price-container">
        <h4>{getBookCurrency(book.listPrice)}</h4>
        </div>
    </article></Link>
}

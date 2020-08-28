
import {BookPreview} from './book-preview.jsx'


export default class BookList extends React.Component { 
    
       render() {
           {if (!this.props.books) return ''}
           
           return <section className="books-list">
               {/* <Link to={ `/book/${book.id}` }>Edit</Link> */}
               {this.props.books.map(book => <BookPreview key={book.id} book={book} onSelectBook={this.props.onSelectBook} />)}
           </section>
       }
}

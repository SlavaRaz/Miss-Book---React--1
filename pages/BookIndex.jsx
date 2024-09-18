const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"


export function BookIndex() {
// console.log(bookService.getFilterBy())
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <h1>Loading...</h1>
    // console.log(books)
    return (
        <section className="book-index">
            {selectedBookId
                ? <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
                : <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList
                        books={books}
                        onSelectedBookId={onSelectedBookId}
                        onRemoveBook={onRemoveBook}
                    />
                </React.Fragment>

            }
        </section>
    )
}


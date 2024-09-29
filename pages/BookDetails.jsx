
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { BookReview } from "../pages/BookReview.jsx"


export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    console.log(params.bookId)

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {

        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err)
                showErrorMsg('Problem getting book')
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    function handleAddReview() {
        loadBook() // Reload book data to refresh reviews
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Book Price: {book.listPrice.amount}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/3.jpg`} alt="book-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next book</Link></button>
            </section>
            <section>
                <h3>Reviews</h3>
                {book.reviews && book.reviews.length ? (
                    <ul>
                        {book.reviews.map((review, idx) => (
                            <li key={idx}>
                                <p><strong>{review.fullname}</strong> ({review.readAt})</p>
                                <p>Rating: {'⭐'.repeat(review.rating)}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </section>

            <BookReview bookId={book.id} onAddReview={handleAddReview} />
        </section >
    )
}
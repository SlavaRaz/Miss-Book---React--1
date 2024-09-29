const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'

export function BookReview({ book, onAddReview }) {

    const [review, setReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        bookService.addReview(book.id, review)
            .then(() => {
                onAddReview()  // To refresh reviews after adding
                setReview({ fullname: '', rating: 1, readAt: '' }) // Clear form
            })
            .catch(err => {
                console.log('Error adding review:', err)
            })
    }

    return (
        <section>
            <h2>Leave Review</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={review.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="readAt">Read At:</label>
                    <input
                        type="date"
                        id="readAt"
                        name="readAt"
                        value={review.readAt}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </section>
    )
}
const { useNavigate, useParams } = ReactRouterDOM


import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err)
                navigate('/book')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/book')
            })
    }


    const { title, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookToEdit.id ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="listPrice">listPrice</label>
                <input value={listPrice.amount} onChange={handleChange} type="number" name="listPrice" id="listPrice" />
                <button>Save</button>
            </form>
        </section>
    )

}
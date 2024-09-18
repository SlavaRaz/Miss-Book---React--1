
const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        console.log('field', target.value)
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

        if (field === 'listPrice') {
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                listPrice: { ...prevFilter.listPrice, amount: value }
            }))
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    const { title, listPrice } = filterByToEdit

    const isValid = title
    return (
        <section className="book-filter">
            <h2>Filter Our books</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="listPrice">Min Price</label>
                <input value={listPrice.amount || ''} onChange={handleChange} type="number" name="listPrice" id="listPrice" />

                <button disabled={!isValid}>Submit</button>
                {/* <BookPreview book={book} /> */}
            </form>
        </section>
    )
}
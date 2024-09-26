const { useState, useEffect } = React

export function BookFilter({ filterBy, handleFilterChange }) {

   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // Temporarily disabled to prevent filtering on every input change, 
    // enabling filtering only on submit
    // useEffect(() => {
    //     handleFilterChange(filterByToEdit)
    // }, [filterByToEdit])

    function handleOnChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({...prevFilter, [field]: value}))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        handleFilterChange(filterByToEdit)
    }

    const { title, maxPrice, minPrice, category, isOnSale } = filterByToEdit

    function isValidFilter() {
        return (
            title || 
            category ||
            typeof isOnSale === 'boolean' ||
            (typeof maxPrice === 'number' && maxPrice >= 0) || 
            (typeof minPrice === 'number' && minPrice >= 0)
        )
    }

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleOnChange}
                        placeholder="Search by title"
                    />
                </div>

                <div>
                    <label htmlFor="maxPrice">Max Price: </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={maxPrice || ''}
                        onChange={handleOnChange}
                        placeholder="Enter max price"
                    />
                </div>

                <div>
                    <label htmlFor="minPrice">Min Price: </label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={minPrice || ''}
                        onChange={handleOnChange}
                        placeholder="Enter min price"
                    />
                </div>

                <div>
                    <label htmlFor="category">Category: </label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleOnChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Computers">Computers</option>
                        <option value="Hack">Hack</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="isOnSale">On Sale: </label>
                    <input
                        type="checkbox"
                        id="isOnSale"
                        name="isOnSale"
                        checked={isOnSale}
                        onChange={handleOnChange}
                    />
                </div>

                <button type="submit" disabled={!isValidFilter()}>Apply Filter</button>
            </form>
        </section>
    )
}

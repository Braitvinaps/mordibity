import React from "react"

const Search = ({ setValue, value  }) => {
    return (
        <div className="form mb-3">
            <form className="search_form">
                <input
                    value={value}
                    placeholder="Поиск по имени субъекта"
                    className="form-control"
                    type="text"
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>
        </div>
    )
}

export default Search
import React from "react"

const Pagination = ({ dataPage, totalData, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalData / dataPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm">
                {
                    pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a href="!#" className="page-link" onClick={() => paginate(num)}>
                                {num}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination
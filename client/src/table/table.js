import React from "react"

const Table = ({data, sortData}) => {
    return (
        <div>
             <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" onClick={() => {sortData('date')}}>Дата</th>
              <th scope="col" onClick={() => {sortData('territory')}}>Cубъект</th>
              <th scope="col" onClick={() => {sortData('hospital')}}>Больница</th>
              <th scope="col" onClick={() => {sortData('disease')}}>Болезнь</th>
              <th scope="col" onClick={() => {sortData('patients')}}>Заболевшие</th>
              <th scope="col" onClick={() => {sortData('issued')}}>Выздоровевшие</th>
              <th scope="col" onClick={() => {sortData('trend')}}>Тенденция</th>
            </tr>
          </thead>
          {
            data.map((item) => {
              const { date, territory, hospital, disease, patients, issued, trend } = item

              const formatDate = (num) => {
                num = num.toString();
                let year = num.slice(0, 4);
                let month = num.slice(4, 6);
                let day = num.slice(6, 8);
                return `${day}.${month}.${year}`
              }

              return (
                <tbody key={Math.random() + date}>
                  <tr>
                    <th>{formatDate(date)} </th>
                    <th>{territory}</th>
                    <td>{hospital}</td>
                    <td>{disease}</td>
                    <td>{patients}</td>
                    <td>{issued}</td>
                    {trend >= 0 ?
                      <td style={{ color: 'green' }}>{trend}</td> :
                      <td style={{ color: 'red' }}>{trend}</td>
                    }
                  </tr>
                </tbody>
              )
            })
          }
        </table>

        </div>
    )
}

export default Table
import React from "react"
import ArrowUp from "../svg/arrowUp"
import ArrowDown from "../svg/arrowDown"

const Table = ({ data, sortData, dirSort }) => {
  return (
    <div className="table-responsive-xxl">
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => { sortData('date') }}>
              Дата{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('territory') }}>
              Cубъект{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('hospital') }}>
              Больница{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('disease') }}>
              Болезнь{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('patients') }}>
              Заболевшие{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('issued') }}>
              Выздоровевшие{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
            <th scope="col" onClick={() => { sortData('trend') }}>
              Тенденция{dirSort ? <ArrowUp /> : <ArrowDown />}
            </th>
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
                  {
                    hospital.length < 30 ?
                      <td>{hospital}</td> :
                      <td>{hospital.slice(0, 30) + '....'}</td>
                  }
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
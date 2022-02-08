
import Spinner from "./spinner/spinner"
import { useEffect, useState } from "react"
import axios from "axios"


function App() {
  const url = 'http://localhost:4000/'
  

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="container">
      {isLoading ?
        <Spinner /> :
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Cубъект</th>
              <th scope="col">Больница</th>
              <th scope="col">Болезнь</th>
              <th scope="col">Заболевшие</th>
              <th scope="col">Выздоровевшие</th>
              <th scope="col">Тенденция</th>
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

      }
    </div >
  )
}

export default App;

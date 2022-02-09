
import Spinner from "./spinner/spinner"
import { useEffect, useState } from "react"
import axios from "axios"
import Table from "./table/table"
import Pagination from "./pagination/pagination"


function App() {
  const url = 'http://localhost:4000/'


  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPage] = useState(35)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await axios.get(url)
      setData(res.data)
      setIsLoading(false)
    }
    getData()
  }, [])

  const lastDataPage = currentPage * dataPage
  const firstDataIndex = lastDataPage - dataPage
  const currentData = data.slice(firstDataIndex, lastDataPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <h1>Статистика заболеваемости</h1>
      <Pagination
        dataPage={dataPage}
        totalData={data.length}
        paginate={paginate}
      />
      {isLoading ?
        <Spinner /> :
        <Table
          data={currentData}
        />
      }

    </div >
  )
}

export default App;


import Spinner from "./spinner/spinner"
import { useEffect, useState } from "react"
import axios from "axios"
import Table from "./table/table"
import Pagination from "./pagination/pagination"
import Search from "./search/search"


function App() {
  const url = 'http://localhost:4000/'


  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [value, setValue] = useState('')

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

  const filteredData = data.filter((name) => {
    return name.territory.toLowerCase().includes(value.toLocaleLowerCase())
  })

  const lastDataPage = currentPage * dataPage
  const firstDataIndex = lastDataPage - dataPage
  const currentData = filteredData.slice(firstDataIndex, lastDataPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <h1>Статистика заболеваемости по регионам</h1>

      <Search
        setValue={setValue}
      />
      <Pagination
        dataPage={dataPage}
        totalData={filteredData.length}
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

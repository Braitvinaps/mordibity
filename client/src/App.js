
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

  const [value, setValue] = useState('') // state для поиска

  const [currentPage, setCurrentPage] = useState(1)
  const [dataPage] = useState(35)

  const [dirSort, setDirSort] = useState(true)


  // получение иформации с сервера
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await axios.get(url)
      setData(res.data)
      setIsLoading(false)
    }
    getData()
  }, [])


  // пагинация
  const filteredData = data.filter((name) => {
    return name.territory.toLowerCase().includes(value.toLocaleLowerCase())
  })

  const lastDataPage = currentPage * dataPage
  const firstDataIndex = lastDataPage - dataPage
  const currentData = filteredData.slice(firstDataIndex, lastDataPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)


  // сортировка каждого столбца
  const sortData = (field) => {
    const copyData = filteredData.concat()
    if (dirSort) {
      copyData.sort((a, b) => a[field] > b[field] ? 1 : -1)
    } else {
      copyData.sort((a, b) => a[field] < b[field] ? 1 : -1)
    }
    setData(copyData)
    setDirSort(!dirSort)
  }

  return (
    <div className="container mt-5">
      <h1>Статистика заболеваемости по регионам</h1>

      <Search
        setValue={setValue}
        value={value}
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
          sortData={sortData}
        />
      }
    </div >
  )
}

export default App;

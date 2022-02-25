
import Spinner from "./spinner/spinner"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Table from "./table/table"
import Pagination from "./pagination/pagination"
import Search from "./search/search"


function App() {
  const url = 'http://localhost:4000/'

  const [data, setData] = useState([]) // state для данны таблтцы
  const [isLoading, setIsLoading] = useState(false) // state для спиннера загрузки

  const [value, setValue] = useState('') // state для поиска

  const [currentPage, setCurrentPage] = useState(1)  // state для активной страницы
  const [dataPage] = useState(20) // state для колличества записей на странице

  const [dirSort, setDirSort] = useState(true) // state для изменения направления сортировки


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

  const copyData = data.concat()

  // живой поиск
  const filteredData = copyData.filter((name) => {
    return name.territory.toLowerCase().includes(value.toLocaleLowerCase())
  })

  // пагинация
  const lastDataIndex = currentPage * dataPage
  const firstDataIndex = lastDataIndex - dataPage
  const currentData = filteredData.slice(firstDataIndex, lastDataIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  // сортировка каждого столбца
  const sortData = (field) => {
    if (dirSort) {
      filteredData.sort((a, b) => a[field] > b[field] ? 1 : -1)
    } else {
      filteredData.sort((a, b) => a[field] < b[field] ? 1 : -1)
    }
    setData(filteredData)
    setDirSort(!dirSort)
  }

  return (
    <div className="container-fluid">
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
          dirSort={dirSort}
          data={currentData}
          sortData={sortData}
        />
      }
    </div >
  )
}

export default App;

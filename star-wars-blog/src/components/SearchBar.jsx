import '../styles/SearchBar.css'
import data from '../data/localApi.json'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveAnArticle } from '../redux/slices/articleSlice'


export default function SearchBar({ category }) {

  const [search, setSearch] = useState("")
  const [article, setArticle] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (search.length > 0) {
      fetch(`https://starwars-databank-server.vercel.app/api/v1/${category}/name/${search}`)
      .then(response => response.json())
      .then(data => {
        setArticle(data[0])
        dispatch(saveAnArticle(article, { test: false }))
      })
    }

  }, [category, search, dispatch, article])
  
  
  const onFormSubmit = (e) => {
    e.preventDefault()
    if (article) {
      const currentData = data.find((item) => item.keyword === category)
      const categoryId = currentData._id
      navigate(`/article/${categoryId}.${article._id}`)
    }
  }


  return (
    <div className='search-bar'>
      <form className='search-form' onSubmit={(e) => onFormSubmit(e)}>
        <input type="text" name="search-input" id="search-input" className='search-input' placeholder='Débutez une recherche...' onChange={e => setSearch(e.target.value)} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Débutez une recherche..."} />
      </form>
    </div>
  )
}

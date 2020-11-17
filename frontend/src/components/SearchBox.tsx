import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SearchBox.css'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else history.push('/')
  }

  return (
    <Form onSubmit={submitHandler} className="searchbox__form">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search product..."
        className="mx-2 searchbox__formcontrol"
        size="sm"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-dark"
        className=" searchbox__button"
        size="sm"
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox

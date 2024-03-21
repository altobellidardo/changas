'use client'
import { useState } from 'react'

function FormToJson () {
  const [formData, setFormData] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const jsonData = JSON.stringify(formData)
    console.log('JSON Data:', jsonData) // You can display the JSON or send it to server
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <h1>Form to JSON</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='age'>Age:</label>
        <input
          type='number'
          id='age'
          name='age'
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor='city'>City:</label>
        <input
          type='text'
          id='city'
          name='city'
          required
          onChange={handleChange}
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <br />
      <p>JSON Output (Console):</p>
    </div>
  )
}

export default FormToJson

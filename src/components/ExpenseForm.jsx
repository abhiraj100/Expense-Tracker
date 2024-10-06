import React, { useState } from 'react'

export default function ExpenseForm({ setExpenses }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();  // it stops from page reload
    const expense = { title, category, amount, id: crypto.randomUUID() };
    setExpenses((prevState) => [...prevState, expense]);
    // e.target.reset();  // it don't work here due to one way data binding we don't update the screen until we don't update the state. (Unidirectional Data Flow)
    setTitle("");
    setCategory("");
    setAmount("");
  }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();  // it stops from page reload
  //   // console.log(e.target);
  //   // const expense = { ...getFormData(e.target), id: crypto.randomUUID() }
  //   // setExpenses((prevState) => [...prevState, expense]);
  //   // e.target.reset();  // to clear the previous data from the input fields in the form
  // }

  // const getFormData = (form) => {
  //   const formData = new FormData(form)
  //   const data = {}
  //   // for (const value of formData.values()) {  // values only gives value
  //   for (const [key, value] of formData.entries()) {  // entries gives both value and id
  //     data[key] = value
  //   }
  //   return data;
  // }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}> 
          <option value="" hidden>
            Select Category
          </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button className="add-btn">Add</button>
    </form>
  )
}

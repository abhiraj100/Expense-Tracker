import React, { useEffect, useState } from "react";

export default function ExpenseForm({ setExpenses }) {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  // for different things we make different state to manage it properly
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    console.log(formData);
    const errorsData = {};

    if (!formData.title) {
      errorsData.title = "Title is required";
    }

    if (!formData.category) {
      errorsData.category = "Please Select a Category";
    }

    if (!formData.amount) {
      errorsData.amount = "Amount is required";
    }

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // it stops from page reload
    // e.target.reset();  // it don't work here due to one way data binding we don't update the screen until we don't update the state. (Unidirectional Data Flow)
    console.log(expense);

    // validate(expense);
    // console.log(errors);
    const validateResult = validate(expense);
    // console.log(validateResult);
    // console.log(Object.keys(validateResult));
    if(Object.keys(validateResult).length) return;
    
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      // title : e.target.value,  // whatever we change it will show the changes in the title only
      // [name]: e.target.value, // whatever we change it will show the changes in their id or name (dynamic way)
      [name]: value,
    }));
    setErrors({}); // when user starts filling the input values then it will set {} empty object which disappears the errors that are showing
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={expense.title}
          // onChange={(e) =>
          //   setExpense((prevState) => ({ ...prevState, title: e.target.value }))
          // }
          onChange={handleChange}
        />
        <p className="error">{errors.title}</p>
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expense.category}
          // onChange={(e) =>
          //   setExpense((prevState) => ({
          //     ...prevState,
          //     category: e.target.value,
          //   }))
          // }
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        <p className="error">{errors.category}</p>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
        type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          // onChange={(e) =>
          //   setExpense((prevState) => ({
          //     ...prevState,
          //     amount: e.target.value,
          //   }))
          // }
          onChange={handleChange}
        />
        <p className="error">{errors.amount}</p>
      </div>
      <button className="add-btn">Add</button>
    </form>
  );
}

// implementing the useRef() hook concept

// import React, { useEffect, useState } from "react";
// // import React, { useRef, useState } from "react";

// export default function ExpenseForm({ setExpenses }) {
//   const [expense, setExpense] = useState({
//     title: "",
//     category: "",
//     amount: "",
//   });

//   // const titleRef = useRef();
//   // const categoryRef = useRef();
//   // const amountRef = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault(); // it stops from page reload
//     // e.target.reset();  // it don't work here due to one way data binding we don't update the screen until we don't update the state. (Unidirectional Data Flow)
//     console.log(expense);
//     setExpenses((prevState) => [...prevState, {...expense, id: crypto.randomUUID() }]);
//     setExpense({
//       title: "",
//       category: "",
//       amount: "",
//     })

//     // to check and console the values
//     // console.log({
//     //   title: titleRef.current.value,
//     //   category: categoryRef.current.value,
//     //   amount: amountRef.current.value,
//     //   id: crypto.randomUUID(),
//     // });
//     // setExpenses((prevState) => [
//     //   ...prevState,
//     //   {
//     //     title: titleRef.current.value,
//     //     category: categoryRef.current.value,
//     //     amount: amountRef.current.value,
//     //     id: crypto.randomUUID(),
//     //   },
//     // ]);
//   };

//   useEffect(() => {
//     console.log("rendering...");
//   })

//   return (
//     <form className="expense-form" onSubmit={handleSubmit}>
//       <div className="input-container">
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           name="title"
//           value={expense.title}
//           onChange={(e) =>
//             setExpense((prevState) => ({ ...prevState, title: e.target.value }))
//           }
//           // ref={titleRef}
//         />
//       </div>
//       <div className="input-container">
//         <label htmlFor="category">Category</label>
//         <select
//           id="category"
//           name="category"
//           value={expense.category}
//           onChange={(e) =>
//             setExpense((prevState) => ({
//               ...prevState,
//               category: e.target.value,
//             }))
//           }
//           // ref={categoryRef}
//         >
//           <option value="" hidden>
//             Select Category
//           </option>
//           <option value="Grocery">Grocery</option>
//           <option value="Clothes">Clothes</option>
//           <option value="Bills">Bills</option>
//           <option value="Education">Education</option>
//           <option value="Medicine">Medicine</option>
//         </select>
//       </div>
//       <div className="input-container">
//         <label htmlFor="amount">Amount</label>
//         <input
//           id="amount"
//           name="amount"
//           value={expense.amount}
//           onChange={(e) =>
//             setExpense((prevState) => ({
//               ...prevState,
//               amount: e.target.value,
//             }))
//           }
//           // ref={amountRef}
//         />
//       </div>
//       <button className="add-btn">Add</button>
//     </form>
//   );
// }

// implementing the core javascript concept

// import React, { useState } from 'react'

// export default function ExpenseForm({ setExpenses }) {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [expense, setExpense] = useState({ id: crypto.randomUUID(), title: "", category: "", amount: ""})

//   const handleSubmit = (e) => {
//     e.preventDefault();  // it stops from page reload
//     const expense = { title, category, amount, id: crypto.randomUUID() };
//     setExpenses((prevState) => [...prevState, expense]);
//     // e.target.reset();  // it don't work here due to one way data binding we don't update the screen until we don't update the state. (Unidirectional Data Flow)
//     setTitle("");
//     setCategory("");
//     setAmount("");
//   }

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();  // it stops from page reload
//   //   // console.log(e.target);
//   //   // const expense = { ...getFormData(e.target), id: crypto.randomUUID() }
//   //   // setExpenses((prevState) => [...prevState, expense]);
//   //   // e.target.reset();  // to clear the previous data from the input fields in the form
//   // }

//   // const getFormData = (form) => {
//   //   const formData = new FormData(form)
//   //   const data = {}
//   //   // for (const value of formData.values()) {  // values only gives value
//   //   for (const [key, value] of formData.entries()) {  // entries gives both value and id
//   //     data[key] = value
//   //   }
//   //   return data;
//   // }

//   return (
//     <form className="expense-form" onSubmit={handleSubmit}>
//       <div className="input-container">
//         <label htmlFor="title">Title</label>
//         <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </div>
//       <div className="input-container">
//         <label htmlFor="category">Category</label>
//         <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="" hidden>
//             Select Category
//           </option>
//           <option value="grocery">Grocery</option>
//           <option value="clothes">Clothes</option>
//           <option value="bills">Bills</option>
//           <option value="education">Education</option>
//           <option value="medicine">Medicine</option>
//         </select>
//       </div>
//       <div className="input-container">
//         <label htmlFor="amount">Amount</label>
//         <input id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       </div>
//       <button className="add-btn">Add</button>
//     </form>
//   )
// }

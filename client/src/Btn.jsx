import React, { useState } from 'react';
import './Btn.css';

function Btn() {

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState(
          {
              Name : "",
              Email : "",
              Number : "",
              Age : "",
              Image : null
          }
      );

      console.log(data);
      
  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const onHandleChange = (e) => {
    const { name, value} = e.target;
    console.log(name,"nameeeee");
    console.log(value,"valueeee");

    if ( name === 'Image') {
      setData((prevData) => ({
        ...prevData, [name] : e.target.files[0]
      }))
    } else {
    
    setData((prevData) => ({
        ...prevData, [name] : value
    }))
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    setData({
      Name: "",
      Email: "",
      Number: "",
      Age: "",
      Image: null
    });
  };

  return (
    <div className="form">
      <button className="showFormButton" onClick={handleButtonClick}>
        Add User Details
      </button>

      {showForm && (
        <div className='form-in'>
          {/* <div className="formContainer"> */}
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name='Name' onChange={onHandleChange} value={data.Name} id="name" placeholder="Enter your name" />

            <label htmlFor="email">Email</label>
            <input type="email" name='Email' onChange={onHandleChange} value={data.Email} id="email" placeholder="Enter your email" />

            <label htmlFor="number">Number</label>
            <input type="text" name='Number' onChange={onHandleChange} value={data.Number} id="number" placeholder="Enter your phone number" />

            <label htmlFor="age">Age</label>
            <input type="number" name='Age' onChange={onHandleChange} value={data.Age} id="age" placeholder="Enter your age" />

            <label htmlFor="image">Image</label>
            <input type="file" name='Image' onChange={onHandleChange} value={data.Image} id="image" />

            <button className="submitButton" type='submit'>Submit</button>
            </form>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default Btn;

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const New = () => {

    const [data, setData] = useState(
        {
            Name : "",
            Age : ""
        }
    )

    console.log(data);

    const onHandleChange = (e) => {
        const { name, value} = e.target;
        console.log(name,"nameee");
        console.log(value,"valueee");
        
        setData((prevData) => ({
            ...prevData, [name] : value
        }))
    }

  return (
    <div>
        <form action="">

    <Button>Add new User</Button>

        <input type="text" name="Name" onChange={onHandleChange} value={data.Name} placeholder='Name'/>
        <input type="text" name="Age" onChange={onHandleChange} value={data.Age} placeholder='Age'/>
        {/* <Button onClick={() => setData({
            Name : "",
            Age : ""
        })}>Clear</Button> */}
        </form>
    </div>
  )
}

export default New
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './mainserver.css'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image';

const Mainserver = () => {
    const [users, setUsers] = useState([])
    // const [formData, setFormData] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [newText, setNewText] = useState("")
    const [editingUserId, setEditingUserId] = useState(null)
    const [imgFile, setImgFile] = useState(null)
    const [imagePaths, setImagePaths] = useState([]);

    let API = 'http://localhost:3000/'
    
    const getAllUserData = async () => {
        try {
            let response = await axios.get(`${API}getAllUserData`)
            console.log(response.data.data,"getAllUserData");
            setUsers(response?.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    // const postAllUserData = async () => {
    //     try {
    //         let response = await axios.post(`${API}postAllUserData`,{
    //             data : formData})
    //             console.log(response);
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    // const onHandleSave = () => {
    //     postAllUserData()
    // }

    const onHandlePut = async (id, newText) => {
        try {
            setIsEditing(false)
            setEditingUserId(null)
            let response = await axios.put(`${API}editSingleUserData`, {id:id, newText:newText})
            getAllUserData()
            console.log(response,"responseeeeeeeeee");
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id, name) => {
        setIsEditing(true)
        setEditingUserId(id)
        setNewText(name)
    }

    // const deleteAllUserData = async () => {
    //     try {
    //         let response = await axios.delete(`${API}deleteAllUserData`);
    //         console.log(response);
    //         setUsers([]);
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }

    const onHandleDeleteSingleUser = async (UID) => {
        try {
            let response = await axios.delete(`${API}deleteSingleUserData/?id=${UID}`)
            console.log(response);
            
            getAllUserData()
        } catch (error) {
            console.log(error);
        }
    }

    const handleUploadFile = (e) => {
        setImgFile(e.target.files[0])
    }

    const fileUpload = async () => {

        if(!imgFile) {
            alert("Mariyathekk File Eduthho...")
            return
        }

        const dataForm = new FormData()
        dataForm.append("imgFile",imgFile)
        
        try {
            let response = await axios.post(`${API}fileupload`, dataForm, {
                headers : {"Content-Type":"multipart/form-data"}
            })
            console.log(response);
            
        } catch (error) {
            
            console.log(error,"FileUploadError");
        }
    }
    // const fileDownload = async () => {
    //     axios.get("http://localhost:3000/getUploadedFiles")
    //   .then((response) => {
    //     setImagePaths(response.data); // Array of file names
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching uploaded files", error);
    //   });
    // }

    const fileDownload = async () => {
        axios
          .get(`${API}filedownload`)
          .then((response) => {
            setImagePaths(response.data); // Array of file names
          })
          .catch((error) => {
            console.error("Error fetching uploaded files", error);
          });
      };
    
    
    useEffect(() => {
        getAllUserData(),
        fileDownload()
    },[])

    return (
        <div className='major-div'>
        <div className='main-div'>

                    <h1> File Operations x NodeJs</h1>
            {users.map((value) => {
                return (
                    <>
                    <div key={value.id} className='map'>
                    <img
                    //   key={index}
                      src={`http://localhost:3000/uploads/imgFile-1739254548470.jpg`}
                    //   alt={`Uploaded File ${index}`}
                      className="profile-img"
                    />
                    <span  style={{ color: 'white' }}>{value.name}</span>

                        <div className='map-inside'>
                        {editingUserId !== value.id ? (
                            // <button onClick={() => handleEdit(value.id, value.name)}>Edit</button>
                            <Button onClick={() => handleEdit(value.id, value.name)}>Edit</Button>
                            
                        ) : (
                            <>
                            <input type="text" value={newText}
                            onChange={(e)=> setNewText(e.target.value)} placeholder='Edit Text'/>
                            {/* <Button onClick={()=>onHandlePut(value.id, newText)} variant='primary'>Save</Button> */}
                            <Button onClick={()=>setEditingUserId(null)} variant='secondary'>Cancel</Button>
                            <Button onClick={()=>onHandlePut(value.id, newText)} variant='primary'>Save</Button>
                            </>
                        )}
                        <Button variant='danger' onClick={()=>onHandleDeleteSingleUser(value.id)}>Delete</Button>
                        <input type="file" onChange={handleUploadFile} id='control' className='form-control'/>
                        <Button variant='info' onClick={fileUpload}>Upload</Button>
                        {/* <button onClick={()=>onHandleDeleteSingleUser(value.id)}>Delete</button> */}
                        </div>
                    </div>
            </>
                )
            })}

        </div>
        </div>
    )
}

export default Mainserver
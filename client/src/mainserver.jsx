/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./mainserver.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Mainserver = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [imgFile, setImgFile] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let API = "http://localhost:5500/api/";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllUserData = async () => {
    try {
      let response = await axios.get(`${API}users`);
      // console.log(response.data,"getAllUserData");
      setUsers(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const AddNewUser = async () => {
    try {
      const dataForm = new FormData();
      dataForm.append("name", formData.name);
      dataForm.append("email", formData.email);
      dataForm.append("number", formData.number);
      dataForm.append("age", formData.age);
      dataForm.append("image", formData.image);

      console.log([...dataForm.entries()], "dataForm");

      let response = await axios.post(`${API}users`, dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      handleClose();
      getAllUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const onHandlePut = async (id, newText) => {
    // console.log(id);

    try {
      setIsEditing(false);
      setEditingUserId(null);
      let response = await axios.put(`${API}/users/${id}`, {
        newText: newText,
      });
      getAllUserData();
      // console.log(response,"responseeeeeeeeee");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, name) => {
    setIsEditing(true);
    setEditingUserId(id);
    setNewText(name);
  };

  const onHandleDeleteSingleUser = async (UID) => {
    console.log(UID,"INSIDE DELETE SINGLE");
    try {
      let response = await axios.delete(
        `${API}/users/${UID}`
      );
      // console.log(response);

      getAllUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = (e) => {
    setImgFile(e.target.files[0]);
  };

  const fileUpload = async () => {
    if (!imgFile) {
      alert("Mariyathekk File Eduthho...");
      return;
    }

    const dataForm = new FormData();
    dataForm.append("imgFile", imgFile);

    try {
      let response = await axios.post(`${API}fileupload`, dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response);
    } catch (error) {
      console.log(error, "FileUploadError");
    }
  };

  const fileDownload = async () => {
    console.log("fileDownload");
  };

  useEffect(() => {
    getAllUserData(), fileDownload();
  }, []);

  return (
    <div className="major-div">
      <div className="main-div">
        <h1> File Operations x NodeJs</h1>
        <Button variant="dark" onClick={handleShow}>
          {" "}
          Add new User
        </Button>
        {show && (
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="First and Last Name"
                value={formData.name}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                placeholder="917672639292"
                value={formData.number}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  autoFocus
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddNewUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        )}
        {users.map((value) => {
          return (
            <>
              <div key={value._id} className="map">
                <img
                  alt={`Uploaded File ${value.id}`}
                  className="profile-img"
                />
                <span style={{ color: "white" }}>{value.name}</span>

                <div className="map-inside">
                  {editingUserId !== value.id ? (
                    <Button onClick={() => handleEdit(value.id, value.name)}>
                      Edit
                    </Button>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Edit Text"
                      />
                      <Button
                        onClick={() => setEditingUserId(null)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => onHandlePut(value._id, newText)}
                        variant="primary"
                      >
                        Save
                      </Button>
                    </>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => onHandleDeleteSingleUser(value._id)}
                  >
                    Delete
                  </Button>
                  <input
                    type="file"
                    onChange={handleUploadFile}
                    id="control"
                    className="form-control"
                  />
                  <Button variant="info" onClick={fileUpload}>
                    Upload
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Mainserver;

import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [userID, setId] = useState("");
  const [userName, setName] = useState("");
  const [userDOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
 

  const [userList, setuserList] = useState([]);

  const addUser = () => {
    Axios.post("http://localhost:3000/create", {
      userID:userID,
      userName: userName,
      userDOB: userDOB,
      email: email,
      contact: contact,
      country: country,    
    }).then(() => {
      setuserList([
        ...userList,
        {
          userID:userID,
          userName: userName,
          userDOB: userDOB,
          email: email,
          contact: contact,
          country: country, 
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3000/users").then((response) => {
      setuserList(response.data);
    });
  };

  const updateUserContact = (id) => {
    Axios.put("http://localhost:3000/update", { contact: newContact, id: id }).then(
      (response) => {
        setuserList(
          userList.map((val) => {
            return val.id == id
              ? {
                  userID: val.id,
                  userName: val.userName,
                  userDOB: val.userDOB,
                  email: val.email,    
                  contact: newContact,             
                  country: val.country,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      setuserList(
        userList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
      <label>ID:</label>
        <input
          type="text"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>DOB:</label>
        <input
          type="number"
          onChange={(event) => {
            setDOB(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
          <label>Contact (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setContact(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div className="users">
        <button onClick={getUsers}>Show Users</button>

        {userList.map((val, key) => {
          return (
            <div className="users">
              <div>
                <h3>UserId: {val.userID}</h3>
                <h3>Name: {val.userName}</h3>
                <h3>Age: {val.userDOB}</h3>
                <h3>Email: {val.email}</h3>                
                <h3>Contact: {val.contact}</h3>
                <h3>Country: {val.country}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateUserContact(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteUser(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

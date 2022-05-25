import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // create user
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // update user
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  // delete user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    // read users
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // console.log(data);
    };
    getUsers();
  }, [usersCollectionRef]);

  return (
    <div>
      <input
        type="name"
        placeholder="name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="age"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      ></input>
      <button onClick={createUser}>create user</button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              increase age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              delete user
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;

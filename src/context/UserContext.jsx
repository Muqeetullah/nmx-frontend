import React, { createContext, useContext, useRef, useState } from "react";

// Define User context type with users, addUser, updateUser functions

// Initial list of users with id
const initialUsers = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "User",
    education: "Ph.D. in Economics",
    age: 40,
    gender: "Male",
  },
  {
    id: 2,
    name: "Emily Smith",
    email: "emily.smith@example.com",
    role: "User",
    education: "M.Sc. in Computer Science",
    age: 35,
    gender: "Female",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    education: "B.Sc. in Computer Science",
    age: 30,
    gender: "Male",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Manager",
    education: "M.Sc. in Computer Science",
    age: 28,
    gender: "Female",
  },
];

// Create context with initial values
const UserContext = createContext({
  users: initialUsers,
  addUser: () => {},
  updateUser: () => {},
});

// Custom hook to use User context
export const useUser = () => useContext(UserContext);

// User provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const nextId = useRef(3); // Start with the next available id

  // Function to add a new user
  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: nextId.current };
    setUsers([...users, userWithId]);
    nextId.current++;
  };

  // Function to update an existing user based on id
  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

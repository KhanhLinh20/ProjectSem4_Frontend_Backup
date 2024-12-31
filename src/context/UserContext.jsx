import React, { createContext, useContext, useState } from "react";

// Tạo context
const UserContext = createContext();

// Hàm cung cấp context cho các component
export const useUser = () => useContext(UserContext);

// Component cung cấp context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    employerID: null,
    firstName: '',
    lastName: '',
    profilePicture: '',
    accountStatus: '',
  });

  // Hàm cập nhật thông tin người dùng
  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

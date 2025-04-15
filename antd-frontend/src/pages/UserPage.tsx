import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUsers, User } from "../service/userService";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.users);
    } catch (error) {
      message.error("Erro ao buscar usuários.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <UserForm onUserCreated={fetchUsers} />
      <UserTable data={users} />
    </>
  );
};

export default UserPage;
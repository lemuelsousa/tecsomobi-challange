import { message } from "antd";
import React, { useEffect, useState } from "react";
import { createUser, getUsers, updateUser, User } from "../service/userService";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.users);
    } catch (error) {
      message.error("Erro ao buscar usuários.");
      console.error(error);
    }
  };

  const handleSubmit = async (data: User) => {
    if (editingUser?.id) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else await createUser(data);
    console.log("reloading table data")
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = async (user: User) => {
    setEditingUser(user);
  };

  return (
    <>
      <UserForm
        initialValues={editingUser ?? undefined}
        onSubmit={handleSubmit}
        onFinish={() => setEditingUser(null)}
      />
      <UserTable
        data={users}
        onUserDeleted={fetchUsers}
        onEditUser={handleEditUser}
      />
    </>
  );
};

export default UserPage;

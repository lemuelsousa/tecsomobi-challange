import { Card, Flex, message } from "antd";
import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { createUser, getUsers, updateUser, User } from "../service/userService";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchUsers = async (page = currentPage, limit = pageSize) => {
    try {
      const response = await getUsers(page, limit);
      setUsers(response.users);
      setTotalUsers(response.total);
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
    console.log("reloading table data");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = async (user: User) => {
    setEditingUser(user);
  };

  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    fetchUsers(page, pageSize);
  };

  return (
    <>
    {contextHolder}
      <Flex justify="center" align="center" vertical>
        <Card
          title={editingUser ? "Editar Usuário" : "Cadastrar Usuário"}
          style={{ marginBottom: 24 }}
        >
          <UserForm
            initialValues={editingUser ?? undefined}
            onSubmit={handleSubmit}
            onFinish={() => setEditingUser(null)}
            messageApi={messageApi}
          />
        </Card>
        <Card title="Lista de usuários">
          <UserTable
            data={users}
            onUserDeleted={fetchUsers}
            onEditUser={handleEditUser}
            total={totalUsers}
            currentPage={currentPage}
            pageSize={pageSize}
            onChangePage={handlePageChange}
            messageApi={messageApi}
          />
        </Card>
      </Flex>
    </>
  );
};

export default UserPage;

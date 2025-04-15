import { Button, message, Space, Table } from "antd";
import React from "react";
import { deleteUser, User } from "../service/userService";

const { Column } = Table;

interface UserTableProps {
  data: User[];
  onUserDeleted: () => void;
  onEditUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  onUserDeleted,
  onEditUser,
}) => {
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      message.success("Usuário deletado com sucesso.");
      onUserDeleted();
    } catch (error) {
      console.error("Erro ao deletar usuário: ", error);
      message.error("Erro ao deletar usuário.");
    }
  };
  return (
    <Table<User> dataSource={data} rowKey="id">
      <Column title="Nome" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Ação"
        key="action"
        render={(_, record: User) => (
          <Space size="middle">
            <Button
              color="blue"
              variant="solid"
              onClick={() => onEditUser(record)}
            >
              Editar
            </Button>
            <Button
              color="default"
              variant="dashed"
              onClick={() => handleDelete(Number(record.id))}
            >
              Apagar
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;

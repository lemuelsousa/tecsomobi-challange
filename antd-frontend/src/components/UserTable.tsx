import { Button, message, Space, Table } from "antd";
import React from "react";
import { deleteUser, User } from "../service/userService";

const { Column } = Table;

interface UserTableProps {
  data: User[];
  total: number;
  currentPage: number;
  pageSize: number;
  onChangePage: (page: number, pageSize: number) => void;
  onUserDeleted: () => void;
  onEditUser: (user: User) => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  total,
  currentPage,
  pageSize,
  onChangePage,
  onUserDeleted,
  onEditUser,
  messageApi,
}) => {
  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      messageApi.success("Usuário deletado com sucesso.");
      onUserDeleted();
    } catch (error) {
      console.error("Erro ao deletar usuário: ", error);
      messageApi.error("Erro ao deletar usuário.");
    }
  };
  return (
    <Table<User>
      dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        onChange: onChangePage,
        onShowSizeChange: onChangePage,
      }}
      scroll={{ x: "max-content" }}
    >
      <Column title="Nome" dataIndex="name" key="name" responsive={["md"]} />
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

import { Button, Space, Table } from "antd";
import React from "react";
import { User } from "../service/userService";

const { Column } = Table;

interface UserTableProps {
  data: User[];
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
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
              onClick={() => console.log("função pendente")}
            >
              Editar
            </Button>
            <Button
              color="default"
              variant="dashed"
              onClick={() => console.log("função pensente")}
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

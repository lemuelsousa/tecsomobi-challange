import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { createUser, User } from "../service/userService";

interface UserFormProps {
  onUserCreated: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<User>["onFinish"] = async (data) => {
    try {
      await createUser(data);
      message.success("Usuário criado com sucesso!");
      form.resetFields();
      onUserCreated();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      message.error(error.message || "Erro ao criar usuário.");
    }
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return ( 
    <Form
      form={form}
      name="user-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<User>
        label="name"
        name="name"
        rules={[{ required: true, message: "Por favor insira um nome!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<User>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Por favor insira um email válido" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<User>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Por favor insira uma senha!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;

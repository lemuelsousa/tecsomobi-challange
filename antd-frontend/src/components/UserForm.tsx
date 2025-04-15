import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { User } from "../service/userService";
import Title from "antd/es/typography/Title";

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (data: User) => Promise<void>;
  onFinish?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  onFinish,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFinish = async (data: User) => {
    try {
      await onSubmit(data);
      form.resetFields();
      message.success("Usuário salvo com sucesso!");
      onFinish?.();
    } catch (error) {
      console.error("Erro: ", error);
      message.error(error.message || "Erro ao salvar usuário.");
    }
  };

  return (
    <>
      <Title level={3}>
        {initialValues?.id ? "Editar Usuário" : "Cadastrar Usuário"}
      </Title>

      <Form
        form={form}
        name="user-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
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
            {initialValues ? "Atualizar" : "Cadastrar"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;

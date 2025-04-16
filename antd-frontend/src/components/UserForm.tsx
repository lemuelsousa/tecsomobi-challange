import { Button, Flex, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { User } from "../service/userService";

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (data: User) => Promise<void>;
  onFinish?: () => void;
  onCancel: () => void;
  messageApi: ReturnType<typeof message.useMessage>[0];
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  onFinish,
  messageApi,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFinish = async (data: User) => {
    setLoading(true);
    try {
      await onSubmit(data);
      form.resetFields();
      messageApi.success("Usuário salvo com sucesso!");
      onFinish?.();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao salvar usuário.";
      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="user-form"
        style={{ maxWidth: 600 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleFinish}
        autoComplete="off"
        key={initialValues?.id || "new"}
      >
        <Form.Item<User>
          label="Nome"
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
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Por favor insira uma senha!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Flex gap={8} wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              {initialValues ? "Atualizar" : "Cadastrar"}
            </Button>
            {initialValues && (
              <Button
                onClick={() => {
                  form.resetFields();
                  onCancel?.();
                }}
              >
                Cancelar
              </Button>
            )}
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;

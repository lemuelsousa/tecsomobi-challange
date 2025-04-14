import { useState, useEffect, useCallback } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { User } from "../types/User";
import { createUser, ErrorResponse, updateUser } from "../service/userService";
import { userSchema } from "../schemas/User";

interface Props {
  selectedUser?: User;
  onSave: () => void;
}

export default function UserForm({ selectedUser, onSave }: Props) {
  const [data, setData] = useState<User>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "success";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const clearData = () => setData({ name: "", email: "", password: "" });

  useEffect(() => {
    if (selectedUser) setData(selectedUser);
    else clearData();
  }, [selectedUser]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" }); // Clear error for the field being edited
    },
    [data, errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(data);
    if (!result.success) {
      // Map validation errors to the errors state
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      setErrors(validationErrors);
      return;
    }

    try {
      if (data.id) {
        await updateUser(data);
        clearData();
        onSave();
        setSnackbar({
          open: true,
          message: "Usuário atualizado com sucesso!",
          severity: "success",
        });
        console.log("updated?")
      } else {
        await createUser(data);
        clearData();
        onSave();
        setSnackbar({
          open: true,
          message: "Usuário criado com sucesso!",
          severity: "success",
        });
        console.log("created")
      }
    } catch (error) {
      if (error instanceof ErrorResponse) {
        console.error(
          `Error ${error.statusCode}: ${error.message}`,
          error.details
        );
        setSnackbar({ open: true, message: error.message, severity: "error" }); // Error Snackbar
      } else {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Ocorreu um erro inesperado.",
          severity: "error",
        });
      }
    }
  };

  const toggleSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCancel = () => {
    clearData();
    onSave();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Nome"
        name="name"
        value={data.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        required
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained">
        {data.id ? "Atualizar" : "Cadastrar"}
      </Button>

      {selectedUser && (
        <Button onClick={handleCancel} variant="outlined" sx={{ ml: 2 }}>
          Cancelar Edição
        </Button>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={toggleSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={toggleSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

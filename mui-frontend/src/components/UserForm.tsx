import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "shared";
import { UserInput, userSchema } from "shared";
import { ZodError } from "zod";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  user?: User;
}

export default function UserFormDialog({
  open,
  onClose,
  onSubmit,
  user,
}: Props) {
  const [form, setForm] = useState<UserInput>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserInput, string>>
  >({});

  useEffect(() => {
    if (user) {
      const { name, email, password } = user;
      setForm({ name, email, password });
    } else {
      clearForm();
    }
    setErrors({});
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    try {
      const parsed = userSchema.parse(form);
      onSubmit(parsed);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof UserInput, string>> = {};
        err.errors.forEach(({ path, message }) => {
          const field = path[0] as keyof UserInput;
          fieldErrors[field] = message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const clearForm = () => {
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{user ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            clearForm();
          }}
        >
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {user ? "Atualizar" : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers, updateUser, User } from "shared";
import { useAlert } from "../hooks/useAlert";
import AlertBox from "./AlertBox";
import UserForm from "./UserForm";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { show, message, severity, triggerAlert } = useAlert();

  const loadUsers = async () => {
    const data = await getUsers(page, limit);
    setUsers(data.users);
    setTotalPages(Math.ceil(data.total / limit));
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSubmit = async (data: User) => {
    try {
      if (selectedUser?.id) {
        await updateUser(selectedUser.id, data);
        triggerAlert("Usuário atualizado com sucesso.");
      } else {
        await createUser(data);
        triggerAlert("Usuário criado com sucesso.");
      }
      setOpenForm(false);
      setSelectedUser(undefined);
      await loadUsers();
    } catch (error) {
      triggerAlert(error.message, 3000, "error");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    triggerAlert("Usuário deletado com sucesso.");
    await loadUsers();
  };

  return (
    <Box>
      <AlertBox show={show} message={message} severity={severity} />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Gestão de usuários</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelectedUser(undefined);
            setOpenForm(true);
          }}
        >
          Novo Usuário
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenForm(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id!)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" p={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
          />
        </Box>
      </TableContainer>

      <UserForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </Box>
  );
}

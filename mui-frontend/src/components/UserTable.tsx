import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../service/userService";
import UserForm from "./UserForm";
import { Edit, Delete } from "@mui/icons-material";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const loadUsers = async () => {
    const data = await getUsers(page, limit);
    setUsers(data.users);
    setTotalPages(Math.ceil(data.total / limit));
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleSave = async (user: User) => {
    try {
      if (user.id) {
        await updateUser(user.id, user);
      } else {
        await createUser(user);
      }
      setOpenForm(false);
      setSelectedUser(undefined);
      await loadUsers();
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      await deleteUser(id);
      await loadUsers();
    }
  };

  return (
    <Box>
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
        onSave={handleSave}
        user={selectedUser}
      />
    </Box>
  );
}

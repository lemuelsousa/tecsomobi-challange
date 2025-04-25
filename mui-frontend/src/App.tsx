import { Container } from "@mui/material";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Container sx={{ mt: 8}} maxWidth="md">
      <UserTable />
    </Container>
  );
}

export default App;

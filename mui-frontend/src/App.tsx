import { Container, Typography } from '@mui/material'
import UserTable from './components/UserTable'

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Usuários
      </Typography>
      <UserTable />
    </Container>
  )
}

export default App

import { Layout } from "antd";
import UserPage from "./pages/UserPage";
const { Content, Header, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: 20 }}>
        Gestão de Usuários
      </Header>
      <Content style={{ padding: "24px 50px"}}>
        <UserPage />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Desenvolvido com Ant Design
      </Footer>
    </Layout>
  );
}

export default App;

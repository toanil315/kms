import { BrowserRouter } from "react-router-dom";
import Routes from "@/routes";
import "antd/dist/antd.less";
import { ThemeProvider, Global } from "@emotion/react";
import theme from "@/styles/theme";
import globalStyles from "@/styles/globalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles(theme)} />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

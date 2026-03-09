import "bootstrap/dist/css/bootstrap.min.css"
import "./css/style.css";
import "./css/responsive.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import PublicRoutes from "./routes/PublicRoutes";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    const checkServerHealth = async () => {
      let attempts = 0;
      const maxAttempts = 30;
      
      const loadingToast = toast.loading("Server başlatılıyor...", {
        id: "server-loading"
      });

      while (attempts < maxAttempts) {
        try {
          await fetch(`${API_URL}/api/health`, { 
            mode: 'no-cors',
            cache: 'no-cache'
          });
          toast.dismiss(loadingToast);
          setServerReady(true);
          return;
        } catch (error) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      toast.dismiss(loadingToast);
      toast.error("Server bağlantısı sağlanamadı");
    };

    checkServerHealth();
  }, []);

  if (!serverReady) {
    return (
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <PublicRoutes/>
      <Toaster position="top-center"
        reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;

import { useRouter } from "./utils/router";
import { RouterProvider } from "./utils/router";
import { CurrencyProvider } from "./utils/CurrencyContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Process from "./pages/Process";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

function AppContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    if (currentPath === "/") return <Home />;
    if (currentPath.startsWith("/work")) return <Work />;
    if (currentPath === "/services") return <Services />;
    if (currentPath === "/process") return <Process />;
    if (currentPath === "/about") return <About />;
    if (currentPath === "/pricing") return <Pricing />;
    if (currentPath === "/contact") return <Contact />;
    return <Home />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-ink text-white">
      <Nav />
      <main className="site-main">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </CurrencyProvider>
  );
}
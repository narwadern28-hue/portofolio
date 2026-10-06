import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type Path =
  | "/"
  | "/work"
  | "/services"
  | "/process"
  | "/about"
  | "/pricing"
  | "/contact"
  | `/work/${string}`;

interface RouterContextType {
  currentPath: Path;
  navigate: (path: Path) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<Path>(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return "/";
    return (hash.startsWith("/") ? hash : `/${hash}`) as Path;
  });

  const navigate = (path: Path) => {
    window.location.hash = path === "/" ? "" : path;
    setCurrentPath(path);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const parsedPath = (!hash ? "/" : hash.startsWith("/") ? hash : `/${hash}`) as Path;
      setCurrentPath(parsedPath);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}

import { useEffect, useState } from "react";
import { getCurrentPath } from "../utils/navigation";

export const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const updatePath = () => setPath(getCurrentPath());

    window.addEventListener("popstate", updatePath);
    window.addEventListener("app:navigate", updatePath);

    return () => {
      window.removeEventListener("popstate", updatePath);
      window.removeEventListener("app:navigate", updatePath);
    };
  }, []);

  return path;
};

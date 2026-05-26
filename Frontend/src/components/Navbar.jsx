import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleThemeToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <header className="p-4 border-b">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold">AV</h1>

        <button
          onClick={handleThemeToggle}
          className="p-2 border rounded-md cursor-pointer"
        >
          {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

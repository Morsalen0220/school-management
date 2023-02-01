import { Link, useResolvedPath } from "react-router-dom";
import { useEffect, useState } from "react";

function DropDownIcon({ open = false }) {
  return (
    <span
      className={`inline-block ml-2  ${open ? "-rotate-90" : "rotate-180"}`}>
      &#10094;
    </span>
  );
}

function MenuItem({
  to = "#",
  topLevelMenu = false,
  exact = false,
  children,
  hightLight = false,
  ...props
}) {
  const { pathname } = useResolvedPath();
  let active = pathname.startsWith(to);
  if (active && exact) {
    active = pathname === to || pathname === to + "/";
  }

  return (
    <Link
      className={`inline-block font-sans px-4 text-left border-b-2 ${
        topLevelMenu ? "" : "last:border-b-0 "
      } ${
        active
          ? topLevelMenu
            ? "bg-emerald-300 text-gray-900 border-white font-semibold"
            : "bg-gray-200"
          : "text-black hover:bg-gray-200 "
      } ${!active && hightLight ? "bg-gray-200" : ""} `}
      to={to}
      {...props}>
      {children}
    </Link>
  );
}

export default function Sidebar({ ...props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useResolvedPath();
  const [openMenu, setOpenMenu] = useState([]);

  useEffect(() => {
    if (pathname === "/") return;
    /**
     * This regex will remove everything after 2nd /
     * url - /something/this-part-will-remove - output - something
     */
    const menu = pathname.slice(1).replace(/[/].+/, "");
    setOpenMenu([menu]);
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth > 1024) setIsMenuOpen(true);
  }, []);

  /**
   * @param {string} menu
   * @returns {boolean} is Active
   */
  const isMainMenuOpen = (menu) => {
    return openMenu.includes(menu);
  };

  const toggleMenu = (menu) => {
    if (openMenu.includes(menu))
      return setOpenMenu([...openMenu.filter((item) => item !== menu)]);
    setOpenMenu([...openMenu, menu]);
  };

  return (
    <aside
      className={`relative shadow-xl min-h-screen w-full transition bg-white border-t-2 ${
        isMenuOpen ? "max-w-fit" : "max-w-0"
      }`}>
      <nav className="overflow-hidden transition flex flex-col">
        <MenuItem
          to="/school"
          topLevelMenu={true}
          hightLight={isMainMenuOpen("school")}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("school");
          }}>
          <div className="flex justify-between">
            <span>School</span> <DropDownIcon open={isMainMenuOpen("school")} />
          </div>
        </MenuItem>

        <div
          className={`border-b-2 ${isMainMenuOpen("school") ? "" : "hidden"}`}>
          <div className="flex flex-col ml-2">
            <MenuItem to="/school" exact={true}>
              View
            </MenuItem>
            <MenuItem to="/school/add">Add new</MenuItem>
          </div>
        </div>

        <MenuItem
          to="/users"
          topLevelMenu={true}
          hightLight={isMainMenuOpen("users")}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("users");
          }}>
          <div className="flex justify-between">
            <span> Users</span> <DropDownIcon open={isMainMenuOpen("users")} />
          </div>
        </MenuItem>

        <div
          className={`border-b-2 ${isMainMenuOpen("users") ? "" : "hidden"}`}>
          <div className="flex flex-col ml-2">
            <MenuItem to="/users/admin">Admin</MenuItem>
            <MenuItem to="/users/accountant">Accountant</MenuItem>
            <MenuItem to="/users/student">Student</MenuItem>
            <MenuItem to="/users/librarian">Librarian</MenuItem>
            <MenuItem to="/users/parent">Parent</MenuItem>
            <MenuItem to="/users/teacher">Teacher</MenuItem>
          </div>
        </div>

        <MenuItem
          to="/class"
          topLevelMenu={true}
          hightLight={isMainMenuOpen("class")}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu("class");
          }}>
          <div className="flex justify-between">
            <span>Class</span>
            <DropDownIcon open={isMainMenuOpen("class")} />
          </div>
        </MenuItem>
        <MenuItem to="/notice" topLevelMenu={true}>
          Notice
        </MenuItem>
        <MenuItem to="/exam" topLevelMenu={true}>
          Exam
        </MenuItem>
        <MenuItem to="/book" topLevelMenu={true}>
          Books
        </MenuItem>
      </nav>

      <span
        title={isMenuOpen ? "close menu" : "open menu"}
        className={`inline-block absolute bg-emerald-300 rounded-full text-white font-extrabold font-lato p-1 px-2 cursor-pointer select-none transition top-52 z-20 ${
          isMenuOpen ? "-right-5" : "-left-2 hover:left-1"
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <span className="inline-block rotate-180">&#10148;</span>
        ) : (
          <span>&#10148;</span>
        )}
      </span>
    </aside>
  );
}

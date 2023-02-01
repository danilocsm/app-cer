import { NavLink } from "react-router-dom";

interface NavbarItemProps {
  text: string;
  href: string;
}

function NavbarItem(props: NavbarItemProps) {
  return (
    <NavLink
      to={props.href}
      className={({ isActive }) => `
        ${isActive ? `underline` : ""}
          text-white  font-bold hover:opacity-20 focus:outline-none focus:underline underline-offset-2`}
    >
      {props.text}
    </NavLink>
  );
}

export default NavbarItem;

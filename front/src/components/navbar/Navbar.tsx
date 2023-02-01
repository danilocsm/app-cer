import { HomeLogo } from "../icons/index";
import NavbarItem from "./NavbarItem";
import DropMenu from "../DropMenu";
import { Link } from "react-router-dom";

const navItems = [
  { title: "Utensílios", href: "items" },
  { title: "Atividades", href: "activities" },
  { title: "Depoimentos", href: "testimonials" },
  { title: "Dúvidas", href: "help" },
  { title: "Agente de saúde", href: "admins" },
];

function Navbar() {
  return (
    <nav>
      <div className="static flex flex-row justify-start gap-2 items-center w-screen h-[72px] bg-cerBlue mx-auto sm:px-6 opacity-100 rounded-b-[20px] shadow-cerShadow">
        <Link to="">
          <HomeLogo className="w-[181px] h-[46px]focus:outline-none hover:animate-pulse focus:animate-puls " />
        </Link>
        <div className="hidden md:block">
          <div className="flex flex-row items-center gap-7">
            {navItems.map((navItem) => {
              return (
                <NavbarItem
                  text={navItem.title}
                  href={navItem.href}
                  key={navItem.title}
                />
              );
            })}
          </div>
        </div>
        <div className="md:hidden absolute right-14 top-6">
          <DropMenu title="Menu" items={navItems} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

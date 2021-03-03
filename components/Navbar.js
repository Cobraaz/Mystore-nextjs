import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const isActive = (route) => (route === router.pathname ? "active" : "");
  return (
    <nav>
      <div className="nav-wrapper #1565c0 blue darken-3">
        <Link href="/">
          <a className="brand-logo left">Logo</a>
        </Link>
        <ul id="nav-mobile" className="right ">
          <li className={isActive("/login")}>
            <Link href="/login">
              <a>login</a>
            </Link>
          </li>

          <li className={isActive("/signup")}>
            <Link href="/signup">
              <a>signup</a>
            </Link>
          </li>
          <li className={isActive("/create")}>
            <Link href="/create">
              <a>create</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

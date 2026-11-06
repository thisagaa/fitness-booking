import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/classes">Classes</Link>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default Layout
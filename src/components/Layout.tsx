import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Layout() {
  const token = useAuthStore((state => state.token))
  const signOut = useAuthStore((state) => state.signOut)
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/classes">Classes</Link>
          {!token && (
            <>
              {' | '}
              <Link to="/login">Log in</Link>
            </>
          )}
        </nav>

        {token && (
          <>
            <p role="status">Signed in</p>
            <button type="button" onClick={signOut}>Log out</button>
          </>
        )}
      </header>

      <Outlet /> {/* the spot below navbar where the current page goes. <Outlet /> tells react router where to display matching child page */}
    </>
  )
}

export default Layout
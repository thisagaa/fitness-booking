import { Link } from "react-router-dom"

function HomePage() {
  return (
    <main>
      <h1>Fitness Class Booking</h1>
      <p>Find your next fitness class and book a spot.</p>
      <Link to="/classes">Browse classes</Link>
    </main>
  )
}

export default HomePage
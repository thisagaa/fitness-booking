import { Link } from "react-router-dom"
import homeGym from '../assets/home.png'
function HomePage() {
  return (
    <main 
      className="home-hero"
      style={{ backgroundImage: `linear-gradient(#0009, #0009), url("${homeGym}")` }}
    >
      <h1>Fitness Class Booking</h1>
      <p>Find your next fitness class and book a spot.</p>
      <Link to="/classes">Browse classes</Link>
    </main>
  )
}

export default HomePage
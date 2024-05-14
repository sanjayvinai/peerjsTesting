import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate("/sender")}>Sender</button>
      <button onClick={() => navigate("/receiver")}>Receiver</button>
    </div>
  )
}

export default Home

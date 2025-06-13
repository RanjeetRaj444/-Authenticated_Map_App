import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading your route planner...</p>
      </div>
    </div>
  )
}

export default Loading
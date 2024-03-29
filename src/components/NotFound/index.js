import Header from '../Header'
import './index.css'
const NotFound = () => (
  <>
    <Header />
    <div className="notfound-container">
      <div className="notfound-img-container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
      </div>
      <h1 className="heading">Page Not Found</h1>
      <p className="para">
        We are sorry, the page you requested could not found
      </p>
    </div>
  </>
)
export default NotFound

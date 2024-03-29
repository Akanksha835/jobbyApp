import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
const Home = props => {
  console.log(props)
  const onClickFindjobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">
          Find the Jobs That <br />
          Fits Your Life
        </h1>
        <p className="home-para">
          Millions of poeple are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="retry-btn-link">
          <button
            type="button"
            className="find-jobs-btn"
            onClick={this.onClickFindjobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home

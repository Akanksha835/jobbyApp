import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
const JobCardItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    title,
    id,
    location,
    packagePerAnnum,
  } = item
  return (
    <>
      <Link to={`/jobs/${id}`} className="link">
        <li className="job-item-container">
          <div className="first-part-container">
            <div className="img-title-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="company logo"
              />
              <div className="title-rating-container">
                <h1 className="titl-heading">{title}</h1>
                <div className="star-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating-txt">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-job-type-container">
                <div className="location-icon-location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-txt">{location}</p>
                </div>
                <div className="employment-type-employment-icon-container">
                  <p className="job-type">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="second-part-container">
            <h1 className="description-job-heading">Description</h1>
            <p className="description-para">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}
export default JobCardItem

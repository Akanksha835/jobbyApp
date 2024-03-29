import {MdLoactionOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'
const SimilarJobs = props => {
  const {similarJobsData} = this.props
  const {
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobsData
  console.log(similarJobsData)
  return (
    <li className="similar-job-container">
      <div className="img-job-title-container">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-job-rating-container">
          <h1 className="title-heading">{title}</h1>
          <div className="star-job-rating-container">
            <AiFillStar className="star-job-icon" />
            <p className="rating-job-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-part-job-container">
        <h1 className="description-job-heading">Description</h1>
        <p className="description-job-para">{jobDescription}</p>
      </div>
      <div className="location-job-details-container">
        <div className="location-job-icon-location-container">
          <MdLoactionOn className="loaction-job-icon" />
          <p className="location-job">{location}</p>
        </div>
        <div className="employment-job-type-icon-employment-type-container">
          <p className="job-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs

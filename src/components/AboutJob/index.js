import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLoactionOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class AboutJob extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getJobData()
  }
  getJobData = async() => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = 'https://apis.ccbp.in/jobs/${id}'
    const optionsJobsData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobsData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
            companyLogoUrl:eachItem.company_logo_url,
            companyWebsiteUrl:eachItem.company_website_url,
            employmentType:eachItem.employment_type,
            id:eachItem.id,
            jobDescription:eachItem.job_description,
            lifeAtCompany:{
                description:eachItem.life_at_company_description,
                imageUrl:eachItem.life_at_company_image_url,
            },
            location:eachItem.location,
            packagePerAnnum:eachItem.package_per_annum,
            rating:eachItem.rating,
            skills:eachItem.skills.map(eachSkill=>({
                imageUrl:eachSkill.image_url,
                name:eachSkill.name,
            })),
            title:eachItem.title,
        }),
      )
      const updatedSimilarJobDetails=fetchedJobData.similar_jobs.map(eachItem=>({
        companyLogoUrl:eachItem.company_logo_url,
        id:eachItem.id,
        jobDescription:eachItem.job_description,
         employmentType:eachItem.employment_type,
         location:eachItem.location,
         rating:eachItem.rating,
         title:eachItem.title,


      }),
      )
      this.setState({jobDataDetails:updatedJobDetailsData,
      similarJobsData:updatedSimilarJobDetails,
      apiStatus:apiStatusConstants.success})
    }else{
        this.setState({apiStatus:apiStatusConstants.failure})
    }
  }
  renderJobDetailsSuccesView=()=>{
    const {jobDataDetails,similarJobsData}=this.state
    if(jobDataDetails.length>=1){
        const {companyLogoUrl,companyWebsiteUrl,employmentType,id,
        location,rating,jobDescription,packagePerAnnum,
        skills,title}=jobDataDetails[0]
        
        return(

            <>
            <div className="job-item-container">
            <div className="first-part-container">
            <div className="img-title-container">
            <img src={companyLogoUrl} className="company-logo" alt='job details company logo'/>
            <div className="title-rating-container">
            <h1 className="titl-heading">{title}</h1>
            <div className="star-rating-container">
            <AiFillStar className="star-icon"/>
            <p className='rating-txt'>{rating}</p>
            </div>
            </div> 
            </div>
            <div className="location-package-container">
            <div className="location-job-type-container">
            <div className="location-icon-location-container">
            <MdLoactionOn className="location-icon"/>
            <p className="location-txt">{location}</p>
            </div>
            <div className="employment-type-employment-icon-container">
            <p className="job-type">{employmentType}</p>
            </div>
            <div className='package-container'>
            <p className="package">{packagePerAnnum}</p>
            </div>
            </div>
            </div>
            <hr className="hr-line"/>
            <div className="second-part-container">
            <div className="description-visit-container">
            <h1 className="description-job-heading">Description</h1>
            <a className="visit-anchor" href={companyWebsiteUrl}>Visit <BiLinkExternal/>
            </a>
            </div>
            <p className="description-para">{jobDescription}</p>

            </div>
            <h1>Skills</h1>
            <ul className="ul-job-details-container">
            {skills.map(eachItem=>(
                <li className="li-job-details-container" key={eachItem.name}>
                <img src={eachItem.imageUrl}
                alt={eachItem.name}
                className="skill-img"/>
                <p>{eachItem.name}</p>

                </li>
            ))}
            </ul>
            <div className="life-at-company-container">
            <div className='life-heading-para'>
            <h1>Life at Company</h1>
            <p>{lifeAtCompany.description}</p>

            </div>
            <img src={lifeAtCompany.imageUrl} alt='life at company'/>
            </div>
            </div>
            <h1 className="similar-job-heading">Similar Jobs</h1>
            <ul className="similar-jobs-ul-container">
            {similarJobsData.map(eachItem=>(
                <SimilarJobs key={eachItem.id}
                similarJobsData={eachItem}
                employmentType={employmentType}
                />
            ))}
            </ul>
          </>
        )
    }
    return null
  }
  onRetryJobDetailsAgain=()=>{
    this.getJobData()
  }
  renderFailureView=()=>(
    <div className="fialure-container">
    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
    alt="failure view"
    />
    <h1>Oops! Something Went Wrong</h1>
    <p>we cannot seem to find the page you are looking for.</p>
    <div className="btn-container-failure">
    <button type="button"
    className="failure-job-details-btn"
    onClick={this.onRetryJobDetailsAgain}>Retry</button>

    </div>
    </div>
  )
  renderLoadingView=()=>(
    <div className="job-loading" data-testid="loader">
    <Loader type="ThreeDots" color=" #4f46e5" height={50} width={50}/>
    </div>
  )
  renderJobDetails=()=>{

    const {apiStatus}=this.state

    switch(apiStatus){
      case apiStatusConstants.success:
       return this.renderJobDetailsSuccesView()
      case apiStatusConstants.failure:
       return this.renderFailureView()
      case apiStatusConstants.inProgress:
       return this.renderLoadingView()
      default:
      return null
    }
  }
  render(){
    return(
      <>
      <Header/>
      <div className="job-details-container-view">
      {this.renderJobDetails()}
      </div>
      </>

    )
  }

}
export default AboutJob

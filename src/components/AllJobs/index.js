import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import JobCardItem from '../JobCardItem'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class AllJobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
    jobsData: [],
    apiJobstatus: apiStatusConstants.initial,
    activeChcekBoxList: [],
    activeSalaryRangeId: '',
    searchInput: '',
  }
  componentDidMount() {
    this.getProfileData(), this.getJobsData()
  }
  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const profile = data.profile_details
      const updatedProfileData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      console.log(updatedProfileData)
      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeChcekBoxList, activeSalaryRangeId, searchInput} = this.state
    const type = activeChcekBoxList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url =
      'https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${activeSalaryRangeId}&search=${searchInput}'
    const option = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const filteredJobList = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,

        jobDescription: each.job_description,
        rating: each.rating,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        title: each.title,
      }))
      console.log(filteredJobList)
      this.setState({
        jobsData: filteredJobList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  onChnageSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onSubmitSearchInput = () => {
    this.getJobsData()
  }
  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }
  onSelectSalaryRange = event => {
    this.setState({activeSalaryRangeId: event.target.id}, this.getJobsData)
  }
  onClickCheckBox = event => {
    const {activeChcekBoxList} = this.state
    if (activeChcekBoxList.includes(event.target.id)) {
      const updatedList = activeChcekBoxList.filter(
        each => each !== event.target.id,
      )
      this.setState({activeChcekBoxList: updatedList}, this.getJobsData)
    } else {
      this.setState(
        prevstate => ({
          activeChcekBoxList: [
            ...prevstate.activeChcekBoxList,
            event.target.id,
          ],
        }),
        this.getJobsData,
      )
    }
  }
  onSuccessProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }
  onSuucessJobsView = () => {
    const {jobsData} = this.state
    const noOfJobs = jobsData.length > 0
    return noOfJobs ? (
      <>
        <ul className="ul-job-items-container">
          {jobsData.map(each => (
            <JobCardItem key={each.id} item={each} />
          ))}
        </ul>
      </>
    ) : (
      <div className="no-jobs-container">
        <img
          className="no-job-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>we could not find any jobs. Try other filters.</p>
      </div>
    )
  }
  onRetryProfile = () => this.getProfileData()
  onRetryJobs = () => this.getJobsData()
  onFailProfileview = () => (
    <>
      <h1>profile Fail</h1>
      <button type="button" onClick={this.onRetryProfile}>
        Retry
      </button>
    </>
  )
  onFailJobsView = () => (
    <>
      <div className="fail-img-btn-container">
        <img
          className="fail-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="fail-heading">Oops! Something Went Wrong</h1>
        <p className="fail-para">
          we cannot seem to find the page you are looking for.
        </p>
        <div className="job-failure-btn-container">
          <button className="fail-btn" type="button" onClick={this.onRetryJobs}>
            retry
          </button>
        </div>
      </div>
    </>
  )
  onLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )
  onGetCheckboxesView = () => (
    <ul className="checkbox-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onClickCheckBox}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )
  onGetRadiobuttonView = () => (
    <ul className="radio-btn-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.activeSalaryRangeId}>
          <input
            className="radio"
            typ="radio"
            name="option"
            id={eachItem.activeSalaryRangeId}
            onChange={this.onSelectSalaryRange}
          />
          <label className="label" htmlFor={eachItem.activeSalaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )
  onRenderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.onLoadingView()
      case apiStatusConstants.failure:
        return this.onFailProfileview()
      case apiStatusConstants.success:
        return this.onSuccessProfileView()
      default:
        return null
    }
  }
  onRenderJobs = () => {
    const {apiJobstatus} = this.state
    switch (apiJobstatus) {
      case apiStatusConstants.inProgress:
        return this.onLoadingView()
      case apiStatusConstants.failure:
        return this.onFailJobsView()
      case apiStatusConstants.success:
        return this.onSuucessJobsView()
      default:
        return null
    }
  }
  onRenderSearch = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={this.onChnageSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.onSubmitSearchInput}
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </>
    )
  }
  render() {
    return (
      <>
        <Header />
        <div className="body-container">
          <div className="sm-search-container">{this.onRenderSearch()}</div>
          <div className="side-bar-container">
            {this.onRenderProfile()}
            <hr className="hr-line" />
            <h1 className="txt">Type of Employment</h1>
            {this.onGetCheckboxesView()}
            <hr className="hr-line" />
            <h1 className="txt">Salary Range</h1>
            {this.onGetRadiobuttonView()}
          </div>
          <div className="jobs-container">
            <div className="lg-search-container">{this.onRenderSearch()}</div>
            {this.onRenderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs

// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teamList: []}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
    }))
    this.setState({teamList: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderIplTeams = () => {
    const {teamList} = this.state

    return (
      <ul className="teams-list">
        {teamList.map(eachItem => (
          <TeamCard key={eachItem.id} teamData={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
              alt=" ipl logo"
            />
            <h1 className="ipl-dashboard-heading">Ipl Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderIplTeams()}
        </div>
      </div>
    )
  }
}

export default Home

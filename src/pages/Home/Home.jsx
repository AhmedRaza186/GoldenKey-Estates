import React from 'react'
import './Home.scss'
import SearchBar from '../../components/searchBar/SearchBar'

const Home = () => {
  return (
    <div className='homePage'>
      
      <div className="textContainer">
        <div className="wrapper">

          <div className="title">
            <h1>Find Real Estate & Get Your Dream Place</h1>
          </div>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Natus, ducimus laborum culpa fugiat provident itaque unde
            distinctio earum recusandae? Neque, rerum quibusdam quis
            laudantium hic distinctio ratione amet explicabo ullam!
          </p>

          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>

            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>

            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>

        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="Real Estate" />
      </div>

    </div>
  )
}

export default Home


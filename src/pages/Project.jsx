import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom';


function Project() {
  const [searchKey, setSearchKey] = useState("");
  const [allProject, setAllProject] = useState([]);
  const [isToken, setIsToken] = useState(false);

  const getAllProject = async () => {
    console.log('Search key', searchKey);
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectApi(reqHeader, searchKey)
      console.log("user project");
      console.log(result);
      setAllProject(result.data)
    }
  }

  useEffect(() => {
    getAllProject()
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  }, [])
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h3 className='text-center mt-5'>All Projects</h3>
      </div>
      {isToken ?
        <div>
          <div className='row my-4'>
            <div className='col-md-4'></div>
            <div className='col-md-4 d-flex'>
              <input type="text" className='form-control' placeholder='Search By Technology' onChange={(e) => setSearchKey(e.target.value)} />
              <i class="fa-solid fa-magnifying-glass" style={{ marginTop: "12px", marginLeft: "-28px", color: "lightgray" }}></i>
            </div>
            <div className='col-md-4'></div>
          </div>

          <div className='container row my-5 ms-5'>
            {
              allProject.length > 0 ?
                allProject.map((item) => (
                  <div className='col-md-3 mb-4'>
                    <ProjectCard project={item} />
                  </div>
                )) :
                <p>No Projects found</p>
            }
          </div>
        </div> :
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://imgs.search.brave.com/plfT99vT5bvSS0KU066xe3-h29Nc1WV9BDvCXB1MVAU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/aWVzLmZyZWVwaWts/YWJzLmNvbS9zdG9y/YWdlLzI4NTEwL0xv/Z2luLVBBTkEtMDEu/c3Zn" width="300px" className='mt-3' alt="" />
          <p className='m-4'>Please
            <Link to={'/login'} className=' ms-1' style={{textDecoration:"none",color:"blue"}}>Login</Link> To View All Projects
          </p>
        </div>
      }
    </>
  )
}

export default Project
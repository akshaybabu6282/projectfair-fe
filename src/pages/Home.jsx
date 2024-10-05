import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import home_image from '../assets/project img.jpg'
import ProjectCard from '../components/ProjectCard'
import { getHomeProject } from '../services/allApi'

function Home() {
    const [isLogin, setIsLogin] = useState(false);
    const [homeProject, setHomeProject] = useState([]);

    const getHomeProjectItems = async () => {
        const result = await getHomeProject();
        console.log("Home projects");
        console.log(result);
        setHomeProject(result.data);
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLogin(true)
        }
        getHomeProjectItems();
    }, [])

    return (
        <>
            <div className='container-fluid bg-success p-4 mb-4 mt-4' style={{ width: "100%", height: "75vh" }}>
                <Row>
                    <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
                        <div>
                            <h3 className='text-light'>Project Fair</h3>
                            <h6>One stop destination for many software projects</h6>
                        </div>
                        {
                            isLogin ?
                                <Link to={'/dashboard'}>
                                    <button className='btn btn-outline-light my-4'>MANAGE PROJECTS<i class="fa-solid fa-arrow-right ms-2"></i></button>
                                </Link> :
                                <Link to={'/login'}>
                                    <button className='btn btn-outline-light my-4'>GET STARTED<i class="fa-solid fa-arrow-right ms-2"></i></button>
                                </Link>
                        }
                    </Col>
                    <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-5'>
                        <img src={home_image} width='75%' alt="" />
                    </Col>
                </Row>
            </div>
            <div className='container-fluid'>
                <h2 className='text-center my-5'>Explore Our Projects</h2>
                <marquee scrollAmount={20}>
                    <div className='row'>
                        {
                            homeProject?.length > 0 ?
                                homeProject.map((item) => (
                                    <div className='col-md-4 justify-content-center d-flex p-4' style={{ width: "400px" }}>
                                        <ProjectCard project={item} />
                                    </div>
                                )) :
                                <p>No Project found</p>
                        }
                    </div>
                </marquee>
                <Link to={'/project'} style={{ textDecoration: "none", color: "blue" }}>
                    <h5 className='text-center' >See More Projects</h5>
                </Link>
            </div>
        </>
    )
}

export default Home
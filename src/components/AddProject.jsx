import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addprojectApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { addProjectResponseContext } from '../context/ContextShareNew';

function AddProject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("")
    //useConntext hook is used to access state created inside contextShare
    const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext);
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        language: '',
        github: '',
        website: '',
        overview: '',
        projectImage: ''
    })
    //state for showing preview image
    const [preview, setPreview] = useState("")
    useEffect(() => {
        if (projectDetails.projectImage) {
            // To create image url for preview URL.createObjectURL('Image value')
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    const handleAddProject = async (e) => {
        e.preventDefault();
        const { title, language, github, website, overview, projectImage } = projectDetails;
        if (!title || !language || !github || !website || !overview || !projectImage) {
            alert("Please fill the form completely")
        } else {
            //here we are also uploading a file,so we should send body in the form of FormData
            const reqBody = new FormData();
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            //here content type we are passing is multipart FormData, so specific request header needed
            const reqHeader = {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
            const result = await addprojectApi(reqBody, reqHeader)
            if (result.status == 200) {
                setAddProjectResponse(result.data);
                toast.success(`${title} uploded successufully`)
                setProjectDetails({
                    title: '',
                    language: '',
                    github: '',
                    website: '',
                    overview: '',
                    projectImage: ''
                })
                setPreview("")
                handleClose()
            } else if (result.status == 409) {
                toast.warning(`${title} already exist`)
            }
            else {
                toast.error(`${title} uploded failed`)
            }
        }
    }

    const handleClose1 = () => {
        handleClose()
        setPreview("")
        setProjectDetails({
            title: '',
            language: '',
            github: '',
            website: '',
            overview: '',
            projectImage: ''
        })
    }

    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
            <Modal show={show} onHide={handleClose} size={'lg'}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>ADD PROJECT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor="projectImg">
                                <input type="file" style={{ display: "none" }} id='projectImg'
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img className='w-100' src={preview ? preview : "https://imgs.search.brave.com/VSLi9jSoG-pn_vdjTbeywhjH7vIJLtle5wtWJGKkeCo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc"} alt="" />
                            </label>
                        </div>
                        <div className='col-md-6'>
                            <div>
                                <input type="text" placeholder='Project Title' className='form-control mb-3' value={projectDetails.title}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                                <input type="text" placeholder='Language Used' className='form-control mb-3' value={projectDetails.language}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                                <input type="text" placeholder='Github Link' className='form-control mb-3' value={projectDetails.github}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                                <input type="text" placeholder='Website Link' className='form-control mb-3' value={projectDetails.website}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                                <textarea placeholder='Project Overview' rows={4} className='form-control mb-3' value={projectDetails.overview}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose1}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleAddProject}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProject
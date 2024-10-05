import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../services/baseurl";
import { editUserProjectApi } from "../services/allApi";
import { editProjectResponseContext } from "../context/ContextShareNew";

function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");

  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: ""
  });

  const handleUpdate = async (e) => {
    e.preventDefault(e);
    console.log("Update value");
    console.log(projectDetails);
    const { title, language, github, website, overview, projectImage, id } = projectDetails;
    if (!title || !language || !github || !website || !overview || !id) {
      alert("Please fill the form completely")
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview ? reqBody.append("projectImage", projectImage) :
        reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token")
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log("=====update project result");
        console.log(result);
        if (result.status === 200) {
          handleClose()
          setEditProjectResponse(result)
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log("=====update project result");
        console.log(result);
        if (result.status === 200) {
          handleClose()
          setEditProjectResponse(result)
        }
      }
    }
  }

  const handleClose1 = () => {
    handleClose()
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  return (
    <>
      <i class="fa-solid fa-pen-to-square" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">ADD PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="projectImg">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="projectImg"
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                />
                <img
                  className="w-100"
                  src={preview ? preview : `${BASE_URL}/uploads/${project?.projectImage}`}
                  alt=""
                />
              </label>
            </div>
            <div className="col-md-6">
              <div>
                <input
                  onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                  value={projectDetails.title}
                  type="text"
                  placeholder="Project Title"
                  className="form-control mb-3"
                />
                <input
                  onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                  value={projectDetails.language}
                  type="text"
                  placeholder="Language Used"
                  className="form-control mb-3"
                />
                <input
                  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                  value={projectDetails.github}
                  type="text"
                  placeholder="Github Link"
                  className="form-control mb-3"
                />
                <input
                  onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                  value={projectDetails.website}
                  type="text"
                  placeholder="Website Link"
                  className="form-control mb-3"
                />
                <textarea value={projectDetails.overview} placeholder="Project Overview" rows={4} className="form-control mb-3"
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            CANCEL
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;

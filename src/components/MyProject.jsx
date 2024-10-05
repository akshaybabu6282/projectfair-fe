import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import { deleteProjectApi, getUserProjectApi } from "../services/allApi";
import { useContext } from "react";
import { addProjectResponseContext, editProjectResponseContext } from "../context/ContextShareNew";
import { toast } from "react-toastify";

function MyProject() {
  const [userProject, setUserProject] = useState([]);

  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
    const result = await getUserProjectApi(reqHeader);
    console.log("User project");
    console.log(result);
    setUserProject(result.data);
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteProjectApi(id, reqHeader)
    console.log("delete response");
    console.log(result);
    if (result.status === 200) {
      toast.success("Project deleted successfully")
      getUserProjects()
    } else {
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    getUserProjects();
  }, [addProjectResponse, editProjectResponse]);

  return (
    <>
      <div className="shadow p-5 mb-5">
        <div className="d-flex mt-4">
          <h5 className="text-success me-auto">My Projects</h5>
          <AddProject />
        </div>
        {userProject?.length > 0 ? (
          userProject.map((item) => (
            <div className="p-3 mt-4 rounded-2 d-flex bg-light">
              <h5>{item.title}</h5>
              <div className="d-flex ms-auto align-items-center">
                <EditProject project={item} />
                <a href={item.website} target="_blank" className="btn"><i class="fa-solid fa-link"></i></a>
                <a href={item.github} target="_blank" className="btn"><i class="fa-brands fa-github"></i></a>
                <button className="btn" onClick={() => handleDelete(item._id)}>
                  <i class="fa-solid fa-trash text-danger"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Projects</p>
        )}
      </div>
    </>
  );
}

export default MyProject;

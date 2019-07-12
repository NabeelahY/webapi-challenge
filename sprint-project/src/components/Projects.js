import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProject] = useState([]);
  const getProjects = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => setProject(res.data))
      .catch(err => err);
  };

  useEffect(getProjects, []);

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <Link to={`/project/${project.id}`}>{project.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Projects;

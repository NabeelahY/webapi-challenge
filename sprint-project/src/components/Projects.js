import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
};

export default Projects;

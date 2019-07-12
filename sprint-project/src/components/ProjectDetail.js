import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectDetail = props => {
  const [project, setProject] = useState({});
  const getProject = id => {
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(err => err);
  };

  useEffect(() => getProject(props.match.params.id), [props.match.params.id]);

  return (
    <div>
      <h1>{project.name}</h1>
      <div>{project.description}</div>
    </div>
  );
};

export default ProjectDetail;

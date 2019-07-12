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
      <h3>Actions</h3>
      <div>
        {project.actions &&
          project.actions.map(action => (
            <div key={action.id}>
              <div>{action.description}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectDetail;

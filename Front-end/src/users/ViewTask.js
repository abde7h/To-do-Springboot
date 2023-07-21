import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTask() {

  const [tasks, setTasks] = useState({
    title: "",
    description: ""
  })

  const { id } = useParams();

  useEffect(() => {
    const loadTasks = async () => {
      const result = await axios.get(`http://localhost:8080/task/${id}`);
      setTasks(result.data);
    };

    loadTasks();
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center ,-4">View Task</h2>

          <div className="card">
            <div className="card-header">
              Details of task: {tasks.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>title: {tasks.title}</b>
                </li>
                <li className="list-group-item">
                  <b>description: {tasks.description}</b>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>{" "}
    </div>
  );
}

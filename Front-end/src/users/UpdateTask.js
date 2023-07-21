import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateTask() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });

  const { title, description } = tasks;

  const onInputChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  const loadTasks = useCallback(async () => {
    const url = `http://localhost:8080/tasks/${id}`;
    console.log("URL:", url);
    try {
      const result = await axios.get(url);
      setTasks(result.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [id]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/update/${id}`, tasks);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center">Edit Task</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter a title"
                name="title"
                value={title}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter a description"
                name="description"
                value={description}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "../COMPONENTS/ToDo.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import edit from "../edit.png";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ToDo = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:7000/view");
        setPendingTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleTaskCompletion = (taskId) => {
    const completedTask = pendingTasks.find((task) => task._id === taskId);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
      setPendingTasks(pendingTasks.filter((task) => task._id !== taskId));
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await axios.put(`http://localhost:7000/edit/${editingTask._id}`, {
          todoName: taskInput,
        });
        const updatedTasks = pendingTasks.map((task) =>
          task._id === editingTask._id ? { ...task, todoName: taskInput } : task
        );
        setPendingTasks(updatedTasks);
        setEditingTask(null);
      } else {
        const response = await axios.post("http://localhost:7000/add", {
          todoName: taskInput,
        });
        setPendingTasks([...pendingTasks, response.data]);
      }
      setTaskInput("");
    } catch (error) {
      console.error("Error handling task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskInput(task.todoName);
  };

  return (
    <div className="main">
      <Form className="todo" onSubmit={(e) => e.preventDefault()}>
        <h5 className="heading">Pending</h5>
        <div className="list">
          {pendingTasks.map((task) => (
            <Row key={task._id}>
              <Col className="col1">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    onChange={() => handleTaskCompletion(task._id)}
                    label={task.todoName}
                  />
                </Form.Group>
              </Col>
              <Col className="col-3">
                <button
                  className="editiconbtn"
                  onClick={() => handleEdit(task)}
                >
                  <img className="editicon" src={edit} alt="" />
                </button>
              </Col>
            </Row>
          ))}
        </div>
        <h5 className="heading">Completed</h5>
        <div className="completedList">
          {completedTasks.map((task) => (
            <Form.Group
              key={task._id}
              className="mb-3"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                defaultChecked={true}
                label={task.todoName}
              />
            </Form.Group>
          ))}
        </div>

        <div className="input">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="addedit"
              style={{ borderRadius: "20px", marginTop: "10px" }}
              value={taskInput}
              onChange={handleInputChange}
              type="text"
              placeholder="Add Task"
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleSubmit}>
            {editingTask ? "Save" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ToDo;

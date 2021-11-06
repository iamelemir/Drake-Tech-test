/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  InfoCircleOutlined,
  UserOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import {
  Form,
  Modal,
  Tooltip,
  Input,
  Button,
  Select,
  Table,
  Space,
  Card,
  Spin,
  Row,
  Col,
  Checkbox,
} from 'antd';

import '../style/style.css';
import axios from 'axios';

const API_ID = '78c80b4c6a4f40c8b200d43f5dfe22ef';

async function fetchTodo() {
  try {
    const res = await axios.get(`https://crudcrud.com/api/${API_ID}/todos`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

function useGetTodos() {
  const [todo, setTodo] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const fetch = async () => {
    try {
      setLoadingTodos(true);
      const data = (await fetchTodo()) || [];
      setTodo(data);
      setLoadingTodos(false);
    } catch (error) {
      console.error(error);
    }
  };

  const refetch = async () => {
    await fetch();
  };

  useEffect(() => {
    fetch();
  }, []);
  return { todo, loadingTodos, refetchTodo: refetch };
}

const Todo = () => {
  const [showUpdateTodoForm, setShowUpdateTodoForm] = useState(false);
  const [todoTobeUpdate, setTodoTobeUpdate] = useState(null);

  const { todo, loadingTodos, refetchTodo } = useGetTodos();
  const usersDataSource = todo.map((todos) => ({ ...todos, key: todos._id }));

  async function deleteTodos(id) {
    try {
      await axios
        .delete(`https://crudcrud.com/api/${API_ID}/todos/${id}`)
        .then((res) => {
          refetchTodo();
        });
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Days',
      dataIndex: 'daysForTask',
      key: 'daysForTask',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Task Finish state',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowUpdateTodoForm(true);
                setTodoTobeUpdate(record);
              }}
            >
              Update
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                deleteTodos(record._id);
              }}
            >
              Delete
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <Row>
      <Col span={6}>
        <Card>
          <RegitreTodosForm onTodoAdded={() => refetchTodo()} />
        </Card>
      </Col>
      <Col span={18} style={{ height: '100%' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="default" onClick={refetchTodo}>
              Refetch data
            </Button>
            {loadingTodos ? (
              <Spin size="large" />
            ) : (
              <Table columns={columns} dataSource={usersDataSource}></Table>
            )}
          </Space>
        </Card>
        <UpdateTodoForm
          todo={todoTobeUpdate}
          isVisible={showUpdateTodoForm}
          onCancel={() => {
            setShowUpdateTodoForm(false);
          }}
          onTodoUptated={() => {
            setShowUpdateTodoForm(false);
            refetchTodo();
          }}
        />
      </Col>
    </Row>
  );
};

function RegitreTodosForm({ onTodoAdded }) {
  const [form] = Form.useForm();
  const [taskCompleted, setTaskCompleted] = useState(false);
  async function insertTodo(todo) {
    try {
      await axios.post(`https://crudcrud.com/api/${API_ID}/todos`, todo);
      form.resetFields();
      onTodoAdded && onTodoAdded();
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(e) {
    setTaskCompleted(e.target.checked);
  }

  function onFinish(values) {
    const { username, daysForTask, task } = values;
    const todo = {
      username,
      daysForTask,
      task,
      isCompleted: taskCompleted ? 'YES' : 'NO',
    };
    insertTodo(todo);
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <h1>Register To-dos</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Username is required',
          },
        ]}
      >
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </Form.Item>
      <Form.Item
        name="daysForTask"
        rules={[
          {
            required: true,
            message: 'This field is required',
          },
        ]}
      >
        <Input
          placeholder="Days for finish task"
          prefix={<FunctionOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </Form.Item>
      <Form.Item
        name="task"
        rules={[
          {
            required: true,
            message: 'Task is required',
          },
        ]}
      >
        <Select
          placeholder="Select your type Task"
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        >
          <Select.Option value="ORGANIZATION">Organization</Select.Option>
          <Select.Option value="PROGRAMMING">Programming</Select.Option>
          <Select.Option value="TESTER">Tester</Select.Option>
          <Select.Option value="EVALUATION">Evaluation</Select.Option>
          <Select.Option value="REVIEW">Review</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="isCompleted" label="is completed?">
        <Checkbox onChange={onChange} checked={taskCompleted}></Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add task
        </Button>
      </Form.Item>
    </Form>
  );
}

function UpdateTodoForm({ todo, isVisible, onCancel, onTodoUptated }) {
  const todoId = todo?._id;
  const [form] = Form.useForm();
  const [taskCompleted, setTaskCompleted] = useState(
    todo?.isCompleted === 'YES' ? true : false
  );

  if (todo) {
    // user.married = user.married === 'YES' ? 1 : 0;
    form.setFieldsValue(todo);
  }

  function onChange(e) {
    setTaskCompleted(e.target.checked);
  }

  async function updateTodo(todo) {
    try {
      await axios.put(
        `https://crudcrud.com/api/${API_ID}/todos/${todoId}`,
        todo
      );
      form.resetFields();
      onTodoUptated && onTodoUptated();
    } catch (error) {
      console.error(error);
    }
  }

  function onFinish(values) {
    const { username, daysForTask, task } = values;
    const todo = {
      username,
      daysForTask,
      task,
      isCompleted: taskCompleted ? 'YES' : 'NO',
    };
    updateTodo(todo);
  }

  return (
    <>
      <Modal
        title="User information"
        visible={isVisible}
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Username is required',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="daysForTask"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
            ]}
          >
            <Input
              prefix={<FunctionOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="task"
            rules={[
              {
                required: true,
                message: 'Task is required',
              },
            ]}
          >
            <Select
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            >
              <Select.Option value="ORGANIZATION">Organization</Select.Option>
              <Select.Option value="PROGRAMMING">Programming</Select.Option>
              <Select.Option value="TESTER">Tester</Select.Option>
              <Select.Option value="EVALUATION">Evaluation</Select.Option>
              <Select.Option value="REVIEW">Review</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="isCompleted" label="is completed?">
            <Checkbox onChange={onChange} checked={taskCompleted}></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Todo;

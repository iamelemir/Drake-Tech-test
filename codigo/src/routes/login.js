import { Form, Input, Button, Card, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { fakeLoginEndpoint } from '../api/login';
import { connect } from 'react-redux';
import { login } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ session, login }) {
  const [loginError, setLoginError] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  const onFinish = (values) => {
    const result = fakeLoginEndpoint(values);
    if (result.error) {
      setLoginError(result.error);
    } else {
      setLoginError(null);
      login && login(result);
      navigate('/');
    }
  };

  useEffect(() => {
    if (session.user) {
      navigate('/');
    }
  }, [session, navigate, location]);

  return (
    <div style={{ height: '100%', padding: '20px' }}>
      <Row>
        <Col span={10} offset={8}>
          <Card title="Login">
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="on"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {loginError && (
                <Form.Item label="Error" name="error">
                  <span style={{ color: 'red' }}>{loginError}</span>
                </Form.Item>
              )}

              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export const ConnectedLogin = connect((state) => state, { login })(Login);

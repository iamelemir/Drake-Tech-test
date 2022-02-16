import { connect } from 'react-redux';
import { login } from '../store';
import TodoComponent from '../components/Todo';

export default function Todo({ session }) {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h1>{session.user.name}'s Todo</h1>
      <TodoComponent />
    </main>
  );
}

export const ConnectedTodo = connect((state) => state, { login })(Todo);

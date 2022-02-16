import { connect } from 'react-redux';
import { login } from '../store';

export default function Home({ session }) {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Home</h2>
      <p>Welcome {session.user.name}</p>
      <p>Access token: {session.accessToken}</p>
    </main>
  );
}

export const ConnectedHome = connect((state) => state, { login })(Home);

const USERS = [
  {
    email: 'elemir@gmail.com',
    password: '1q2w',
    user: {
      name: 'Elemir',
    },
  },
  {
    email: 'pedro@gmail.com',
    password: '1q2w',
    user: {
      name: 'Pedro',
    },
  },
  {
    email: 'gloria@gmail.com',
    password: '1q2w',
    user: {
      name: 'Gloria',
    },
  },
  {
    email: 'mariana@gmail.com',
    password: '1q2w',
    user: {
      name: 'Mariana',
    },
  },
  {
    email: 'motas@gmail.com',
    password: '1q2w',
    user: {
      name: 'Motas',
    },
  },
  {
    email: 'luz@gmail.com',
    password: '1q2w',
    user: {
      name: 'Luz',
    },
  },
  {
    email: 'elias@gmail.com',
    password: '1q2w',
    user: {
      name: 'Elias',
    },
  },
  {
    email: 'aldair@gmail.com',
    password: '1q2w',
    user: {
      name: 'Aldair',
    },
  },
  {
    email: 'monica@gmail.com',
    password: '1q2w',
    user: {
      name: 'Monica',
    },
  },
  {
    email: 'marly@gmail.com',
    password: '1q2w',
    user: {
      name: 'Marly',
    },
  },
  {
    email: 'isabella@gmail.com',
    password: '1q2w',
    user: {
      name: 'Isabella',
    },
  },
  {
    email: 'drake@gmail.com',
    password: '1q2w',
    user: {
      name: 'Drake',
    },
  },
];
export function fakeLoginEndpoint({ email, password }) {
  for (const user of USERS) {
    if (user.email === email && user.password === password) {
      return { user: user.user, accessToken: 'superawesomeaccesstoken' };
    }
  }

  return {
    error: 'Invalid credentials',
  };
}

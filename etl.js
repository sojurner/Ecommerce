const axios = require('axios');

(async () => {
  try {
    const { data } = await axios.post('http://localhost:8080/api/auth/login', {
      username: 'username',
      password: 'password',
    });

    const { token } = data;
    const { data: res2 } = await axios.get('http://localhost:8080/api/auth', {
      headers: { authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log(err);
  }
})();

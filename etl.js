const axios = require('axios');

(async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/auth/register', {
      username: 'username',
      password: 'password',
    });

    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();

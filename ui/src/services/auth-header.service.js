export default function authHeader() {
    let user = localStorage.getItem('user');
    if (user) {
        user = JSON.parse(localStorage.getItem('user'))
        return { 
            Authorization: 'Bearer ' + user.accessToken,
            refreshToken: user.refreshToken
        };
    } else {
      return {};
    }
}
  
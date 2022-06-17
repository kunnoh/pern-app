module.exports = (sequalize, Sequalize) => {
    const User = sequalize.define('users', {
        firstname: { type: Sequalize.STRING },
        lastname: { type: Sequalize.STRING },
        password: { type: Sequalize.STRING },
        email: { type: Sequalize.STRING, unique: true },
        last_login: { type: Sequalize.STRING },
    })
    return User
}
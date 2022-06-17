module.exports = (sequalize, Sequalize) => {
    const Role = sequalize.define('roles', {
        role_id: { 
            type: Sequalize.INTEGER,
            primary: true
        },
        name: { type: Sequalize.STRING }
    })
    return Role
}
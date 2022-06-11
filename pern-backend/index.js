const mainapp = require('./src/server')

const port = process.env.port || 8066

mainapp.listen(port, ()=>{
    console.log(`listening on port ${port}`)
    console.log(' ')
    console.log(`open app on http://localhost:${port}`)
})
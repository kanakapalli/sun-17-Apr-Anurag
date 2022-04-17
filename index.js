const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'try route /updatebmi for update bmi is bmi is null \n try /getdata to get data' })
})


app.get('/updatebmi', db.updatebmi)
app.get('/getdata', db.getdata)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

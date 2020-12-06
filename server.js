import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from "./data.json"


console.log(`Data length: ${data.length}`)
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//callback function as a second argument
app.get("/nominations", (req, res) => {
  res.json(data)
})

app.get("/year/:nomYear", (req, res) => {
  //define the parameter
  const year = req.params.nomYear

  //req.query = accessing queries that appear after the ? in the url
  const showWon = req.query.won

  //see if the query won is true or false
  console.log(showWon)

  //year is a string!
  console.log({ year })

  //filter based on the parameter // +year meaning turning string into a number
  let nominationsFromYear = data.filter((item) => item.year_award === +year)

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  //returns the filtered data
  res.json(nominationsFromYear)

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

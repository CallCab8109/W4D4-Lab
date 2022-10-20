const bcrypt = require('bcrypt')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      let userData
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          userData = users[i]
          }

        }
        if(userData === undefined) {
        res.status(200).send({success: false, message: 'Your username sucks *squints at hand* sorry, i mean you have a bad username'})
      } else {
        bcrypt.compare(password, userData.password, (error, success) => {
          if (!error){
            if(success){
              let userCard = userData
              delete userCard.hashPass
              res.status(200).send(userCard)
            }
          }
        })
      }
    },

    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body
        const saltRounds = 10

        bcrypt.hash(password, saltRounds, (error, hashPass) => {
          let newDatabaseEntry = {} 
          newDatabaseEntry.username = username
          newDatabaseEntry.email = email
          newDatabaseEntry.firstName = firstName
          newDatabaseEntry.lastName = lastName
          newDatabaseEntry.password = hashPass
          console.log('Registering User')
          console.log(newDatabaseEntry)
          users.push(newDatabaseEntry)
          res.status(200).send(req.body)

        })



    }
}


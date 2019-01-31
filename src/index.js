import Server from './server'
import DBServer from './models'

DBServer.init()
  .then((dbText) => {
    console.log(dbText) // DB connection...

    Server.start()
      .then(text => {
        console.log(text) // Server is started...
      })
  })
const express = require('express')
const router = express.Router()

const user = require('./controller/user.controller')
const group = require('./controller/group.controller')
const message = require('./controller/message.controller')


router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('server is up and running')
})

router.post('/User/Login', user.Login)
router.post('/Group/Index', group.Index)
router.post('/Message/GetMessage',message.GetMessage)
module.exports = router
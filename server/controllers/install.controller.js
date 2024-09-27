
const installService = require('../services/install.service')

async function install(req,res,next){
    const installMessage = await installService.install()

    // ` check if the install was successful or not and send the appropriate message to the client
    if (installMessage.status === 200) {
        // ` if successful, send a success message
            res.status(200).json({
                message: installMessage
            })
    } else {
        // ` if not successful, send a failure message
            res.status(500).json({
                message: installMessage
            })
    }
}



module.exports  = { install }
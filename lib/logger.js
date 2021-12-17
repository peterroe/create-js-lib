const chalk = require('chalk')

const logger = new Object()

logger.success = function(msg) {
    console.log(
        chalk.green(msg)
    )
}

module.exports = logger
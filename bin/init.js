#!/usr/bin/env node

const fs = require('fs')
const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')
const logger = require('../lib/logger')
const templateURL = path.resolve(__dirname, '../', 'template');



inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'package name:',
    default: 'pkg'
}]).then(answer => {

    const packageURL = path.join(process.cwd(), answer.name)

    fse.copySync(templateURL, packageURL)

    fs.readdir(packageURL, 'utf8', (err, files) => {

        files.forEach(file => {
            const filePath = path.join(packageURL, file)
            ejs.renderFile(filePath, answer)
                .then(value => {
                    fs.writeFile(filePath, value, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }).catch(err => {

                })

        })
    })
    logger.success(`please run :`)
    logger.success(`cd ${answer.name}`)
    logger.success(`yarn`)
    logger.success(`yarn dev`)
})
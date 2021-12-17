#!/usr/bin/env node

const fs = require('fs')
const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')
const inquirer = require('inquirer')

const templateURL = path.resolve(__dirname, '../', 'template');

if (process.argv[2]) {

}

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'package name:',
    default: 'pkg'
}, {
    type: 'confirm',
    name: 'isUseVue',
    message: 'Do you want test the lib in Vue?',
    default: true
}]).then(answer => {
    console.log(process.cwd(), __dirname)
    fs.mkdir(answer.name, () => {})
    fse.copy(templateURL, path.join(process.cwd(), answer.name))
    return

    createFiles(templateURL)


    function createFiles(dirName) {
        fs.readdir(dirName, (err, files) => {

            files.forEach(templateFileName => {

                const templateFilePath = path.resolve(dirName, templateFileName)

                new Promise((res, rej) => {
                    fs.stat(templateFilePath, (err, data) => { //isFile?

                        res(data.isFile())
                    })
                }).then(isFile => {

                    if (isFile) {
                        ejs.renderFile(templateFilePath, {
                            name: answer.name
                        }).then(value => {
                            console.log(path.resolve(process.cwd()), templateFileName, dirName)
                            fs.writeFile(path.resolve(process.cwd(), templateFileName), value, 'utf8', (err) => {
                                console.log(err)
                            })
                        }).catch(err => {})
                    } else {
                        fs.mkdir(templateFileName, () => {

                        })
                        createFiles(templateFilePath)

                    }
                }).catch(err => {

                })

            })
        })
    }


})
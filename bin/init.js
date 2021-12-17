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

    const packageURL = path.join(process.cwd(), answer.name)
    fse.copySync(templateURL, packageURL)
    fs.readdir(packageURL, 'utf8', (err, files) => {
        console.log(files)
        files.forEach(file => {
            ejs.renderFile(path.join(packageURL, file), answer).then(value => {
                fs.writeFile(path.join(packageURL, file), value, () => {})
            }).catch(err => {})
        })
    })

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
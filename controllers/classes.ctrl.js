const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require("moment")

function getDatesBetween(startDate, endDate) {
    let dates = []
    let currentDate = moment(new Date(startDate))
    let stopDate = moment(new Date(endDate))

    while (currentDate <= stopDate) {
        dates.push(currentDate.format('YYYY-MM-DD'))
        currentDate = currentDate.add(1, 'days')
    }

    return dates;
}

async function listAllClasses(req, res, next) {
    try {

        const classes = await prisma.classes.findMany({
            include: {
                booking: true,
                _count: {
                    select: {
                        booking: true
                    }
                }
            }
        })

        res.json({
            status: true,
            message: `${classes.length} classes found!`,
            data: classes
        })

    } catch (error) {
        next(next)
    }
}

async function addClasses(req, res, next) {
    try {

        const { name, startDate, endDate, capacity } = req.body

        const dates = getDatesBetween(startDate, endDate)

        const classDate = dates.map(date => {
            return {
                name: name,
                date: new Date(date),
                capacity: capacity
            }
        })

        const createdClasses = await prisma.classes.createManyAndReturn({
            data: classDate
        })

        res.status(200).json({
            status: true,
            message: `${createdClasses.length} classes created`,
            data: createdClasses
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    listAllClasses,
    addClasses
}
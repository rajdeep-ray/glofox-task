const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function listAllBookings(req, res, next) {
    try {

        const bookings = await prisma.booking.findMany({
            include: {
                class: true
            }
        })
        res.json({
            status: true,
            message: "",
            data: bookings
        })
    } catch (error) {
        next(error)
    }
}

async function addBooking(req, res, next) {
    try {

        const { className, clasDate, memberName } = req.body

        const singleClass = await prisma.classes.findFirstOrThrow({
            where: {
                AND: {
                    name: { equals: className },
                    date: { equals: new Date(clasDate) }
                }
            }
        })

        const booking = await prisma.booking.create({
            data: {
                memberName: memberName,
                classesId: singleClass.id
            }
        })

        res.status(200).json({
            status: true,
            message: "Class booked",
            data: booking
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    listAllBookings,
    addBooking
}
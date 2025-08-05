import { prisma } from "./prisma";

prisma.semana.deleteMany({
    where: {
        semana: {
            gt: "35"
        }
    }
})
.then(() => {
    console.log("Semanas deletadas")
})


prisma.semana.findMany({
    where: {
        semana: {
            gt: "35"
        }
    }
})
.then((semanas) => {
    console.log(semanas)
})
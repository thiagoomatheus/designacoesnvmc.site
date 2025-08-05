import { prisma } from "./prisma";

prisma.semana.deleteMany({
    where: {
        semana: {
            gt: "35"
        }
    }
})
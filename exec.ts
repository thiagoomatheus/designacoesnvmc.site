import { prisma } from "./app/lib/prisma/prisma";

prisma.semana.deleteMany({
    where: {
        semana: {
            gt: "35"
        }
    }
})
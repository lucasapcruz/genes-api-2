import { prisma } from "../src/database/database";

async function populateDatabase() {
    await prisma.genes.createMany({
        data: [
            {
                "symbol": "A1BG",
                "name": "Alpha-1-B Glycoprotein",
                "description": "alpha-1-B glycoprotein [Source:HGNC Symbol;Acc:HGNC:5]",
            },
            {
                "symbol": "A1BG-AS1",
                "name": "A1BG Antisense RNA 1",
                "description": "A1BG antisense RNA 1 [Source:HGNC Symbol;Acc:HGNC:37133]",
            },
            {
                "symbol": "A1CF",
                "name": "APOBEC1 Complementation Factor",
                "description": "APOBEC1 complementation factor [Source:HGNC Symbol;Acc:HGNC:24086]",
            }

        ]
    })

    const gene = await prisma.genes.findFirst({
        where:{
            symbol: "A1CF"
        }
    })

    await prisma.aliases.createMany({
        data: [
            {
                "geneId": gene.id,
                "alias": "ACF",
                "aliasOrigin": "literature"
            },
            {
                "geneId": gene.id,
                "alias": "ASP",
                "aliasOrigin": "literature"
            }
        ]
    })
}

populateDatabase()
    .then(() => {
        console.log("seeding sucessful")
    })
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
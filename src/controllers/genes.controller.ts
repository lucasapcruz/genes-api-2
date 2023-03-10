import prisma from "../database/database.js";
import { query, Request, Response } from 'express';
import { Query, QueryResult } from "pg";
import { Alias } from "../protocols/alias.js";
import { GeneEntity, Gene } from "../protocols/gene.js";

export async function getGenes(req: Request, res: Response): Promise<void> {
    const { page, results_per_page, search } = req.query
    const resultsPerPage: number = results_per_page ? Number(results_per_page) : 30
    const offset: number = page ? ((Number(page) - 1) * resultsPerPage) : 0

    try {

        let genes

        if (search) {
            genes = await prisma.genes.findMany({
                where: {
                    OR: [{
                        symbol: String(search),
                    },
                    {
                        aliases: {
                            some: {
                                alias: String(search)
                            }
                        }
                    }],
                },
                orderBy: [
                    {
                        symbol: 'asc'
                    }
                ],
                include: {
                    aliases: true
                },
                skip: offset,
                take: resultsPerPage
            })
        } else {
            genes = await prisma.genes.findMany({
                orderBy: [
                    {
                        symbol: 'asc'
                    }
                ],
                include: {
                    aliases: true
                },
                skip: offset,
                take: resultsPerPage
            })
        }

        res.status(200).send(genes);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getGenesById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
        const genes = await prisma.genes.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                aliases: true
            }
        })

        res.status(200).send(genes);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function createAlias(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { alias, aliasOrigin } = req.body

    try {
        const aliasWithSameName = await prisma.aliases.findFirst({
            where: {
                alias: alias
            }
        })

        if (aliasWithSameName) {
            res.sendStatus(409)
            return
        }

        const aliasInserted = await prisma.aliases.create({
            data: {
                geneId: Number(id),
                alias: alias,
                aliasOrigin: aliasOrigin
            }
        })

        res.status(201).send(aliasInserted)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function createGene(req: Request, res: Response): Promise<void> {
    const { hgncSymbol, hgncName, description } = req.body as Gene

    try {
        const genesWithSameName = await prisma.genes.findFirst({
            where: {
                symbol: hgncSymbol
            }
        })

        if (genesWithSameName) {
            res.sendStatus(409)
            return
        }

        const genesInserted = await prisma.genes.create({
            data: {
                symbol: hgncSymbol,
                name: hgncName,
                description: description
            }
        })

        res.status(201).send(genesInserted)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteGene(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
        const genes = await prisma.genes.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!genes) {
            res.status(404).send('Gene not found')
            return
        }

        const deletedGene = await prisma.genes.delete({
            where: {
                id: Number(id)
            },
        })

        res.status(200).send(deletedGene)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function updateGene(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { hgncSymbol, hgncName, description } = req.body

    try {
        const genes = await prisma.genes.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!genes) {
            res.status(404).send('Gene not found')
            return
        }

        const updatedGene = await prisma.genes.update({
            where: {
                id: Number(id)
            },
            data: {
                symbol: hgncSymbol,
                name: hgncName,
                description: description
            },
            select: {
                id: true,
                symbol: true,
                name: true,
                description: true
            }
        })

        res.status(200).send(updatedGene)
    } catch (error) {
        res.sendStatus(500);
    }
}
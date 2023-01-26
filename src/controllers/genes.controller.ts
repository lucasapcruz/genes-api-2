import { connection } from "../database/database.js";
import { query, Request, Response } from 'express';
import { Query, QueryResult } from "pg";
import { Alias } from "../protocols/alias.js";
import { Gene } from "../protocols/gene.js";

export async function getGenes(req: Request, res: Response) {
    const { page, results_per_page, hgnc_symbol } = req.query
    const resultsPerPage: number = results_per_page ? Number(results_per_page) : 30
    const offset: number = page ? ((Number(page) - 1) * resultsPerPage) : 0

    try {
        const genes: QueryResult<Gene> = await connection.query(`
            SELECT
                genes.id AS id,
                genes.hgnc_symbol AS hgnc_symbol,
                json_agg(json_strip_nulls(json_build_object('alias', aliases.alias , 'origin', aliases.alias_origin))) AS aliases,
                genes.description AS description
            FROM genes
            LEFT JOIN aliases
            ON genes.id = aliases.gene_id
            GROUP BY genes.id
            ORDER BY genes.hgnc_symbol ASC
            LIMIT $1 
            OFFSET $2`, [resultsPerPage, offset])

        res.status(200).send(genes.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getGenesById(req: Request, res: Response) {
    const { id } = req.params

    try {
        const genes: QueryResult<Gene> = await connection.query(`
            SELECT * 
            FROM genes g
            WHERE g.id = $1`, [id])

        res.status(200).send(genes.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function createAlias(req: Request, res: Response): Promise<void> {
    const {id} = req.params
    const {alias, aliasOrigin} = req.body

    try {

        const queryExistentAliases: QueryResult<Alias> = await connection.query(`
            SELECT * FROM aliases where alias = $1
        `, [alias])

        const aliasAlreadyexists: boolean = queryExistentAliases.rows.length > 0

        if(aliasAlreadyexists){
            res.sendStatus(409)
            return
        }

        await connection.query(`
        INSERT INTO aliases  (gene_id, alias, alias_origin)
        VALUES ($1, $2, $3);`, [id, alias, aliasOrigin])

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function createGene(req: Request, res: Response): Promise<void> {
    const {hgncSymbol, hgncName, description} = req.body

    try {

        const queryExistentGenes: QueryResult<Gene> = await connection.query(`
            SELECT * FROM genes where hgnc_symbol = $1
        `, [hgncSymbol])

        const geneAlreadyexists: boolean = queryExistentGenes.rows.length > 0

        if(geneAlreadyexists){
            res.sendStatus(409)
            return
        }

        await connection.query(`
        INSERT INTO genes  (hgnc_symbol, hgnc_name, description)
        VALUES ($1, $2, $3);`, [hgncSymbol, hgncName, description])

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteGene(req: Request, res: Response): Promise<void> {
    const {id} = req.params

    try {

        const queryExistentGenes: QueryResult<Gene> = await connection.query(`
            SELECT * FROM genes WHERE id = $1
        `, [id])

        const geneExists: boolean = queryExistentGenes.rows.length > 0

        if(!geneExists){
            res.sendStatus(404)
            return
        }

        const queryAliasesOfGene: QueryResult<Alias> = await connection.query(`
            SELECT * FROM aliases WHERE gene_id = $1
        `, [id])

        const geneHasAliases: boolean = queryAliasesOfGene.rows.length > 0 

        if(geneHasAliases){
            await connection.query(`
            DELETE FROM aliases WHERE gene_id = $1;`, [id])
        }

        await connection.query(`
        DELETE FROM genes WHERE id = $1;`, [id])

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updateGene(req: Request, res: Response): Promise<void> {
    const {id} = req.params
    const {hgncSymbol, hgncName, description} = req.body

    try {

        const queryExistentGenes: QueryResult<Gene> = await connection.query(`
            SELECT * FROM genes WHERE id = $1
        `, [id])

        const geneExists: boolean = queryExistentGenes.rows.length > 0

        if(!geneExists){
            res.sendStatus(404)
            return
        }

        await connection.query(`
        UPDATE genes SET hgnc_symbol = $1, hgnc_name = $2, description = $3 WHERE id = $4;`, [hgncSymbol, hgncName, description, id])

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500);
    }
}
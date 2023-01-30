export type AliasEntity = {
    id?: number,
    geneId?: number,
    alias: string,
    aliasOrigin?: string
}

export type Alias = Omit<AliasEntity, 'id'>

export type CreateAlias = Omit<AliasEntity, 'id' | 'geneId'>
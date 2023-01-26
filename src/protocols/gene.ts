import { Alias } from "./alias"

export type GeneEntity = {
    id?: number,
    hgncSymbol: string,
    hgncName?: string,
    aliases?: Alias[],
    description: string
}

export type Gene = Omit<GeneEntity,'id'>
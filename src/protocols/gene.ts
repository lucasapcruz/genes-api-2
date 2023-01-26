import { Alias } from "./alias"

export type Gene = {
    id?: number,
    hgncSymbol: string,
    hgncName?: string,
    aliases?: Alias[],
    description: string
}
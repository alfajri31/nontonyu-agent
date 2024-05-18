export enum EnumCatalogTypes{
    ANIME = "Anime",
    DRAKOR = "Drakor"
}
type catalogTypes = EnumCatalogTypes.ANIME | EnumCatalogTypes.DRAKOR
export const EnumCatalogTypesCollection: catalogTypes[] = [
    EnumCatalogTypes.ANIME,
    EnumCatalogTypes.DRAKOR,
]



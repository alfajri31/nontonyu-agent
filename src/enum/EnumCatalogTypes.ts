export enum EnumCatalogTypes{
    ANIME = "Anime",
    DRAKOR = "Drakor",
    VIRAL = "Viralism",
}
type catalogTypes = EnumCatalogTypes.ANIME | EnumCatalogTypes.DRAKOR
export const EnumCatalogTypesCollection: catalogTypes[] = [
    EnumCatalogTypes.ANIME,
    EnumCatalogTypes.DRAKOR,
]



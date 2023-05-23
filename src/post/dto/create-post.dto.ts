export class CreatePostDto {
    title: string;
    description?: string;
    author?: number;
    categories?: Array<any>;
    subCategories?: Array<any>;
    priceInit?: number;
    priceNow: number;
    place?: string;
    webSite: string;
    promoDuration?: string;
}

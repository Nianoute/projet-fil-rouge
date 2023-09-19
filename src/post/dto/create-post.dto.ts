export class CreatePostDto {
    title: string;
    description?: string;
    author?: number;
    categories?: Array<any>;
    price?: number;
    pricePromo: number;
    place?: string;
    website: string;
    promoDuration?: string;
}

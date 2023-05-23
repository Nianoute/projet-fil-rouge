export class UpdatePostDto{
        title?: string;
        description?: string;
        categories?: Array<any>;
        subCategories?: Array<any>;
        priceInit?: number;
        priceNow?: number;
        place?: string;
        webSite?: string;
        promoDuration?: string;
}

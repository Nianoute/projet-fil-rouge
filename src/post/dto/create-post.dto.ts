export class CreatePostDto {
    title: string;
    description?: string;
    author?: number;
    categories?: Array<any>;
}

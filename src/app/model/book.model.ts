

export class Book{
    id: number | undefined;
    title: string | undefined;
    author: string | undefined;
    price: number | undefined;    
    description: string | undefined;
    createTime: Date | undefined;

    constructor(id?: number, title?: string, author?: string, price?:number, 
                description?: string, createTime?: Date)
    {
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.description = description;
        this.createTime = createTime
    }
}
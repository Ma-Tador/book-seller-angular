
export class Purchase {
    id: number | undefined;
    userId: number | undefined;
    bookId: number | undefined;
    price: number | undefined;
    purchaseTime: Date | undefined;


    constructor(id?: number, bookId?: number, userId?: number, purchaseTime?: Date, price?: number) {
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
        this.price = price;
        this.purchaseTime = purchaseTime;
    }
}
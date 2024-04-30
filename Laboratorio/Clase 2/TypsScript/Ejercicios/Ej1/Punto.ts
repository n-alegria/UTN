class Punto{
    private x : number;
    private y : number;
    
    public constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    public get GetX() : number {
        return this.x;
    }

    public get GetY() : number {
        return this.y
    }
}

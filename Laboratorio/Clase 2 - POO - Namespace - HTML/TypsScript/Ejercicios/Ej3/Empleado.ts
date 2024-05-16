import { Persona } from "./Persona";

export class Empleado extends Persona{
    private legajo: number;
    private sueldo: number;

    public constructor(nombre: string, apellido: string, dni: number, sexo: string, legajo: number, sueldo: number){
        super(nombre, apellido, dni, sexo);
        this.legajo = legajo;
        this.sueldo = sueldo;
    }

    public get GetLegajo(): number{
        return this.legajo;
    }
    public get GetSueldo(): number{
        return this.sueldo;
    }

    public Hablar(idioma: string): string {
        return `El empleado habla ${idioma}`;    
    }

    public ToString(): string {
        return `${super.ToString()} - ${this.GetLegajo} - ${this.GetSueldo}`;
    }
}

const e = new Empleado("lautaro", "alegria", 223344, "M", 107211, 150000);
console.log(e.ToString());
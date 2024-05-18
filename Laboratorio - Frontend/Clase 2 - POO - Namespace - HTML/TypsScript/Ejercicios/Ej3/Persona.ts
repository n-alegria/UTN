export abstract class Persona{
    private nombre: string;
    private apellido: string;
    private dni: number;
    private sexo: string;

    public constructor(nombre: string, apellido: string, dni: number, sexo: string){
        this.nombre  = nombre;
        this.apellido  = apellido;
        this.dni  = dni;
        this.sexo  = sexo;
    }

    public get GetNombre() : string{
        return this.nombre;
    }
    public get GetApellido() : string{
        return this.apellido;
    }
    public get GetDni() : number{
        return this.dni;
    }
    public get GetSexo() : string{
        return this.sexo;
    }

    public abstract Hablar(idioma: string): string;

    public ToString(): string{
        return `${this.GetNombre} - ${this.GetApellido} - ${this.GetDni} - ${this.GetSexo}`;
    }
} 
class Ajax {
    
    private xhr: XMLHttpRequest;

    private static DONE : number;
    private static OK : number;

    public constructor() {
        this.xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }

    public Get = (ruta: string, success: Function, params: string = "", error?: Function):void => {
    
        let parametros:string = params.length > 0 ? params : "";
        ruta = params.length > 0 ? ruta + "?" + parametros : ruta;

        this.xhr.open('GET', ruta);
        this.xhr.send();

        this.xhr.onreadystatechange = () => {

            if (this.xhr.readyState === Ajax.DONE) {
                if (this.xhr.status === Ajax.OK) {
                    success(this.xhr.responseText);
                } else {
                    if (error !== undefined){
                        error(this.xhr.status);
                    }
                }
            }

        };
    };

    private Send = (metodo: string, ruta: string, success: Function, params: any = null, error?: Function, headers?:any):void => {

        this.xhr.open(metodo, ruta, true);

        if(headers !== undefined){
            headers.forEach((header:any) => {
                this.xhr.setRequestHeader(header.key, header.value);
            });
            
        }
        this.xhr.send(params);

        this.xhr.onreadystatechange = ():void => {

            if (this.xhr.readyState === Ajax.DONE) {
                if (this.xhr.status === Ajax.OK) {
                    success(this.xhr.responseText);
                } else {
                    if (error !== undefined){
                        error(this.xhr.status);
                    }
                }
            }
        };
    };

    public Post = (ruta: string, success: Function, params: any = null, error?: Function, headers?:any):void => {
    
        this.Send("POST", ruta, success, params, error, headers);
    };

    public Put = (ruta: string, success: Function, params: any = null, error?: Function, headers?:any):void => {
    
        this.Send("PUT", ruta, success, params, error, headers);       
    };

    public Delete = (ruta: string, success: Function, params: any = null, error?: Function, headers?:any):void => {
        
        this.Send("DELETE", ruta, success, params, error, headers); 
    };    
}
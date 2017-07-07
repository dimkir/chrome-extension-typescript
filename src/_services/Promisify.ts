namespace Dimitry.Extension{
    export class Promisify{

        promisify(fn: (cb: any) => void) : (arg:any) => Promise<any>{
            return () => {
                return new Promise((resolve, reject)=>{
                    fn((r: any)=>{
                        // if error... ?
                        resolve(r);
                    });
                });
            };
        }



        promisify2(fn: (a: any, cb: any) => void) : (a:any) => Promise<any>{
            return (a: any) => {
                return new Promise((resolve, reject)=>{
                    fn(a, (result : any)=>{
                        // if error... ?
                        resolve(result);
                    });
                });
            };
        }   


        promisify3(fn: (a: any, b: any, cb: any) => void) : (a:any, b : any) => Promise<any>{
            return (a: any, b: any) => {
                return new Promise((resolve, reject)=>{
                    fn(a,  b, (result : any)=>{
                        // if error... ?
                        resolve(result);
                    });
                });
            };
        }       

    }
}
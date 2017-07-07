namespace Dimitry.Extension{
    export class FunData{
        constructor(){
            console.log('Initialized fun-data');
        }

        get() : Promise<number> {
            return new Promise(function(resolve, reject){
                setTimeout(()=>{
                    resolve(42);
                }, 2000);
            });
        }

        query(): Promise<number[]>{
            return new Promise(function(resolve, reject){
                setTimeout(()=>{
                    resolve([42,333,777]);
                }, 3000);
            });
        }
    }
}
namespace Dimitry.Extension{
    export interface ISimpleOptions{
        a?: string;
        b?: number;
    }
    export class SimpleStore{
        constructor(private storageArea : chrome.storage.StorageArea){
            
        }

        get() : Promise<ISimpleOptions>{
            return new Promise<ISimpleOptions>((resolve, reject)=>{
                this.storageArea.get(null, (d)=>{
                    debugger;
                    resolve(d);
                })
            });
        }

        set(d: ISimpleOptions) : Promise<void>{
            return new Promise<void>((resolve, reject)=>{
                this.storageArea.set(d, ()=>{
                    resolve();
                });
            });
        }
    }
}
/// <reference path="../../node_modules/@types/chrome/index.d.ts"/>

namespace Dimitry.Extension{

    interface IOptionsData{
        max: number;
        min: number;
    }

    export class SimpleOptionsController{

        private root : Element;
        private inputMax: HTMLInputElement;
        private inputMin: HTMLInputElement;

        private btnSave : HTMLButtonElement;


        private notifications : SimpleNotifications;

        constructor(){
            this.notifications = Factory.getSimpleNotifications();
        }

        public initialize(root : Element){
            this.root = root;

            components.loadAll(root);

            this.btnSave = root.querySelector('.btnSave') as HTMLButtonElement;
            // TODO wire the things.

            this.inputMax = root.querySelector('.inputMax') as HTMLInputElement;
            this.inputMin = root.querySelector('.inputMin') as HTMLInputElement;
            

            this.inputMax.value = this.inputMin.value = 'Loading...';

            this.loadValues()
                .then((result: IOptionsData)=>{
                    // how to wire the "save" buttons?
                    this.inputMax.value = result.max.toString();
                    this.inputMin.value = result.min.toString();

                    this.btnSave.addEventListener('click', ()=>{
                        this.saveAction();
                    });
                    this.btnSave.disabled = false;
                });

            
            // HOW to search and wire?
            root.querySelector('.btnAlert').addEventListener('click', ()=>{
                this.alertAction();
            });
        }


        private _log(a : any, b?: any){
            let s = b ? a + b: a;
            this.notifications.info(s);
        }

        /**
         * Saves values from input to the storage.
         */
        saveAction(){
            this._disableInputs();

            this._validateInput()
                .then(d => this.saveValues(d))
                .then((d)=>{
                    this._log('All saved', d);
                    this._enableInputs();
                })
                .catch( (e)=>{
                    if ( e.name == 'ValidationError' ){
                        console.error(e);
                        alert('One of the values is incorrect: ' + "\n"  + e.message );
                    }
                    this._enableInputs();
                });
        }

        private _enableInputs(){
            this.inputMax.disabled = false;
            this.inputMin.disabled = false;
            this.btnSave.disabled  = false;
        }

        private _disableInputs(){
            this.inputMax.disabled = true;
            this.inputMin.disabled = true;
            this.btnSave.disabled  = true;
        }

        /**
         * Saves values and returns saved values.
         * @param d 
         */
        saveValues(d : IOptionsData) : Promise<IOptionsData>{
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    chrome.storage.sync.set(d, ()=>{
                        resolve(d);
                    });

                },500);
            });
        }



        private _validateInput() : Promise<IOptionsData>{
            return new Promise<IOptionsData>((resolve, reject)=>{

                let min = parseInt(this.inputMin.value);
                Utils.verifyNaN(min);

                let max = parseInt(this.inputMax.value);
                Utils.verifyNaN(max);


                if ( min < 1 ) throw new Utils.ValidationError('Min must be a positive number');
                if ( max < 1 ) throw new Utils.ValidationError('Max must be a positive number');

                if ( max < min ) throw new Utils.ValidationError('Max must be larger or equal to min');

                let d : IOptionsData = {
                    min: min,
                    max: max
                };
                resolve(d)
            });
        }


        loadValues() : Promise<IOptionsData>{
            return new Promise((resolve, reject) => {
                // here I should load the values from xyz
                setTimeout(()=>{
                    chrome.storage.sync.get(['min', 'max'], (result : IOptionsData)=>{
                        let d : IOptionsData = {
                            max:  result.max || 99,
                            min:  result.min || 1
                        };
                        resolve(d);
                    });
                    // resolve({
                    //     min: 10,
                    //     max: 399
                    // });
                }, 1000);
            });
        }

        alertAction(){
            window.alert('This is alert!');
        }

    }
}
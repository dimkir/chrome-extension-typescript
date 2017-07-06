namespace Dimitry.Extension{
    export class HelloBrowserActionController{

        private txtHeader : HTMLElement;
        private inputMain : HTMLInputElement;
        private btnHello  : HTMLButtonElement;
        private btnRequestAsync : HTMLButtonElement;
        private funData: FunData;

        constructor(){
            this.funData = Factory.getFunData();
        }

        initialize(rootElement: Element){
            // TODO: wire up all the shit
            var root = rootElement;

            this.txtHeader = <HTMLElement> root.querySelector('.txtHeader');
            this.inputMain = <HTMLInputElement> root.querySelector('.inputMain');
            this.btnHello  = <HTMLButtonElement> root.querySelector('.btnHello');
            this.btnRequestAsync = root.querySelector('.btnRequestAsync') as HTMLButtonElement;

            // this.inputMain.addEventListener('keyup' , () => {
            this.inputMain.addEventListener('input' , () => {
                this.txtHeader.innerText = this.inputMain.value;
            });


            this.btnRequestAsync.addEventListener('click', () => {
                this.txtHeader.innerText = 'Requesting background data...';
                this.funData.get().then( (result)=>{
                    this.txtHeader.innerText = result.toString();
                    Factory.getSimpleNotifications().alert('Recevied result: ' + result.toString());
                }, 
                (e)=>{
                    console.error(e);
                });
            });

            this.btnHello.addEventListener('click', () => {
                window.alert('Hello pressed');
            });


        }
    }
}
namespace Dimitry.Extension{
    export class HelloBrowserActionController{

        private txtHeader : HTMLElement;
        private inputMain : HTMLInputElement;
        private btnReplaceTags  : HTMLButtonElement;
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
            this.btnReplaceTags  = <HTMLButtonElement> root.querySelector('.btnReplaceTags');
            this.btnRequestAsync = root.querySelector('.btnRequestAsync') as HTMLButtonElement;

            // this.inputMain.addEventListener('keyup' , () => {
            this.inputMain.addEventListener('input' , () => {
                this.txtHeader.innerText = this.inputMain.value;
            });


            this.btnRequestAsync.addEventListener('click', () => {
                this.txtHeader.innerText = 'Requesting background data...';
                this.funData.get().then( (result)=>{
                    this.txtHeader.innerText = result.toString();
                    Factory.getSimpleNotifications().alert('Received result: ' + result.toString());
                }, 
                (e)=>{
                    console.error(e);
                });
            });

            this.btnReplaceTags.addEventListener('click', () => {
                chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
                    if ( tabs.length < 1 ){
                        window.alert('No active current tab in current window, maybe not http(s) page opened?');
                        return;
                    }

                    chrome.tabs.sendMessage(tabs[0].id, { action: 'ui'});
                });
            });


        }
    }
}
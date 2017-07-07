namespace Dimitry.Extension{
    export class HelloBrowserActionController{

        private txtHeader : HTMLElement;
        private inputMain : HTMLInputElement;
        private btnReplaceTags  : HTMLButtonElement;
        private btnRequestAsync : HTMLButtonElement;
        private funData: FunData;

        private promisify: Promisify;

        private chromeTabsSendMessage : any;
        private chromeTabsQuery : any;

        constructor(){
            this.funData = Factory.getFunData();
            this.promisify = Factory.getPromisify();

            this.chromeTabsSendMessage = this.promisify.promisify3(chrome.tabs.sendMessage);
            this.chromeTabsQuery       = this.promisify.promisify2(chrome.tabs.query);
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

            this.btnReplaceTags.addEventListener('click', () => this.onReplaceThingsAction() );

        }

        onReplaceThingsAction(){

                let opt = { active: true, currentWindow: true};
                this.chromeTabsQuery(opt)
                    .then( (tabs : chrome.tabs.Tab[]) => {
                        if ( tabs.length < 1 ){
                            window.alert('No active current tab in current window, maybe not http(s) page opened?');
                            throw new Error('No active current tab in current window, maybe not http(s) page opened?');
                        }
                        return this.chromeTabsSendMessage(tabs[0].id, { action: 'ui'})
                    })
                    .then(()=>{
                        console.info('Message was sent from browser action');
                    });
        }
    }
}
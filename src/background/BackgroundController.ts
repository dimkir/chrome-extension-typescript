namespace Dimitry.Extension{

    interface IActions{
        show(m: any, sender: chrome.runtime.MessageSender, sendResponse: any) : void;
        hello(m: any, sender: chrome.runtime.MessageSender, sendResponse: any) : void;
        [key: string] : any;
    }


    export class BackgroundController{

        private MENU_ID = 'my-menu-123';


        initialize(){
            console.log('Initialized background controller');
            let menuItem : chrome.contextMenus.CreateProperties = {
                id: this.MENU_ID,
                title: 'Add Protein',
                contexts: [
                    "selection"
                ]
            };

            chrome.contextMenus.create(menuItem, () => {
                if ( chrome.runtime.lastError ){
                    console.error('Last Error', chrome.runtime.lastError);
                }
            });

            chrome.contextMenus.onClicked.addListener((info, tab)=>{
                if ( info.menuItemId == this.MENU_ID && info.selectionText ){
                    this.onSelectedContextMenuItem(info);
                }
            });


            chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
                if ( tabs.length < 1 ){
                    console.error('In the current context (when background page.initialize() was executed, there were no active tabs.');
                    return;
                }
                console.log('Found current tab: ' , tabs[0]);
                // chrome.pageAction.show(tabs[0].id);  
            });

            // chrome.runtime.onMessage.addListener(( m, sender, sendResponse ) => this.onRuntimeMessage(m, sender, sendResponse));
            chrome.runtime.onMessage.addListener((m, s, r) => this.onRuntimeMessage(m,s,r));
            // chrome.runtime.onMessage.addListener((m: any)=>{
            //     console.info(m);
            // });


        }
        


        onRuntimeMessage(m : any, sender : chrome.runtime.MessageSender, sendResponse: any){
            console.log(m);

            // function ucfirst(str: string) {
            //     var firstLetter = str.substr(0, 1);
            //     return firstLetter.toUpperCase() + str.substr(1);
            // }
            // let fnName = `on${ucfirst(m.action)}Action`;

            let fnName = m.action;

            
            if ( !this.actions[fnName]  ){
                console.error(`Received unsupported message: ${m.action}.  Cannot find action function ${fnName}`);
                return;
            }

            let fn = this.actions[fnName];
            fn(m, sender, sendResponse);

            Factory.getSimpleNotifications().info('Received: ' + JSON.stringify(m));

        }

        private actions : IActions =  {
          show: (m, sender, sendResponse) => {
            console.log('Show action requested from tab : ', sender.tab.id ? sender.tab.id : sender.tab);
          },

          hello: (m, sender) => {
            console.log('Hello action requested from tab : ', sender.tab.id ? sender.tab.id : sender.tab);
          }
        };
   

        onSelectedContextMenuItem(info : chrome.contextMenus.OnClickData){
            Factory.getSimpleNotifications().info(info.selectionText);
        }
    }
}
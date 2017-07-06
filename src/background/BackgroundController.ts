namespace Dimitry.Extension{
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

            chrome.contextMenus.create(menuItem);
            chrome.contextMenus.onClicked.addListener((info, tab)=>{
                if ( info.menuItemId == this.MENU_ID && info.selectionText ){
                    this.onSelectedContextMenuItem(info);
                }
            });

        }

        onSelectedContextMenuItem(info : chrome.contextMenus.OnClickData){
            Factory.getSimpleNotifications().info(info.selectionText);
        }
    }
}
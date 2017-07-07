namespace Dimitry.Extension{
    export class ContentController{
        initialize(){
            console.log('Initializing Content Controller!'); 


            let url = chrome.extension.getURL('/res/data/currencies.json');            
            console.log('Url: ' , url);
            

            chrome.runtime.sendMessage({
                action: 'hello'
            });



            chrome.runtime.onMessage.addListener( (m , s, r) => this.onMessage(m, s, r) );

            fetch(url) 
                .then( response => response.json() ) 
                .then( data => {
                    console.log(data);
                })
                .catch((err)=>{
                    console.error(err);
                });


            
            fetch('https://requestb.in/st8xpdst', { method: 'GET' })
                .then( (response) => {
                    chrome.runtime.sendMessage({ action: 'show' });
                    debugger;
                    console.log(response);

                })
                .catch( err => console.error(err) );
        }



        onMessage(m: any, sender: chrome.runtime.MessageSender, sendResponse: any){ 
            console.log('Message: ' , m);
            console.log('From: ', sender);
            this.replaceInnerText('h2', 'This is random text'); 
            
        }

        private replaceInnerText(selector: string, newText : string | string[]){

            var feeder : () => string;

            if ( Array.isArray(newText) ){
                // we will loop over them
                feeder = (function(){
                    var counter = 0;
                    return function(){
                        return newText[(counter++) % newText.length];
                    };
                })();

            }
            else  feeder = () => newText;


            document.querySelectorAll(selector).forEach((el : Element, i : number) => {
                el.innerHTML = feeder();
            });
        }

    }
}

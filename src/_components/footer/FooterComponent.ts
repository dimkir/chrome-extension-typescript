/// <reference path="../../Components.ts"/>

namespace Dimitry.Extension{
    export class FooterComponent implements IComponent{
        name = 'footer';
        tag  = 'dk-footer';
        
        // templateUrl : string = null;
        templateUrl = 'footer/footer.tpl.html';

        
        template   = `
        <footer>
                This is footer and there's some stuff here!
        </footer>`;


        load(element: Element) : Promise<any>{
            return components.loadComponent(element, this); 
        }

        onLoad(){
            console.log('On loaded FooterComponent');
        }
    }

    Dimitry.Extension.components.register(new FooterComponent());
    
}
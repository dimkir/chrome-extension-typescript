namespace Dimitry.Extension{
    const prefix = 'app/_components';

    export interface IComponent{
        name         : string;
        tag          : string;
        template?    : string;
        templateUrl : string;
        onLoad       : () => void;

        load         : (el: Element) => Promise<any>;
    }


    interface IComponentCollection {
        [ key : string] : IComponent;

    }
    export class Components{

        private components : IComponentCollection = {};

        register(comp: IComponent){
            this.components[comp.name] = comp;
        }

        loadAll(root: Element){
            for(let comp in this.components){
                let c = this.components[comp];
                root.querySelectorAll(c.tag).forEach((el, i)=>{
                    c.load(el)
                        .then( () => c.onLoad && c.onLoad())
                        .catch( (e) => console.error(e)); 
                });
            }
        }

        /**
         * @param relPath is path relative to app/_components/ directory. 
         *                Eg. "footer/footer.tpl.html"
         */
        getTemplate(relPath : string) : Promise<string>{
            let url = chrome.extension.getURL(`${prefix}/${relPath}`);
            return fetch(url)
                .then((result)=> result.text(), 
                
                (err) => {
                    debugger;
                    console.warn(err);
                    throw err;
                });
        }


        loadComponent(el: Element, component : IComponent) : Promise<any>{
            if ( component.templateUrl ){
                return this
                        .getTemplate(component.templateUrl)
                        .then((text)=>{
                            debugger;
                            el.innerHTML = text;
                        });
            }
            else if ( component.template ){
                return new Promise((resolve)=>{
                        el.innerHTML = component.template;
                        resolve();
                });
            }
            else{
                return new Promise((r, reject)=>{
                        let msg = `You haven't specified template for component ${component.name}`;
                        console.warn(msg);
                        throw new Error(msg);
                });
            }
        }             
    }

    export var components = new Components();
}
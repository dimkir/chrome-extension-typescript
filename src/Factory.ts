namespace Dimitry.Extension{
    export class Factory{

        private static funData : FunData;
        private static simpleStore: SimpleStore;
        private static simpleNotifications : SimpleNotifications;

        private static promisify : Promisify;

        public static getPromisify() : Promisify {
            if ( !Factory.promisify ){
                Factory.promisify = new Promisify();
            }

            return Factory.promisify;
        }

        public static getFunData() : FunData{
            if ( ! Factory.funData ){
                Factory.funData = new FunData();
            }
            return Factory.funData;
        }

        public static getSimpleNotifications() : SimpleNotifications {
            if ( ! Factory.simpleNotifications ){
                Factory.simpleNotifications = new SimpleNotifications();
            }
            return Factory.simpleNotifications;
        }

        
        public static getSimpleStore() : SimpleStore {
            if ( ! Factory.simpleStore ){
                Factory.simpleStore = new SimpleStore(chrome.storage.sync);
            }
            return Factory.simpleStore;
        }

  
    }
}
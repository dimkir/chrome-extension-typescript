namespace Dimitry.Extension{
    import NotificationOptions = chrome.notifications.NotificationOptions;
    export class SimpleNotifications{

        private defaultOptions : NotificationOptions = {
                type: 'basic',
                title: 'Info',
                message : 'Default message',
                iconUrl: '../../res/icon-tools.png'
        };
        

        alert(msg: string) : Promise<string> {
            var opt : NotificationOptions = Object.assign({}, this.defaultOptions);
            opt.message = msg;
            return this.create(opt);
        }

        warn(msg: string) : Promise<string>{
            var opt : NotificationOptions = Object.assign({}, this.defaultOptions);
            opt.message = msg;
            return this.create(opt);
        }

        private uuid(): string{
            let id = 'notif-' + Math.floor((Math.random() * 1000000)).toString();
            return id;
        }

        info(msg: string) : Promise<string>{
            var opt : NotificationOptions = Object.assign({}, this.defaultOptions);
            opt.message = msg;
            return this.create(opt);
        }

        private create(opt: NotificationOptions) : Promise<string>{
            return new Promise<string>((resolve)=>{
                this.createRaw(this.uuid(), opt, (id)=>{
                    console.log('Returned notification: ' + id);
                    resolve(id);
                });
            });
        }

        private createRaw(notificationId: string, options: NotificationOptions, callback?: (notificationId: string) => void): void {
            chrome.notifications.create(notificationId, options, callback);
        }
    }
}
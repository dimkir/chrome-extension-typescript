/// <reference path="action_browser/HelloBrowserActionController.ts"/>
/// <reference path="action_page/HelloPageActionController.ts"/>
/// <reference path="Factory.ts"/>

namespace Dimitry.Extension {

    window.addEventListener('load', () => {

        var view; 
        
        if ( view = document.querySelector('body.hello-browser-action-view') ) {
            let controller  = new  HelloBrowserActionController();
            controller.initialize(view);
            return;
        }


        if ( view = document.querySelector('body.hello-page-action-view') ) {
            let controller = new HelloPageActionController();
            controller.initialize(view);
            return;
        }

        if ( view = document.querySelector('body.options')){
            let controller = new SimpleOptionsController();
            controller.initialize(view);
            return;
        }
        

        
        console.log('Could not find Action controller to initialize for DOM');

    });

}
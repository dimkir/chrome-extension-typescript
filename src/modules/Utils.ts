namespace Dimitry.Extension.Utils{
    export class ValidationError extends Error{
        public name  = 'ValidationError';
    }    

    export function verifyNaN(v: any){
        if ( isNaN(v) ){
            throw new ValidationError('Value ' + v + ' is NaN');
        }
        
    }

}
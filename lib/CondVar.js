/*!
 * Javascript CondVar library v0.01
 * https://github.com/CindyLinz/JS-CondVar
 *
 * Copyright 2012, Cindy Wang (CindyLinz)
 * Dual licensed under the MIT or GPL Version 2 or GPL Version 3 licenses.
 *
 * Date: 2012.4.27
 */
(function(window, undefined){
    var oCondVar = window.CondVar;

    var CondVar = window.CondVar = {
        noConflict: function(){
            window.CondVar = oCondVar;
            return CondVar;
        },

        get: function(){
            var cbs = [];
            var counter = 0;
            var fired = false;
            var args = [];

            var cv = function(){ return cv.end.apply(cv, arguments) };

            function fire(){
                fired = true;
                var i;
                for(i=0; i<cbs.length; ++i)
                    cbs[i].call(cv, args);
                cbs = undefined;
            }

            cv.cb = function(cb){
                if( fired ){
                    cb.call(cv, args);
                    return cv;
                }
                cbs.push(cb);
                if( counter==0 )
                    fire();
                return cv;
            };

            cv.end = function(){
                if( fired ){
                    if( window.console && window.console.log )
                        window.console.log("CondVar: call end() on a fired cv.");
                    return cv;
                }
                var i;
                for(i=0; i<arguments.length; ++i)
                    args.push(arguments[i]);
                --counter;
                if( counter==0 )
                    fire();
                return cv;
            };

            cv.begin = function(){
                if( fired ){
                    if( window.console && window.console.log )
                        window.console.log("CondVar: call begin() on a fired cv.");
                    return cv;
                }
                ++counter;
                return cv;
            };

            return cv;
        }
    };
})(window)

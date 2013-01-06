/*!
 * Javascript CondVar library v0.03
 * https://github.com/CindyLinz/JS-CondVar
 *
 * Copyright 2012, Cindy Wang (CindyLinz)
 * Licensed under the MIT or GPL Version 2 or GPL Version 3 licenses.
 *
 * Date: 2013.1.6
 */
(function(window, undefined){
    var CondVar = {
        get: function(chained_cv){
            var cbs = [];
            var counter = 0;
            var fired = false;
            var args = [];

            var cv = function(){ return cv.end.apply(cv, arguments) };

            if( chained_cv )
                chained_cv.begin();

            function fire(){
                fired = true;
                var i;
                for(i=0; i<cbs.length; ++i)
                    cbs[i].call(cv, args);
                cbs = undefined;
                if( chained_cv ){
                    chained_cv.end();
                    chained_cv = undefined;
                }
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

            cv.wrap = function(body){
                if( fired ){
                    if( window.console && window.console.log )
                        window.console.log("CondVar: call wrap() on a fired cv.");
                    return body;
                }
                ++counter;
                return function(){
                    body.apply(window, arguments);
                    cv.end.apply(cv, arguments);
                };
            };

            return cv;
        }
    };

    if( typeof define === 'function' ){
        define([], function(){ return CondVar });
    }
    else{
        var oCondVar = window.CondVar;
        CondVar.noConflict = function(){
            window.CondVar = oCondVar;
            return CondVar;
        };
        window.CondVar = CondVar;
    }
})(this)

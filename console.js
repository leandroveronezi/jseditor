
oldconsole = window.console;
oldlog = window.console.log;
oldclear = window.console.clear;
olderror = window.console.error;
oldwarn = window.console.warn;
olddebug = window.console.debug;
oldinfo = window.console.info;
olddir = window.console.dir;
oldgroup = window.console.group;
oldgroupEnd = window.console.groupEnd;
oldassert = window.console.assert;
oldtable = window.console.table;
oldcount = window.console.count;
oldcountReset = window.console.countReset;

window.console.$_ml = 0;
window.console.$_count = {};

ObjConsole = {
    
    get: function(target, name) {
        
        let value = undefined;
        
        if (name === "$_count"){
            
            value = target["$_count"];
            
        }else if (name === "ml" || name === "$_ml"){
            
            value = target["$_ml"];
            
        }else if ( !this[name] ){            
           
            value = target[name];
            
            var e = name + " is not suported"
            
            $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-danger text-white p-1 mb-1">${e}</div>`);                
            $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
            
        }else{
            value = this[name];
        }
        
        return (typeof value === 'function') ? value.bind(target) : value;
                    
    },
       
    log: function(...args){
        
        var str = '';
                
        for (let arg of args) {
            
            if (typeof arg == 'object') {                        
                str += (JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) + ' ';
            } else {                        
                str += arg + ' ';
                
            }
            
        }
                                        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-light p-1 mb-1" role="alert">${str}</div>`);                                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        oldlog(...args)
    
        
    },
            
    dir : function(...args){
        
        var str = '';
                
        for (let arg of args) {
            
            if (typeof arg == 'object') {                        
                str += (JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) + ' ';
            } else {                        
                str += arg + ' ';
                
            }
            
        }
                                        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-light p-1 mb-1" role="alert">${str}</div>`);                                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        olddir(...args)
    
        
    }, 
    
    count : function(args){
        
        if ( !window.console.$_count[args] ) {
            window.console.$_count[args] = 0;
        }
        
        window.console.$_count[args] = window.console.$_count[args] + 1;
                      
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-light p-1 mb-1" role="alert">${args} : ${window.console.$_count[args]} </div>`);                                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
        
        oldcount(args)
    
        
    }, 
    
    countReset : function(args){
        
        window.console.$_count[args] = undefined;
        
                               
        oldcountReset(args)
    
        
    }, 
    
    
    
    assert : function(expression,...args){
        
        if (!expression){
            
            var str = '';
                    
            for (let arg of args) {
                
                if (typeof arg == 'object') {                        
                    str += (JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) + ' ';
                } else {                        
                    str += arg + ' ';
                    
                }
                
            }
                                            
            $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-danger text-white p-1 mb-1" role="alert">Assertion failed: ${str}</div>`);                                
            $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;    
            
        }
        
                        
        oldassert(expression, ...args)
    
        
    }, 
    
    group: function(e) {
                        
        $("#console").append(`<div class="d-block ml-${console.ml} bg-light font-weight-bold p-1 mb-1">&raquo; ${e}</div>`);
        
        window.console.$_ml = window.console.$_ml + 4;
                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        oldgroup(e)
        
    },
    
    
    groupEnd: function(e) {
        
        if (window.console.$_ml > 0) {        
            window.console.$_ml = window.console.$_ml - 4;
        }
                        
        oldgroupEnd(e)
        
    },
    
    
    error: function(e) {
        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-danger text-white p-1 mb-1">${e}</div>`);
                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        olderror(e)
        
    },
    
    warn: function(w) {
                                        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-warning text-white p-1 mb-1" role="alert">${w}</div>`);                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        oldwarn(w)
        
    },
    
    info: function(w) {
                                        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-info text-white p-1 mb-1" role="alert">${w}</div>`);                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        oldinfo(w)
        
    },
    
    debug: function(w) {
                                        
        $("#console").append(`<div class="d-block ml-${console.ml} border border-dark bg-primary text-white p-1 mb-1" role="alert">${w}</div>`);                
        $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;
                        
        oldinfo(w)
        
    },
    
    clear: function() {
        
        $("#console").html("");
        
        window.console.$_ml = 0;
        window.console.$_count = {};
        
        oldclear();
        
    },
    
    
    keyListener: function(){        
        
        var funcKeyObserver = (e) => {
                
            if (e.key === "l") {
                e.preventDefault();
                window.console.clear();
            }                      
                    
        }                              
        
        window.addEventListener('keydown', (e) => {
            
            if(e.key === "Control"){ 
                                                
                window.addEventListener('keydown', funcKeyObserver);
                
            }            
                                
        })        
        
        window.addEventListener('keyup', (e) => {
            
            if(e.key === "Control"){
                window.removeEventListener('keydown', funcKeyObserver);
            }
            
        })        
        
    }    
    
    
}


class Console {
    
    constructor (elConsole) {
                        
        this.elConsole = elConsole
                    
        window.console = new Proxy(window.console, ObjConsole);
        window.console.keyListener();
                             
    }
    
    clear(){
        window.console.clear();        
    }
    
}

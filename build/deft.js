/*
DeftJS 0.6

Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/
Ext.define("Deft.ioc.DependencyProvider",{config:{identifier:null,className:null,parameters:null,fn:null,value:null,singleton:!0,eager:!1},constructor:function(a){this.initConfig(a);null!=a.value&&a.value.constructor===Object&&this.setValue(a.value);this.getEager()&&(null!=this.getValue()&&Ext.Error.raise("Error while configuring '"+this.getIdentifier()+"': a 'value' cannot be created eagerly."),this.getSingleton()||Ext.Error.raise("Error while configuring '"+this.getIdentifier()+"': only singletons can be created eagerly."));
this.getSingleton()||null!=this.getValue()&&Ext.Error.raise("Error while configuring '"+this.getIdentifier()+"': a 'value' can only be configured as a singleton.");return this},resolve:function(a){var d;Ext.log("Resolving '"+this.getIdentifier()+"'.");if(null!=this.getValue())return this.getValue();d=null;null!=this.getFn()?(Ext.log("Executing factory function."),d=this.fn(a)):null!=this.getClassName()?(Ext.log("Creating instance of '"+this.getClassName()+"'."),a=null!=this.getParameters()?[this.getClassName()].concat(this.getParameters()):
[this.getClassName()],d=Ext.create.apply(this,a)):Ext.Error.raise("Error while configuring rule for '"+this.getIdentifier()+"': no 'value', 'fn', or 'className' was specified.");this.getSingleton()&&this.setValue(d);return d}});
Ext.define("Deft.ioc.Injector",{alternateClassName:["Deft.Injector"],requires:["Deft.ioc.DependencyProvider"],singleton:!0,constructor:function(){this.providers={};return this},configure:function(a){Ext.log("Configuring injector.");Ext.Object.each(a,function(a,b){var c;Ext.log("Configuring dependency provider for '"+a+"'.");c=Ext.isString(b)?Ext.create("Deft.ioc.DependencyProvider",{identifier:a,className:b}):Ext.create("Deft.ioc.DependencyProvider",Ext.apply({identifier:a},b));this.providers[a]=
c},this);Ext.Object.each(this.providers,function(a,b){b.getEager()&&(Ext.log("Eagerly creating '"+b.getIdentifier()+"'."),b.resolve())},this)},canResolve:function(a){return null!=this.providers[a]},resolve:function(a,d){var b;b=this.providers[a];return null!=b?b.resolve(d):Ext.Error.raise("Error while resolving value to inject: no dependency provider found for '"+a+"'.")},inject:function(a,d){var b,c,e,f;b={};Ext.isString(a)&&(a=[a]);Ext.Object.each(a,function(e,c){var f,h;h=Ext.isArray(a)?c:e;f=
this.resolve(c,d);d.config.hasOwnProperty(h)?(Ext.log("Injecting '"+c+"' into 'config."+h+"'."),b[h]=f):(Ext.log("Injecting '"+c+"' into '"+h+"'."),d[h]=f)},this);if(d.$configInited)for(c in b)f=b[c],e="set"+Ext.String.capitalize(c),d[e].call(d,f);else d.config=Ext.Object.merge({},d.config||{},b);return d}});
Ext.define("Deft.mixin.Injectable",{requires:["Deft.ioc.Injector"],onClassMixedIn:function(a){a.prototype.constructor=Ext.Function.createInterceptor(a.prototype.constructor,function(){return Deft.Injector.inject(this.inject,this)})}});
<<<<<<< HEAD
Ext.define("Deft.mixin.Controllable",{requires:["Deft.mvc.ViewController"],onClassMixedIn:function(a){a.prototype.constructor=Ext.Function.createInterceptor(a.prototype.constructor,function(){var a=Ext.isArray(this.controller)?this.controller:[this.controller];Ext.each(a,function(a){Ext.create(a,this)},this)})}});
Ext.define("Deft.mvc.ViewController",{alternateClassName:["Deft.ViewController"],constructor:function(a){this.components={view:a};a.on("initialize",this.configure,this);return this},configure:function(){Ext.Logger.log("Configuring view controller.");var a=this.getView();a.un("initialize",this.configure,this);a.on("beforedestroy",this.destroy,this);Ext.isObject(this.control)&&Ext.Object.each(this.control,function(a,b){var c=this.locateComponent(a,b);this.setComponent(a,c);if(Ext.isObject(b)){var e=
Ext.isObject(b.listeners)?b.listeners:b;Ext.Object.each(e,function(a,b){Ext.Logger.log("adding component "+c+" event "+a+" listener to "+b);c.on(a,this[b],this)},this)}},this);Ext.isFunction(this.setup)&&this.setup()},destroy:function(){Ext.Logger.log("Destroying view controller.");this.getView().un("beforedestroy",this.destroy,this);if(Ext.isFunction(this.tearDown)&&!1==this.tearDown())return!1;Ext.isObject(this.control)&&Ext.Object.each(this.control,function(a,d){var b=this.getComponent(a);if(Ext.isObject(d)){var c=
Ext.isObject(d.listeners)?d.listeners:d;Ext.Object.each(c,function(a,d){Ext.Logger.log("removing component "+b+" event "+a+" listener to "+d);b.un(a,this[d],this)},this)}this["get"+Ext.String.capitalize(a)]=null},this);this.components=null;return!0},locateComponent:function(a,d){var b=this.getView();return"view"==a?b:Ext.isString(d)?b.query(d)[0]:Ext.isString(d.selector)?b.query(d.selector)[0]:b.query("#"+a)[0]},getComponent:function(a){return this.components[a]},setComponent:function(a,d){var b=
"get"+Ext.String.capitalize(a);this[b]||(this[b]=Ext.Function.pass(this.getElement,[a],this));this.components[a]=d},getView:function(){return this.components.view}});
Ext.define("Deft.util.Deferred",{alternateClassName:["Deft.Deferred"],constructor:function(){this.state="pending";this.value=this.progress=void 0;this.progressCallbacks=[];this.successCallbacks=[];this.failureCallbacks=[];this.cancelCallbacks=[];this.promise=Ext.create("Deft.Promise",this);return this},then:function(a,d,b,c){var e,f;Ext.isObject(a)?(f=a.success,d=a.failure,b=a.progress,a=a.cancel):(f=a,a=c);e=Ext.create("Deft.Deferred");c=function(a,b){if(Ext.isFunction(a)||a===null||a===void 0)return function(d){var c;
if(Ext.isFunction(a))try{c=a(d);if(c===void 0)e[b](d);else c instanceof Ext.ClassManager.get("Deft.util.Promise")||c instanceof Ext.ClassManager.get("Deft.util.Deferred")?c.then(Ext.bind(e.resolve,e),Ext.bind(e.reject,e),Ext.bind(e.update,e),Ext.bind(e.cancel,e)):e.resolve(c)}catch(f){e.reject(f)}else e[b](d)};Ext.Error.raise("Error while configuring callback: a non-function specified.")};this.register(c(b,"update"),this.progressCallbacks,"pending",this.progress);this.register(c(f,"resolve"),this.successCallbacks,
"resolved",this.value);this.register(c(d,"reject"),this.failureCallbacks,"rejected",this.value);this.register(c(a,"cancel"),this.cancelCallbacks,"cancelled",this.value);return e.getPromise()},always:function(a){return this.then({success:a,failure:a,cancel:a})},update:function(a){"pending"===this.state?(this.progress=a,this.notify(this.progressCallbacks,a)):Ext.Error.raise("Error: this Deferred has already been completed and cannot be modified.")},resolve:function(a){this.complete("resolved",a,this.successCallbacks)},
reject:function(a){this.complete("rejected",a,this.failureCallbacks)},cancel:function(a){this.complete("cancelled",a,this.cancelCallbacks)},getPromise:function(){return this.promise},getState:function(){return this.state},register:function(a,d,b,c){Ext.isFunction(a)&&("pending"===this.state&&d.push(a),this.state===b&&void 0!==c&&this.notify([a],c))},complete:function(a,d,b){"pending"===this.state?(this.state=a,this.value=d,this.notify(b,d),this.releaseCallbacks()):Ext.Error.raise("Error: this Deferred has already been completed and cannot be modified.")},
notify:function(a,d){var b,c,e;c=0;for(e=a.length;c<e;c++)b=a[c],b(d)},releaseCallbacks:function(){this.cancelCallbacks=this.failureCallbacks=this.successCallbacks=this.progressCallbacks=null}});
Ext.define("Deft.util.Promise",{alternateClassName:["Deft.Promise"],statics:{when:function(a,d){var b;if(a instanceof Ext.ClassManager.get("Deft.util.Promise")||a instanceof Ext.ClassManager.get("Deft.util.Deferred"))return a.then(d);b=Ext.create("Deft.util.Deferred");b.resolve(a);return b.then(d)},all:function(a,d){return this.when(this.reduce(a,this.reduceIntoArray,Array(a.length)),d)},any:function(a,d){var b,c,e,f,h,i,k,g,j,l;c=Ext.create("Deft.util.Deferred");j=function(a){c.update(a)};g=function(a){b();
c.resolve(a)};b=function(){return j=g=function(){}};k=function(a){return g(a)};i=function(a){return rejector(a)};f=function(a){return j(a)};e=0;for(l=a.length;e<l;e++)h=a[e],e in a&&this.when(h,k,i,f);return c.then(d)},map:function(a,d){var b,c,e,f;e=Array(a.length);b=0;for(f=a.length;b<f;b++)c=a[b],b in a&&(e[b]=this.when(c,d));return this.reduce(e,this.reduceIntoArray,e)},reduce:function(a,d,b){var c,e;e=this.when;c=[function(b,c,i){return e(b,function(b){return e(c,function(c){return d(b,c,i,a)})})}];
3===arguments.length&&c.push(b);return this.when(this.reduceArray.apply(a,c))},reduceArray:function(a,d){var b,c,e,f,h;e=0;c=Object(this);f=c.length>>>0;b=arguments;if(1>=b.length)for(;;){if(e in c){h=c[e++];break}if(++e>=f)throw new TypeError;}else h=b[1];for(;e<f;)e in c&&(h=a(h,c[e],e,c)),e++;return h},reduceIntoArray:function(a,d,b){a[b]=d;return a}},constructor:function(a){this.deferred=a;return this},then:function(a){return this.deferred.then.apply(this.deferred,arguments)},always:function(a){return this.deferred.always(a)},
cancel:function(a){return this.deferred.cancel(a)},getState:function(){return this.deferred.getState()}},function(){null!=Array.prototype.reduce&&(this.reduceArray=Array.prototype.reduce)});
=======
Ext.define("Deft.promise.Deferred",{alternateClassName:["Deft.Deferred"],constructor:function(){this.state="pending";this.value=this.progress=void 0;this.progressCallbacks=[];this.successCallbacks=[];this.failureCallbacks=[];this.cancelCallbacks=[];this.promise=Ext.create("Deft.Promise",this);return this},then:function(a,d,b,c){var e,f,g,i,j;Ext.isObject(a)?(f=a.success,d=a.failure,b=a.progress,a=a.cancel):(f=a,a=c);j=[f,d,b,a];g=0;for(i=j.length;g<i;g++)c=j[g],!Ext.isFunction(c)&&!(null===c||void 0===
c)&&Ext.Error.raise("Error while configuring callback: a non-function specified.");e=Ext.create("Deft.promise.Deferred");c=function(a,b){return function(c){var d;if(Ext.isFunction(a))try{d=a(c);if(d===void 0)e[b](c);else d instanceof Ext.ClassManager.get("Deft.promise.Promise")||d instanceof Ext.ClassManager.get("Deft.promise.Deferred")?d.then(Ext.bind(e.resolve,e),Ext.bind(e.reject,e),Ext.bind(e.update,e),Ext.bind(e.cancel,e)):e.resolve(d)}catch(f){e.reject(f)}else e[b](c)}};this.register(c(f,"resolve"),
this.successCallbacks,"resolved",this.value);this.register(c(d,"reject"),this.failureCallbacks,"rejected",this.value);this.register(c(a,"cancel"),this.cancelCallbacks,"cancelled",this.value);this.register(function(a){return function(b){var c;if(Ext.isFunction(a)){c=a(b);c===void 0?e.update(b):e.update(c)}else e.update(b)}}(b),this.progressCallbacks,"pending",this.progress);return e.getPromise()},always:function(a){return this.then({success:a,failure:a,cancel:a})},update:function(a){"pending"===this.state?
(this.progress=a,this.notify(this.progressCallbacks,a)):Ext.Error.raise("Error: this Deferred has already been completed and cannot be modified.")},resolve:function(a){this.complete("resolved",a,this.successCallbacks)},reject:function(a){this.complete("rejected",a,this.failureCallbacks)},cancel:function(a){this.complete("cancelled",a,this.cancelCallbacks)},getPromise:function(){return this.promise},getState:function(){return this.state},register:function(a,d,b,c){Ext.isFunction(a)&&("pending"===this.state&&
d.push(a),this.state===b&&void 0!==c&&this.notify([a],c))},complete:function(a,d,b){"pending"===this.state?(this.state=a,this.value=d,this.notify(b,d),this.releaseCallbacks()):Ext.Error.raise("Error: this Deferred has already been completed and cannot be modified.")},notify:function(a,d){var b,c,e;c=0;for(e=a.length;c<e;c++)b=a[c],b(d)},releaseCallbacks:function(){this.cancelCallbacks=this.failureCallbacks=this.successCallbacks=this.progressCallbacks=null}});
Ext.define("Deft.promise.Promise",{alternateClassName:["Deft.Promise"],statics:{when:function(a,d){var b;if(a instanceof Ext.ClassManager.get("Deft.promise.Promise")||a instanceof Ext.ClassManager.get("Deft.promise.Deferred"))return a.then(d);b=Ext.create("Deft.promise.Deferred");b.resolve(a);return b.then(d)},all:function(a,d){return this.when(this.reduce(a,this.reduceIntoArray,Array(a.length)),d)},any:function(a,d){var b,c,e,f,g,i,j,h,k,l;c=Ext.create("Deft.promise.Deferred");k=function(a){c.update(a)};
h=function(a){b();c.resolve(a)};b=function(){return k=h=function(){}};j=function(a){return h(a)};i=function(a){return rejector(a)};f=function(a){return k(a)};e=0;for(l=a.length;e<l;e++)g=a[e],e in a&&this.when(g,j,i,f);return c.then(d)},map:function(a,d){var b,c,e,f;e=Array(a.length);b=0;for(f=a.length;b<f;b++)c=a[b],b in a&&(e[b]=this.when(c,d));return this.reduce(e,this.reduceIntoArray,e)},reduce:function(a,d,b){var c,e;e=this.when;c=[function(b,c,i){return e(b,function(b){return e(c,function(c){return d(b,
c,i,a)})})}];3===arguments.length&&c.push(b);return this.when(this.reduceArray.apply(a,c))},reduceArray:function(a,d){var b,c,e,f,g;e=0;c=Object(this);f=c.length>>>0;b=arguments;if(1>=b.length)for(;;){if(e in c){g=c[e++];break}if(++e>=f)throw new TypeError;}else g=b[1];for(;e<f;)e in c&&(g=a(g,c[e],e,c)),e++;return g},reduceIntoArray:function(a,d,b){a[b]=d;return a}},constructor:function(a){this.deferred=a;return this},then:function(a){return this.deferred.then.apply(this.deferred,arguments)},always:function(a){return this.deferred.always(a)},
cancel:function(a){return this.deferred.cancel(a)},getState:function(){return this.deferred.getState()}},function(){null!=Array.prototype.reduce&&(this.reduceArray=Array.prototype.reduce)});Ext.define("Deft.util.Function",{alternateClassName:["Deft.Function"],statics:{spread:function(a,d){return function(b){Ext.isArray(b)||Ext.Error.raise("Error spreading passed Array to target function arguments: passed a non-Array.");return a.apply(d,b)}}}});
>>>>>>> refs/heads/develop/promise
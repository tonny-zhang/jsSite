/**
 * Ext core methods
 * @object Ext
 */

(function() {

var global = this,
    objectPrototype = Object.prototype;

if (global.Ext == undefined) {
    global.Ext = {};
}

Ext.global = global;
    
var enumerables = true;

for (var i in {toString: 1}) {
    enumerables = null;
}

if (enumerables) {
    enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
}

/**
 * Put it into Ext namespace so that we can reuse outside this
 * @type Array
 */
Ext.enumerables = enumerables;

/**
 * Copies all the properties of config to the specified object.
 * IMPORTANT: Note that it doesn't take care of recursive merging and cloning without referencing the original objects / arrays
 * Use Ext.merge instead if you need that.
 * @param {Object} object The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 */
Ext.apply = function(object, config, defaults) {
    if (defaults) {
        Ext.apply(object, defaults);
    }

    if (object && config && typeof config === 'object') {
        var i, j, k;

        for (i in config) {
            object[i] = config[i];
        }

        if (enumerables) {
            for (j = enumerables.length; j--;){
                k = enumerables[j];
                if (config.hasOwnProperty(k)) {
                    object[k] = config[k];
                }
            }
        }
    }

    return object;
};

/** @scope Ext */
Ext.apply(Ext, {
   /**
    * A reusable empty function
    */
    emptyFn: function() {},

    /**
     * Copies all the properties of config to object if they don't already exist.
     * @function
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @return {Object} returns obj
     */
    applyIf: function(object, config) {
        var property;

        if (object) {
            for (property in config) {
                if (object[property] === undefined) {
                    object[property] = config[property];
                }
            }
        }

        return object;
    },

    /**
     * Creates namespaces to be used for scoping variables and classes so that they are not global.
     * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
     * @example
     * Ext.namespace('Company', 'Company.data');
     * Ext.namespace('Company.data'); // equivalent and preferable to above syntax
     * Company.Widget = function() { ... }
     * Company.data.CustomStore = function(config) { ... }
     * 
     * @param {String} namespace1
     * @param {String} namespace2
     * @param {String} etc
     * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
     */
    namespace: function() {
        var ln = arguments.length,
            i, value, x, xln, parts, object;

        for (i = 0; i < ln; i++) {
            value = arguments[i];
            parts = value.split(".");
            if (global.Ext) {
                object = global[parts[0]] = Object(global[parts[0]]);
            } else {
                object = arguments.callee.caller.arguments[0];
            }
            for (x = 1, xln = parts.length; x < xln; x++) {
                object = object[parts[x]] = Object(object[parts[x]]);
            }
        }
        
        return object;
    },

    /**
    * Iterates either the elements in an array, or the properties in an object.
    * @param {Object/Array} object The object or array to be iterated
    * @param {Function} fn The function to be called for each iteration.
    * The iteration will stop if the supplied function returns false, or
    * all array elements / object properties have been covered. The signature
    * varies depending on the type of object being interated:
    * <ul>
    * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
    * When iterating an array, the supplied function is called with each item.
    * </li>
    * <li>Objects : <tt>(String key, Object value, Object)</tt>
    * When iterating an object, the supplied function is called with each key-value pair in
    * the object, and the iterated object
    * </li>
    * </ul>
    * @param {Object} scope The scope (<tt>this</tt> reference) in which the specified function is executed. Defaults to
    * the <tt>object</tt> being iterated.
    */
    each: function(obj, fn, scope) {
        if (Ext.isEmpty(obj)) {
            return;
        }

        if (Ext.isIterable(obj)) {
            Ext.Array.each.apply(this, arguments);
        }
        else {
            Ext.Object.each.apply(this, arguments);
        }
    }
});

/** @scope Ext */
Ext.apply(Ext, {
    /**
     * Convenient alias for {@link Ext.namespace}
     * @see Ext.namespace
     * @function
     */
    ns: Ext.namespace,

    /**
     * Since Core version 4 this method is meant to be used internally only. Use {@link Ext#define Ext.define} instead.
     * @function
     * @param {Function} superclass
     * @param {Object} overrides
     * @return {Function} The subclass constructor from the <tt>overrides</tt> parameter, or a generated one if not provided.
     * @deprecated Use {@link Ext#define Ext.define} instead
     */
    extend: function() {
        // inline overrides
        var inlineOverrides = function(o){
            for (var m in o) {
                if (!o.hasOwnProperty(m)) {
                    continue;
                }
                this[m] = o[m];
            }
        };

        var objectConstructor = objectPrototype.constructor;

        return function(subclass, superclass, overrides){
            // First we check if the user passed in just the superClass with overrides
            if (Ext.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                    ? overrides.constructor
                    : function(){ superclass.apply(this, arguments); };
            }

            if (!superclass) {
                throw "Attempting to extend from a class which has not been loaded on the page.";
            }

            // We create a new temporary class
            var F = function(){},
                subclassProto,
                superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;

            if(superclassProto.constructor == objectConstructor){
                superclassProto.constructor = superclass;
            }

            subclass.override = function(overrides){
                Ext.override(subclass, overrides);
            };

            // In subclass' methods we can reference the superclass with this.superclass or this.supr for more convenience
            // Performance is almost the same with the old way of calling Ext.ns.ClassName.superclass
            subclassProto.superclass = subclassProto.supr = superclassProto;

            subclassProto.override = inlineOverrides;
            subclassProto.proto = subclassProto;

            subclass.override(overrides);
            subclass.extend = function(o) {
                return Ext.extend(subclass, o);
            };

            return subclass;
        };
    }(),

    /**
     * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
     * @example
Ext.override(MyClass, {
    newMethod1: function(){
        // etc.
    },
    newMethod2: function(foo){
        // etc.
    }
});
     * @param {Object} origclass The class to override
     * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
     * containing one or more methods.
     * @method override
     * @deprecated Make use of {@link Ext.Class-override} instead
     */
    override: function(origclass, overrides) {
        Ext.apply(origclass.prototype, overrides);
    }
});

/**
 * A full set of static methods to do type checking
 * @scope Ext
 */
Ext.apply(Ext, {

    /**
     * Returns true if the passed value is empty. The value is deemed to be empty if it is:
     * <ul>
     * <li>null</li>
     * <li>undefined</li>
     * <li>an empty array</li>
     * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
     * </ul>
     * @param {Mixed} value The value to test
     * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
     * @return {Boolean}
     */
    isEmpty: function(value, allowBlank) {
        return (value == null) || ((Ext.isArray(value) && !value.length)) || (!allowBlank ? value === '' : false);
    },

    /**
     * Returns true if the passed value is a JavaScript Array, false otherwise.
     * @param {Mixed} target The target to test
     * @return {Boolean}
     */
    isArray: function(value) {
        return objectPrototype.toString.apply(value) === '[object Array]';
    },

    /**
     * Returns true if the passed value is a JavaScript Date object, false otherwise.
     * @param {Object} object The object to test
     * @return {Boolean}
     */
    isDate: function(value) {
        return objectPrototype.toString.apply(value) === '[object Date]';
    },

    /**
     * Returns true if the passed value is a JavaScript Object, false otherwise.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isObject: function(value) {
        return !!value && !value.tagName && objectPrototype.toString.call(value) === '[object Object]';
    },

    /**
     * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isPrimitive: function(value) {
        return Ext.isString(value) || Ext.isNumber(value) || Ext.isBoolean(value);
    },

    /**
     * Returns true if the passed value is a JavaScript Function, false otherwise.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isFunction: function(value) {
        return objectPrototype.toString.apply(value) === '[object Function]';
    },

    /**
     * Returns true if the passed value is a number. Returns false for non-finite numbers.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isNumber: function(value) {
        return objectPrototype.toString.apply(value) === '[object Number]' && isFinite(value);
    },

    /**
     * Validates that a value is numeric.
     * @param {Mixed} value Examples: 1, '1', '2.34'
     * @return {Boolean} True if numeric, false otherwise
     */
    isNumeric: function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Returns true if the passed value is a string.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isString: function(value) {
        return typeof value === 'string';
    },

    /**
     * Returns true if the passed value is a boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isBoolean: function(value) {
        return objectPrototype.toString.apply(value) === '[object Boolean]';
    },

    /**
     * Returns true if the passed value is an HTMLElement
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isElement: function(value) {
        return value ? !!value.tagName : false;
    },

    /**
     * Returns true if the passed value is defined.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isDefined: function(value){
        return typeof value !== 'undefined';
    },

    /**
     * Returns true if the passed value is iterable, false otherwise
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isIterable: function(value) {
        if (!value) {
            return false;
        }
        //check for array or arguments
        if (Ext.isArray(value) || value.callee) {
            return true;
        }
        //check for node list type
        if (/NodeList|HTMLCollection/.test(objectPrototype.toString.call(value))) {
            return true;
        }

        //NodeList has an item and length property
        //IXMLDOMNodeList has nextNode method, needs to be checked first.
        return ((typeof value.nextNode != 'undefined' || value.item) && Ext.isNumber(value.length)) || false;
    }
});

/** @scope Ext */
Ext.apply(Ext, {
    
    /**
     * Clone almost any type of variable including array, object, DOM nodes and Date without keeping the old reference
     * @param {Mixed} item The variable to clone
     * @return {Mixed} clone
     */
    clone: function(item) {
        if (!item) {
            return item;
        }

        // DOM nodes
        if (item.nodeType && item.cloneNode){
            return item.cloneNode(true);
        }

        // Date
        if (item instanceof Date){
            return new Date(item.getTime());
        }

        var i, j, k, clone;

        // Array
        if (Ext.isArray(item)) {
            i = item.length;

            clone = new Array(i);

            while (i--) {
                clone[i] = Ext.clone(item[i]);
            }
        }
        // Object
        else if (Ext.isObject(item)) {
            clone = item.constructor ? new item.constructor() : {};

            for (var key in item) {
                clone[key] = Ext.clone(item[key]);
            }

            if (enumerables) {
                for (j = enumerables.length; j--;){
                    k = enumerables[j];
                    clone[k] = item[k];
                }
            }
        }
        return clone || item;
    }
});

})();
/**
 * @class Ext.Version
 */

(function() {

// Current core version
var version = '4.0.0dev';

Ext.Version = Ext.extend(Object, {
    
    /**
     * A utility class that wrap around a string version number and provide convenient
     * method to do comparison. See also: {@link Ext.Version.compare compare}. Example:
     * <pre><code>
     * var version = new Ext.Version('1.0.2beta');
     * console.log("Version is " + version); // Version is 1.0.2beta
     *
     * console.log(version.getMajor()); // 1
     * console.log(version.getMinor()); // 0
     * console.log(version.getPatch()); // 2
     * console.log(version.getBuild()); // 0
     * console.log(version.getRelease()); // beta
     *
     * console.log(version.gt('1.0.1')); // True
     * console.log(version.gt('1.0.2alpha')); // True
     * console.log(version.gt('1.0.2RC')); // False
     * console.log(version.gt('1.0.2')); // False
     *
     * console.log(version.match(1.0)); // True
     * console.log(version.match('1.0.2')); // True
     * </code></pre>
     * 
     * @constructor
     * @param {String/Number} version The version number in the follow standard format: major[.minor[.patch[.build[release]]]]
     * Examples: 1.0 or 1.2.3beta or 1.2.3.4RC
     * @return {Ext.Version} this
     */
    constructor: function(version) {
        var parts, releaseStartIndex;

        if (version instanceof Ext.Version) {
            return version;
        }

        this.version = this.simplified = String(version).toLowerCase()
                                                        .replace(/_/g, '.')
                                                        .replace(/[\-+]/g, '');

        releaseStartIndex = this.version.search(/([^\d\.])/);

        if (releaseStartIndex !== -1) {
            this.release = this.version.substr(releaseStartIndex, version.length);
            this.simplified = this.version.substr(0, releaseStartIndex);
        }

        this.simplified = this.simplified.replace(/[^\d]/g, '');

        parts = this.version.split('.');

        this.major = parseInt(parts.shift());
        this.minor = parseInt(parts.shift());
        this.patch = parseInt(parts.shift());
        this.build = parseInt(parts.shift());

        return this;
    },

    /**
     * Override the native toString method
     * @private
     * @return {String} version
     */
    toString: function() {
        return this.version;
    },

    /**
     * Override the native valueOf method
     * @private
     * @return {String} version
     */
    valueOf: function() {
        return this.version;
    },

    /**
     * Returns the major component value
     * @return {Number} major
     */
    getMajor: function() {
        return this.major || 0;
    },

    /**
     * Returns the minor component value
     * @return {Number} minor
     */
    getMinor: function() {
        return this.minor || 0;
    },

    /**
     * Returns the patch component value
     * @return {Number} patch
     */
    getPatch: function() {
        return this.patch || 0;
    },

    /**
     * Returns the build component value
     * @return {Number} build
     */
    getBuild: function() {
        return this.build || 0;
    },

    /**
     * Returns the release component value
     * @return {Number} release
     */
    getRelease: function() {
        return this.release || '';
    },

    /**
     * Returns whether this version if greater than the supplied argument
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version if greater than the target, false otherwise
     */
    isGreaterThan: function(target) {
        return Ext.Version.compare(this.version, target) == 1;
    },

    /**
     * Convenient shortcut for {@link Ext.Version#isGreaterThan isGreaterThan}
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version if greater than the target, false otherwise
     */
    gt: function() {
        return this.isGreaterThan.apply(this, arguments);
    },

    /**
     * Returns whether this version if smaller than the supplied argument
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version if smaller than the target, false otherwise
     */
    isSmallerThan: function(target) {
        return Ext.Version.compare(this.version, target) == -1;
    },

    /**
     * Convenient shortcut for {@link Ext.Version#isSmallerThan isSmallerThan}
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version if smaller than the target, false otherwise
     */
    lt: function() {
        return this.isSmallerThan.apply(this, arguments);
    },

    /**
     * Returns whether this version equals to the supplied argument
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version equals to the target, false otherwise
     */
    equals: function(target) {
        return Ext.Version.compare(this.version, target) == 0;
    },

    /**
     * Convenient shortcut for {@link Ext.Version#equals equals}
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True fs this version equals to the target, false otherwise
     */
    eq: function() {
        return this.equals.apply(this, arguments);
    },

    /**
     * Returns whether this version matches the supplied argument. Example:
     * <pre><code>
     * var version = new Ext.Version('1.0.2beta');
     * console.log(version.match(1)); // True
     * console.log(version.match(1.0)); // True
     * console.log(version.match('1.0.2')); // True
     * console.log(version.match('1.0.2RC')); // False
     * </code></pre>
     * @param {String/Number} target The version to compare with
     * @return {Boolean} True if this version matches the target, false otherwise
     */
    match: function(target) {
        target = String(target);
        return this.version.substr(0, target.length) == target;
    },

    /**
     * Returns this format: [major, minor, patch, build, release]. Useful for comparison
     * @return {Array}
     */
    toArray: function() {
        return [this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()];
    },

    /**
     * Returns simplified version without dots and release
     * @return {String}
     */
    getSimplified: function() {
        return this.simplified;
    }
});

/** @scope Ext.Version */
Ext.apply(Ext.Version, {
    // @private
    releaseValueMap: {
        'dev': -6,
        'alpha': -5,
        'a': -5,
        'beta': -4,
        'b': -4,
        'rc': -3,
        '#': -2,
        'p': -1,
        'pl': -1
    },

    /**
     * Converts a version component to a comparable value
     * @param {Mixed} value The value to convert
     * @return {Mixed}
     */
    getComponentValue: function(value) {
        return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
    },

    /**
     * Compare 2 specified versions, starting from left to right. If a part contains special version strings,
     * they are handled in the following order:
     * 'dev' < 'alpha' = 'a' < 'beta' = 'b' < 'RC' = 'rc' < '#' < 'pl' = 'p' < 'anything else'
     * @param {String} current The current version to compare to
     * @param {String} target The target version to compare to
     * @return {Number} Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent
     */
    compare: function(current, target) {
        var currentValue, targetValue;
        current = new Ext.Version(current).toArray();
        target = new Ext.Version(target).toArray();

        for (var i = 0; i < Math.max(current.length, target.length); i++) {
            currentValue = this.getComponentValue(current[i]);
            targetValue = this.getComponentValue(target[i]);

            if (currentValue < targetValue) {
                return -1;
            } else if (currentValue > targetValue) {
                return 1;
            }
        }

        return 0;
    }
});

/** @scope Ext */
Ext.apply(Ext, {
    // @private
    versions: {},

    /**
     * Set version number of the supplied package name.
     * Note: This is not meant to be called from the application-level, only from framework-level
     * @param {String} packageName The package name, for example: 'core', 'touch', 'extjs'
     * @param {String} version The version, for example: '1.2.3alpha', '2.4.0-dev'
     * @return {Ext}
     */
    setVersion: function(packageName, version) {
        Ext.versions[packageName] = new Ext.Version(version);

        return this;
    },

    /**
     * Get the version number of the supplied package name
     * @param {String} packageName The package name, for example: 'core', 'touch', 'extjs'
     * @return {Ext.Version} The version
     */
    getVersion: function(packageName) {
        return Ext.versions[packageName];
    },

    /**
     * Create a closure for deprecated code. Note that for max performance, this will be stripped out automatically
     * when being built with JSBuilder
     * @param {String} packageName The package name
     * @param {String} since The last version before it's deprecated
     * @param {Function} closure The callback function to be executed with the specified version is less than the current version
     * @param {Object} scope The execution scope (<tt>this</tt>) if the closure
     */
    deprecate: function(packageName, since, closure, scope) {
        if (Ext.Version.compare(Ext.getVersion(packageName), since) < 1) {
            closure.call(scope);
        }
    }
}); // End Versioning

Ext.setVersion('core', version);

// Deprecated stuff
Ext.deprecate('core', '4.0dev', function() {
    var versionMessage = "[DEPRECATED][Ext.version] Please use Ext.getVersion(packageName) instead. For example: Ext.getVersion('core')";

    /**
     * <b>This property is deprecated.</b>
     * Please use {@link Ext#getVersion Ext.getVersion(packageName)} instead. For example:
     * <pre><code>
     * var coreVersion = Ext.getVersion('core');
     * </code></pre>
     * @deprecated
     * @field
     * @type string
     */
    if ('__defineGetter__' in Ext) {
        Ext.__defineGetter__('version', function() {
            throw new Error(versionMessage);
        });
    }
    else {
        // For old browsers...
        Ext.version = versionMessage;
    }

    /**
     * <b>This method is deprecated.</b>
     * Please use Ext.each instead.
     * It's now a wrapper for both {@link Ext.Array.each} and {@link Ext.Object.each}
     * @deprecated
     */
    Ext.iterate = function() {
        if (console) {
            console.warn("[DEPRECATED][core][4.0dev][Ext.iterate] Please use Ext.each instead. " +
                         "It's now a wrapper for both Ext.Array.forEach and Ext.Object.each");
        }

        Ext.each.apply(this, arguments);
    };
});

})();

/**
 * @static Ext.String
 * @type Object
 */

Ext.String = {
    trimRegex: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    escapeRe: /('|\\)/g,
    formatRe: /\{(\d+)\}/g,
    escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g,
    
    /**
     * Takes an encoded URL and and converts it to an object. Example:
     * <pre><code>
Ext.String.parseQueryString("foo=1&bar=2"); // returns {foo: "1", bar: "2"}
Ext.String.parseQueryString("foo=1&bar=2&bar=3&bar=4", false); // returns {foo: "1", bar: ["2", "3", "4"]}
     * </code></pre>
     * @param {String} string
     * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
     * @return {Object} A literal with members
     */
    parseQueryString : function(string, overwrite) {
        if (Ext.isEmpty(string)) {
            return {};
        }

        var obj = {},
        pairs = string.split('&'),
        d = decodeURIComponent,
        name,
        value;

        Ext.each(pairs, function(pair) {
            pair = pair.split('=');
            name = d(pair[0]);
            value = d(pair[1]);
            obj[name] = overwrite || !obj[name] ? value : [].concat(obj[name]).concat(value);
        });

        return obj;
    },

    /**
     * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
     * @param {String} value The string to encode
     * @return {String} The encoded text
     */
    htmlEncode: function(value) {
        return (!value) ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },

    /**
     * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
     * @param {String} value The string to decode
     * @return {String} The decoded text
     */
    htmlDecode: function(value) {
        return (!value) ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    },

    /**
     * Appends content to the query string of a URL, handling logic for whether to place
     * a question mark or ampersand.
     * @param {String} url The URL to append to.
     * @param {String} string The content to append to the URL.
     * @return (String) The resulting URL
     */
    urlAppend : function(url, string) {
        if (!Ext.isEmpty(string)) {
            return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
        }
        
        return url;
    },

    /**
     * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
     * @example
var s = '  foo bar  ';
alert('-' + s + '-');         //alerts "- foo bar -"
alert('-' + Ext.String.trim(s) + '-');  //alerts "-foo bar-"
    
     * @param {String} string The string to escape
     * @return {String} The trimmed string
     */
    trim: function(string) {
        return string.replace(Ext.String.trimRegex, "");
    },

    /**
     * Capitalize the given string
     * @param {String} string
     * @return {String}
     */
    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    },

    /**
     * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
     * @param {String} value The string to truncate
     * @param {Number} length The maximum length to allow before truncating
     * @param {Boolean} word True to try to find a common word break
     * @return {String} The converted text
     */
    ellipsis: function(value, len, word) {
        if (value && value.length > len) {
            if (word) {
                var vs = value.substr(0, len - 2),
                index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                if (index != -1 && index >= (len - 15)) {
                    return vs.substr(0, index) + "...";
                }
            }
            return value.substr(0, len - 3) + "...";
        }
        return value;
    },

    /**
     * Escapes the passed string for use in a regular expression
     * @param {String} string
     * @return {String}
     */
    escapeRegex: function(string) {
        return string.replace(this.escapeRegexRe, "\\$1");
    },

    /**
     * Escapes the passed string for ' and \
     * @param {String} string The string to escape
     * @return {String} The escaped string
     */
    escape: function(string) {
        return string.replace(this.escapeRe, "\\$1");
    },

    /**
     * Utility function that allows you to easily switch a string between two alternating values.  The passed value
     * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
     * they are already different, the first value passed in is returned.  Note that this method returns the new value
     * but does not change the current string.
     * <pre><code>
    // alternate sort directions
    sort = Ext.String.toggle(sort, 'ASC', 'DESC');

    // instead of conditional logic:
    sort = (sort == 'ASC' ? 'DESC' : 'ASC');
       </code></pre>
     * @param {String} string The current string
     * @param {String} value The value to compare to the current string
     * @param {String} other The new value to use if the string already equals the first value passed in
     * @return {String} The new value
     */
    toggle: function(string, value, other) {
        return string == value ? other : value;
    },

    /**
     * Pads the left side of a string with a specified character.  This is especially useful
     * for normalizing number and date strings.  Example usage:
     *
     * <pre><code>
var s = Ext.String.leftPad('123', 5, '0');
// s now contains the string: '00123'
       </code></pre>
     * @param {String} string The original string
     * @param {Number} size The total length of the output string
     * @param {String} character (optional) The character with which to pad the original string (defaults to empty string " ")
     * @return {String} The padded string
     */
    leftPad: function(string, size, character) {
        var result = String(string);
        character = character || " ";
        while (result.length < size) {
            result = character + result;
        }
        return result;
    },

    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = this.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
       </code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     */
    format: function(format) {
        var args = Ext.toArray(arguments, 1);
        return format.replace(this.formatRe, function(m, i) {
            return args[i];
        });
    }
};

//Ext.deprecate('core', '4.0dev', function() {
//    Ext.urlDecode = function() {
//        console.warn("[DEPRECATED][core][4.0dev][Ext.urlDecode] please use Ext.String.parseQueryString instead");
//        return Ext.String.parseQueryString.apply(Ext.String, arguments);
//    };
//});
/**
 * @static Ext.Number
 * @type Object
 */

(function() {

var isToFixedBroken = (0.9).toFixed() != 1;

Ext.Number = {
    /**
     * Checks whether or not the current number is within a desired range.  If the number is already within the
     * range it is returned, otherwise the min or max value is returned depending on which side of the range is
     * exceeded. Note that this method returns the constrained value but does not change the current number.
     * @param {Number} number The number to check
     * @param {Number} min The minimum number in the range
     * @param {Number} max The maximum number in the range
     * @return {Number} The constrained value if outside the range, otherwise the current value
     */
    constrain: function(number, min, max) {
        number = parseFloat(number);

        if (!isNaN(min)) {
            number = Math.max(number, min);
        }
        if (!isNaN(max)) {
            number = Math.min(number, max);
        }
        return number;
    },

    /**
     * Formats a number using fixed-point notation
     * @param {Number} value The number to format
     * @param {Number} precision The number of digits to show after the decimal point
     */
    toFixed: function(value, precision) {
        if (isToFixedBroken) {
            precision = precision || 0;
            var pow = Math.pow(10, precision);
            return Math.round(value * pow) / pow;
        }
        
        return value.toFixed(precision);
    }
};

})();

/**
 * Utility method for validating that a value is numeric, returning the specified default value if it is not.
 * @param {Mixed} value Should be a number, but any type will be handled appropriately
 * @param {Number} defaultValue The value to return if the original value is non-numeric
 * @return {Number} Value, if numeric, else defaultValue
 */
Ext.num = function(v, defaultValue) {
    v = Number(Ext.isEmpty(v) || Ext.isArray(v) || typeof v == 'boolean' || (typeof v == 'string' && Ext.String.trim(v).length == 0) ? NaN : v);
    return isNaN(v) ? defaultValue : v;
};
/**
 * @static Ext.Array
 * @type Object
 * 
 * A set of useful static methods to deal with arrays, provide missing methods for older browsers
 */
(function() {

// Boost performance and better for compression at the same time
// instead of checking inside the methods
var arrayPrototype = Array.prototype,
    supportsForEach = 'forEach' in arrayPrototype,
    supportsMap = 'map' in arrayPrototype,
    supportsIndexOf = 'indexOf' in arrayPrototype,
    supportsEvery = 'every' in arrayPrototype, // TODO implement this if needed, refer to https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
    supportsSome = 'some' in arrayPrototype, // TODO implement this if needed, refer to https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
    supportsFilter = 'filter' in arrayPrototype;

Ext.Array = {

   /**
    * Iterates an array calling the supplied function.
    * @param {Array/NodeList/Mixed} array The array to be iterated. If this
    * argument is not really an array, the supplied function is called once.
    * @param {Function} fn The function to be called with each item. If the
    * supplied function returns false, iteration stops and this method returns
    * the current <tt>index</tt>. This function is called with
    * the following arguments:
    * <ul>
    * <li><tt>item</tt> : <i>Mixed</i> The item at the current <tt>index</tt> in the passed <tt>array</tt></li>
    * <li><tt>index</tt> : <i>Number</i> The current index within the array</li>
    * <li><tt>allItems</tt> : <i>Array</i> The <tt>array</tt> passed as the first
    * argument to <tt>Ext.each</tt>.</li>
    * </ul>
    * @param {Object} scope The scope (<tt>this</tt> reference) in which the specified function is executed.
    * Defaults to the <tt>item</tt> at the current <tt>index</tt>
    * within the passed <tt>array</tt>.
    * @return {Boolean} See description for the fn parameter.
    */
    each: function(array, fn, scope) {
        if (Ext.isEmpty(array, true)) {
            return 0;
        }

        if (!Ext.isIterable(array) || Ext.isPrimitive(array)) {
            array = [array];
        }

        for (var i = 0, len = array.length; i < len; i++) {
            if (fn.call(scope || array[i], array[i], i, array) === false) {
                return i;
            }
        }

        return true;
    },

    /**
     * Executes the provided function (callback) once for each element present in the array.
     * Note that this will delegate to the native forEach method in Array.prototype if the current
     * browser supports it. It doesn't support breaking out of the iteration by returning false
     * in the callback function like {@link Ext.Array.each}. Use this method when you don't need
     * that feature for <b>huge</b> performance boost.
     * @param array The array to loop through
     * @param fn The function callback, to be invoked with three arguments: the value of the element,
     * the index of the element, and the Array object being traversed.
     * @param scope The scope (<tt>this</tt> reference) in which the specified function is executed.
     */
    forEach: function(array, fn, scope) {
        if (supportsForEach) {
            return array.forEach(fn, scope);
        }

        return this.each.apply(this, arguments);
    },

    /**
     * Checks whether or not the specified item exists in the array.
     * Array.prototype.indexOf is missing in Internet Explorer, unfortunately.
     * We always have to use this static method instead for consistency
     * @param {Array} array The array to check
     * @param {Mixed} item The item to look for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of item in the array (or -1 if it is not found)
     */
	indexOf: function(array, item, from){
        if (supportsIndexOf) {
            return array.indexOf(item, from);
        }
        
		var i, length = array.length;

		for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++){
			if (array[i] === item) {
                return i;
            }
		}

		return -1;
	},

    /**
     * Checks whether or not the specified array contains the specified item
     * @param {Array} array The array to check
     * @param {Mixed} item The item to look for
     * @return {Boolean} True if the array contains the item, false otherwise
     */
	contains: function(array, item){
		return (this.indexOf(array, item) !== -1);
	},

    /**
     * Converts any iterable (numeric indices and a length property) into a true array
     * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
     * For strings, use this instead: <code>"abc".match(/./g) => [a,b,c];</code>
     * @param {Iterable} array the iterable object to be turned into a true Array.
     * @param {Number} start a number that specifies where to start the selection.
     * @param {Number} end a number that specifies where to end the selection.
     * @return (Array) array
     */
     toArray: function(array, start, end) {
        return Array.prototype.slice.call(array, start || 0, end || array.length);
     },

    /**
     * Plucks the value of a property from each item in the Array
     *
// Example:
Ext.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
     *
     * @param {Array|NodeList} arr The Array of items to pluck the value from.
     * @param {String} prop The property name to pluck from each element.
     * @return {Array} The value from each item in the Array.
     */
    pluck: function(arr, prop) {
        var ret = [];
        Ext.each(arr, function(v) {
            ret.push(v[prop]);
        });
        return ret;
    },

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     * @param {Array} array
     * @param {Function} fn Callback function for each item
     * @param {Object} scope Callback function scope
     * @return {Array} results
     */
    map: function(array, fn, scope) {
        if (supportsMap) {
            return array.map(fn, scope);
        }
        
		var results = [];

		for (var i = 0, l = array.length; i < l; i++) {
			if (i in array) {
                results[i] = fn.call(scope, array[i], i, array);
            }
		}

		return results;
	},

    /**
     * Filter through an array and remove empty item as defined in {@link Ext.isEmpty}
     * @see Ext.Array.filter
     * @param {Array} array
     * @return {Array} results
     */
	clean: function(array) {
		return Ext.Array.filter(array, function(item){
			return !Ext.isEmpty(item);
		});
	},

    /**
     * @param {Array} array
     * @return {Array} results
     */
	unique: function(array) {
        var clone = [];

        this.forEach(array, function(item) {
            if (!this.contains(clone, item)) {
                clone.push(item);
            }
        }, this);

		return clone;
	},

    /**
     * Creates a new array with all of the elements of this array for which the provided filtering function returns true.
     * @param {Array} array
     * @param {Function} fn Callback function for each item
     * @param {Object} scope Callback function scope
     * @return {Array} results
     */
    filter: function(array, fn, scope) {
        if (supportsFilter) {
            return array.filter(fn, scope);
        }

		var results = [];

		for (var i = 0, l = array.length; i < l; i++) {
			if ((i in array) && fn.call(scope, array[i], i, array)) {
                results.push(array[i]);
            }
		}

		return results;
	},

    /**
     * Converts a value to array if it's not already an array
     * @param {Array/Mixed} value The value to convert to an array if it is defined and not already an array.
     * @return {Array} array
     */
    from: function(value) {
		if (Ext.isIterable(value)) {
            return Ext.Array.toArray(value);
        }

        if (Ext.isDefined(value) && value !== null) {
            return [value];
        }

		return [];
	},

    /**
     * Removes the specified item from the array. If the item is not found nothing happens.
     * @param {Array} array The array
     * @param {Mixed} item The item to remove
     * @return {Array} The passed array itself
     */
    remove: function(array, item) {
        var index = this.indexOf(array, item);

        if (index !== -1) {
            array.splice(index, 1);
        }
        
        return array;
    },

    /**
     * Push an item into the array only if the array doesn't contain it yet
     * @param {Array} array The array
     * @param {Mixed} item The item to include
     * @return {Array} The passed array itself
     */
    include: function(array, item) {
        if (!this.contains(array, item)) {
            array.push(item);
        }
    },

    /**
     * Clone a flat array without referencing the previous one. Note that this is different
     * from Ext.clone since it doesn't handle recursive cloning. Simply a convenient, easy-to-remember method
     * for Array.prototype.slice.call(array)
     * @param {Array} array The array
     * @return {Array} The clone array
     */
    clone: function(array) {
        return Array.prototype.slice.call(array);
    }
};

Ext.deprecate('core', '4.0dev', function() {
    /**
     * @memberOf Ext
     * @deprecated Use {@link Ext.Array.toArray} instead
     */
    Ext.toArray = function() {
        console.warn("[DEPRECATED][Ext.toArray] please use Ext.Array.toArray instead");

        return Ext.Array.toArray.apply(Ext.Array, arguments);
    }

    Ext.pluck = function(arr, prop) {
        console.warn("[DEPRECATED][Ext.pluck] please use Ext.Array.pluck instead");
        
        return Ext.Array.pluck.apply(Ext.Array, arguments);
    };
});

})();
/**
 * @static Ext.Object
 * @type Object
 * 
 * A set of useful static methods to deal with objects
 */

Ext.Object = {
    
    /**
     * Takes an object and converts it to an encoded URL.
     * <pre><code>
     * Ext.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
     * </code></pre>
     * Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
     * @param {Object} object The object to encode
     * @param {String} pre (optional) A prefix to add to the url encoded string
     * @return {String}
     */
    toQueryString: function(object, pre) {
        var empty,
            buf = [],
            e = window.encodeURIComponent;

        Ext.Object.each(object, function(key, item) {
            empty = Ext.isEmpty(item);
            Ext.each(empty ? key : item, function(val){
                buf.push('&', e(key), '=', (!Ext.isEmpty(val) && (val != key || !empty)) ? (Ext.isDate(val) ? Ext.JSON.encode(val).replace(/"/g, '') : e(val)) : '');
            });
        });

        if (!pre) {
            buf.shift();
            pre = '';
        }

        return pre + buf.join('');
    },

    /**
     * Iterate through an object
     * 
     * @param {Object} obj The object to iterate
     * @param {Function} fn The callback function. Passed arguments for each iteration are:
     * <ul>
     * <li><tt>{String}</tt> key</li>
     * <li><tt>{Mixed}</tt> value</li>
     * <li><tt>{Object}</tt> object The object itself</li>
     * </ul>
     * @param {Object} scope The execution scope (<tt>this</tt>) of the callback function
     */
    each: function(obj, fn, scope) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (fn.call(scope || obj, prop, obj[prop], obj) === false) {
                    return;
                }
            }
        }
    },

    /**
     * Merges any number of objects recursively without referencing them or their children.
     * @param {Object} source,...
     * @return {Object} merged The object that is created as a result of merging all the objects passed in.
     */
    merge: function(source, key, value) {
        if (Ext.isString(key)) {
            if (Ext.isObject(value) && Ext.isObject(source[key])) {
                if (value.constructor && value.constructor === Object) {
                    Ext.merge(source[key], value);
                } else {
                    source[key] = value;
                }
            }
            else {
                source[key] = Ext.clone(value);
            }

            return source;
        }

        for (var i = 1, l = arguments.length; i < l; i++){
            var object = arguments[i];

            for (var k in object) {
                Ext.merge(source, k, object[k]);
            }
        }

        return source;
    },

    /*
     * TBD
     */
    keyOf: function(object, value) {
        for (var i in object) {
            if (object.hasOwnProperty(i) && object[i] == value) {
                return i;
            }
        }

        return null;
    },

    /*
     * TBD
     */
    getValues: function(object) {
        var values = [];

        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                values.push(object[i]);
            }
        }

        return values;
    },

    /*
     * TBD
     */
    getKeys: function(object) {
        var keys = [];

        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                keys.push(i);
            }
        }

        return keys;
    }
};


/**
 * A convenient alias method for {@link Ext.Object.merge}
 * @see Ext.Object.merge
 */
Ext.merge = Ext.Object.merge;

//Ext.deprecate('core', '4.0dev', function() {
//    Ext.urlEncode = function() {
//        console.warn("[DEPRECATED][core][4.0dev][Ext.urlEncode] please use Ext.Object.toQueryString instead");
//        return Ext.Object.toQueryString.apply(Ext.Object, arguments);
//    };
//});
/**
 * @static Ext.Function
 * @type Object
 */

Ext.Function = {
    flexSetter: function(fn) {
        return function(a, b) {
            if (a == null) {
                return this;
            }

            if (typeof a != 'string') {
                for (var k in a) {
                    fn.call(this, k, a[k]);
                }

                if (Ext.enumerables) {
                    for (var i = Ext.enumerables.length; i--;) {
                        k = Ext.enumerables[i];
                        if (a.hasOwnProperty(k)) {
                            fn.call(this, k, a[k]);
                        }
                    }
                }
            } else {
                fn.call(this, a, b);
            }

            return this;
        };
    },

    bind: function(fn, scope, args, appendArgs) {
        var method = fn;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            } else if (Ext.isNumber(appendArgs)) {
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            
            return method.apply(scope || window, callArgs);
        };
    },

    pass: function(fn, args, scope) {
        if (args) {
            args = Ext.Array.from(args);
        }

        return function() {
            return fn.apply(scope, args || arguments);
        };
    },

    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = Ext.createInterceptor(sayHi, function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
       </code></pre>
     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @param {Mixed} returnValue (optional) The value to return if the passed function return false (defaults to null).
     * @return {Function} The new function
     */
    createInterceptor: function(origFn, newFn, scope, returnValue) {
        var method = origFn;
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var me = this,
                args = arguments;
                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || window, args) !== false) ?
                origFn.apply(me || window, args) :
                returnValue || null;
            };
        }
    },

    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
Ext.defer(sayHi, 2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
Ext.defer(function(){
    alert('Anonymous');
}, 100);
       </code></pre>
     * @param {Function} fn The function to defer.
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer: function(fn, millis, obj, args, appendArgs) {
        fn = Ext.Function.bind(fn, obj, args, appendArgs);
        if (millis > 0) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },


    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed fcn is called with the parameters of the original function. Example usage:
     *

var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

var sayGoodbye = Ext.createSequence(sayHi, function(name){
    alert('Bye, ' + name);
});

sayGoodbye('Fred'); // both alerts show

     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to sequence
     * @param {Object} scope (optional) The scope (this reference) in which the passed function is executed.
     * If omitted, defaults to the scope in which the original function is called or the browser window.
     * @return {Function} The new function
     */
    createSequence: function(origFn, newFn, scope) {
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var retval = origFn.apply(this || window, arguments);
                newFn.apply(scope || this || window, arguments);
                return retval;
            };
        }
    }
};

/**
 * Shorthand for {@link Ext.util.Functions#defer}
 * @param {Function} fn The function to defer.
 * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
 * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
 * <b>If omitted, defaults to the browser window.</b>
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * if a number the args are inserted at the specified position
 * @return {Number} The timeout id that can be used with clearTimeout
 * @member Ext
 * @method defer
 */

Ext.defer = Ext.Function.defer;

/**
 * Shorthand for {@link Ext.util.Functions#createInterceptor}
 * @param {Function} origFn The original function.
 * @param {Function} newFn The function to call before the original
 * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
 * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
 * @return {Function} The new function
 * @member Ext
 * @method defer
 */

Ext.createInterceptor = Ext.Function.createInterceptor;

/**
 * Shorthand for {@link Ext.util.Functions#createSequence}
 * @param {Function} origFn The original function.
 * @param {Function} newFn The function to sequence
 * @param {Object} scope (optional) The scope (this reference) in which the passed function is executed.
 * If omitted, defaults to the scope in which the original function is called or the browser window.
 * @return {Function} The new function
 * @member Ext
 * @method defer
 */

Ext.createSequence = Ext.Function.createSequence;

Ext.deprecate('core', '4.0dev',
function() {
    /**
     * Shorthand for {@link Ext.util.Functions#createDelegate}
     * @param {Function} fn The function to delegate.
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     * @member Ext
     * @method defer
     */
    Ext.createDelegate = function() {
        console.warn("[DEPRECATED][core][4.0dev][Ext.createDelegate] Use Ext.Function.bind instead");
        return Ext.Function.bind.apply(Ext.Function, arguments);
    };

});

/**
 * @object Ext.Date
 * A set of useful static methods to deal with date
 */

/*
 * Note that if Ext.util.Date is required and loaded, it will copy all methods / properties to
 * this object, for convenience
 */
Ext.Date = {
    /**
     * Returns the current timestamp
     * @return {Date} The current timestamp
     */
    now: Date.now || function() {
        return +new Date;
    },

    /**
     * Returns the number of milliseconds between two dates
     * @param {Date} dateA
     * @param {Date} dateB (optional) Defaults to now
     * @return {Number} The diff in milliseconds
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date));
    }
};
/**
 * The parent class of all classes created with {@link Ext.define}
 * @class Ext.Base
 */

(function(){

var flexSetter = Ext.Function.flexSetter;

Ext.Base = function(){};
Ext.Base.prototype = {
    constructor: function() {
        return this;
    },

    /**
     * Get the prototype of the mixin that matches the given name
     * @param {String} name The mixin name
     * @return {Object} mixin The mixin prototype
     */
    getMixin: function(name) {
        return this.getMixins()[name];
    },

    /**
     * Get all mixin prototypes used in this class
     * @return {Object} mixins The mixin prototypes as key-value pairs
     */
    getMixins: function() {
        return this.$mixinPrototypes || {};
    },

    /**
     * Initialize configuration for this class. A typical example:
     * @example
Ext.define('My.awesome.Class', {
    // The default config
    config: {
        name: 'Awesome',
        isAwesome: true
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    }
});

var awesome = new My.awesome.Class({
    name: 'Super Awesome'
});

alert(awesome.getName()); // 'Super Awesome'

     * @param {Object} config
     * @return {Object} mixins The mixin prototypes as key-value pairs
     */
    initConfig: function(config) {
        if (!this.$configInited) {
            this.config = Ext.Object.merge({}, this.getConfig(), config || {});

            this.applyConfig(this.config);

            this.$configInited = true;
        }

        return this;
    },

    setConfig: function(config) {
        this.applyConfig(config || {});

        return this;
    },

    applyConfig: flexSetter(function(name, value) {
        var setter = 'set' + Ext.String.capitalize(name);

        if (typeof this[setter] === 'function') {
            this[setter].call(this, value);
        }

        return this;
    }),

    getConfig: function() {
        if (!this.config) {
            this.config = {};
        }

        return this.config;
    },

    destroy: function() {

    }
};

/**
 * These static properties will be copied to every newly created class
 * @scope Ext.Base
 */
Ext.apply(Ext.Base, {
    /**
     * Adds / overrides static properties of this class
     * @function
     * @param {String|Ext.Class} name The property name to copy
     * @param {Mixed} value The corresponding value
     */
    extend: flexSetter(function(a, b) {
        this[a] = b;
    }),

    implement: flexSetter(function(a, b) {
        if (Ext.isObject(this.prototype[a]) && Ext.isObject(b)) {
            Ext.Object.merge(this.prototype[a], b);
        }
        else {
            this.prototype[a] = b;
        }
    }),

    override: flexSetter(function(a, b) {
        if (Ext.isObject(this.prototype[a]) && Ext.isObject(b)) {
            Ext.Object.merge(this.prototype[a], b);
        }
        else {
            if (Ext.isFunction(this.prototype[a]) && Ext.isFunction(b)) {
                b.original = this.prototype[a];
            }

            this.prototype[a] = b;
        }
    }),

    mixin: flexSetter(function(name, cls) {
        var mixinPrototype = cls.prototype,
            myPrototype = this.prototype;

        for (var i in mixinPrototype) {
            if (mixinPrototype.hasOwnProperty(i)) {
                if (myPrototype[i] === undefined) {
                    myPrototype[i] = cls.prototype[i];
                }
                else if (i == 'config' && Ext.isObject(myPrototype[i]) && Ext.isObject(mixinPrototype[i])) {
                    Ext.Object.merge(myPrototype[i], mixinPrototype[i]);
                }
            }
        }

        if (!myPrototype.$mixinPrototypes) {
            myPrototype.$mixinPrototypes = {};
        }

        myPrototype.$mixinPrototypes[name] = mixinPrototype;
    })
});

})();
/**
 * Handles class creation throughout the whole framework. Note that most of the time {@link Ext.define} should
 * be used instead, since it's a higher level wrapper that aliases to {@link Ext.ClassManager.create}
 * to enable namespacing and dynamic dependency resolution.
 *
 * Basic syntax:
 * <pre><code>
 * var MyClass = new Ext.Class(properties);
 * </code></pre>
 *
 * in which 'properties' is an object represent a collection of properties that apply to the class.
 *
 * <pre><code>
 * var Person = new Ext.Class({
 *      name: 'Unknown',
 *
 *      constructor: function(name) {
 *          if (name) {
 *              this.name = name;
 *          }
 *
 *          return this;
 *      },
 *
 *      eat: function(foodType) {
 *          alert("I'm eating: " + foodType);
 *
 *          return this;
 *      }
 * });
 *
 * var aaron = new Person("Aaron");
 * aaron.eat("Sandwich"); // alert("I'm eating: Sandwich");
 * </code></pre>
 *
 * Ext.Class has a powerful set of extensible {@link Ext.Class.registerPreprocessor pre-processors} which takes care of
 * everything related to class creation, including but not limited to inheritance, mixins, configuration, statics, etc.
 *
 * Inheritance:
 *
 *<pre><code>
 * var Developer = new Ext.Class({
 *      extend: Person,
 *
 *      constructor: function(name, isGeek) {
 *          this.isGeek = isGeek;
 *
 *          // Apply a method from the parent class' prototype
 *          this.parent.constructor.call(this, name);
 *
 *          return this;
 *      },
 *
 *      code: function(language) {
 *          alert("I'm coding in: " + language);
 *
 *          this.eat("Bugs");
 *
 *          return this;
 *      }
 * });
 *
 * var jacky = new Developer("Jacky", true);
 * jacky.code("Javascript"); // alert("I'm coding in: Javascript");
 *                           // alert("I'm eating: Bugs");
 * </code></pre>
 *
 * Mixins:
 *
 * <pre><code>
 * var CanPlayGuitar = new Ext.Class({
 *      playGuitar: function() { ... }
 * });
 *
 * var CanComposeSongs = new Ext.Class({
 *      composeSongs: function() { ... }
 * });
 *
 * var CanSing = new Ext.Class({
 *      sing: function() {
 *          alert("Do...Re...Mi!")
 *      }
 * });
 *
 * var Musician = new Ext.Class({
 *      extend: Person,
 *      mixins: {
 *          canPlayGuitar: CanPlayGuitar,
 *          canComposeSongs: CanComposeSongs,
 *          canSing: CanSing
 *      }
 * })
 *
 * var CoolPerson = new Ext.Class({
 *      extend: Person,
 *      mixins: {
 *          canPlayGuitar: CanPlayGuitar,
 *          canSing: CanSing
 *      },
 *
 *      sing: function() {
 *          alert("Ahem....");
 *
 *          this.getMixin('canSing').sing.call(this);
 *      }
 * });
 *
 * var me = new CoolPerson("Jacky");
 * me.sing(); // alert("Ahem...");
 *            // alert("Do...Re...Mi!");
 * </code></pre>
 *
 * Config:
 *
 * <pre><code>
 * var SmartPhone = new Ext.Class({
 *      config: {
 *          hasTouchScreen: false,
 *          operatingSystem: 'Other',
 *          price: 500
 *      },
 *
 *      isExpensive: false,
 *
 *      constructor: function(config) {
 *          this.setConfig(config);
 *
 *          return this;
 *      },
 *
 *      applyPrice: function(price) {
 *          this.isExpensive = (price > 500);
 *
 *          return price;
 *      },
 *
 *      applyOperatingSystem: function(operatingSystem) {
 *          if (!(/^(iOS|Android|BlackBerry)$/i).test(operatingSystem)) {
 *              return 'Other';
 *          }
 *
 *          return operatingSystem;
 *      }
 * });
 *
 * var iPhone = new SmartPhone({
 *      hasTouchScreen: true,
 *      operatingSystem: 'iOS'
 * });
 *
 * iPhone.getPrice(); // 500;
 * iPhone.getOperatingSystem(); // 'iOS'
 * iPhone.getHasTouchScreen(); // true;
 * iPhone.hasTouchScreen(); // true
 *
 * iPhone.isExpensive; // false;
 * iPhone.setPrice(600);
 * iPhone.getPrice(); // 600
 * iPhone.isExpensive; // true;
 *
 * iPhone.setOperatingSystem('AlienOS');
 * iPhone.getOperatingSystem(); // 'Other'
 *
 * </code></pre>
 *
 * Statics:
 *
 * <pre><code>
 * var Computer = new Ext.Class({
 *      statics: {
 *          factory: function(brand) {
 *              return new Computer(brand);
 *          }
 *      },
 *
 *      constructor: function() { .. }
 * });
 *
 * var dellComputer = Computer.factory('Dell');
 * </code></pre>
 *
 * @class Ext.Class
 * @author Jacky Nguyen
 */

(function() {

var flexSetter = Ext.Function.flexSetter;

/**
 * @constructor
 * @param {Object} classData An object represent the properties of this class
 * @param {Function} createdFn Optional, the callback function to be executed when this class is fully created.
 * Note that the creation process can be asynchronous depending on the pre-processors used.
 * @return {Ext.Base} The newly created class
 */
Ext.Class = function(classData, createdFn) {
    var self = this.constructor,
        newClass = function() {
            return this.constructor.apply(this, arguments);
        },
        preprocessors = Ext.Array.from(classData.preprocessors || self.getDefaultPreprocessors());

    for (var staticProp in Ext.Base) {
        if (Ext.Base.hasOwnProperty(staticProp)) {
            newClass[staticProp] = Ext.Base[staticProp];
        }
    }

    delete classData.preprocessors;
    
    var process = function(cls, data) {
        var name = preprocessors.shift();

        if (!name) {
            cls.implement(data);

            if (Ext.isFunction(createdFn)) {
                createdFn.call(cls);
            }
            
            return;
        }

        this.getPreprocessor(name).call(this, cls, data, arguments.callee);
    };

    process.call(self, newClass, classData);

    return newClass;
};

/** @scope Ext.Class */
Ext.apply(Ext.Class, {

    /** @private */
    propertyMap: {
        extend: 'extend',
        mixins: 'mixins',
        config: 'config'
    },

    /** @private */
    preprocessors: {},

    /**
     * Register a new pre-processor to be used during the class creation process
     * @function
     * @param {String} name The pre-processor's name
     * @param {Function} fn The callback function to be executed. Typical format:
     * <pre><code>
function(cls, data, fn) {
    // Your code here
    a
    if (fn) {
        fn.call(this);
    }
});
     * </code></pre>
     * Passed arguments for this function are:
     * <ul>
     * <li><code>{Function} cls</code>: The created class</li>
     * <li><code>{Object} data</code>: The set of properties passed in {@link Ext.Class} constructor</li>
     * <li><code>{Function} fn</code>: The callback function that <b>must</b> to be executed when this pre-processor finishes,
     * regardless of whether the processing is synchronous or aynchronous</li>
     * </ul>
     * @return {Ext.Class} this
     */
    registerPreprocessor: flexSetter(function(name, fn) {
        this.preprocessors[name] = fn;

        return this;
    }),

    getPreprocessor: function(name) {
        return this.preprocessors[name];
    },

    getDefaultPreprocessors: function() {
        return this.defaultPreprocessors || [];
    },

    setDefaultPreprocessors: function(preprocessors) {
        this.defaultPreprocessors = Ext.Array.from(preprocessors);

        return this;
    }
});

Ext.Class.registerPreprocessor({
    extend: function(cls, data, fn) {
        var parent = (typeof data.extend === 'function') ? data.extend : Ext.Base,
            temp = function(){};

        temp.prototype = parent.prototype;
        cls.prototype = new temp;
        cls.prototype.self = cls;

        if (data.hasOwnProperty('constructor')) {
            cls.prototype.constructor = cls;
        }
        else {
            cls.prototype.constructor = parent.prototype.constructor;
        }

        cls.superclass = cls.prototype.superclass = cls.prototype.parent = parent.prototype;

        // Merge the parent class' config object without referencing it
        Ext.merge(cls.prototype.config, parent.prototype.config || {});

        delete data.extend;

        if (fn) {
            fn.call(this, cls, data);
        }
    },

    mixins: function(cls, data, fn) {
        var mixins = data.mixins;

        if (mixins) {
            cls.mixin(mixins);
        }

        delete data.mixins;

        if (fn) {
            fn.call(this, cls, data);
        }
    },

    config: function(cls, data, fn) {
        var config = data.config;

        if (config) {
            Ext.Object.each(config, function(name, value) {
                var cName = Ext.String.capitalize(name),
                    pName = '_' + name,
                    apply = 'apply' + cName,
                    setter = 'set' + cName,
                    getter = 'get' + cName,
                    reset = 'reset' + cName,
                    prototype = cls.prototype;

                if (!(apply in prototype)) {
                    prototype[apply] = function(val) {
                        return val;
                    };
                }

                if (!(setter in prototype)) {
                    prototype[setter] = function(val) {
                        var ret = this[apply].call(this, val, this[pName]);

                        if (ret !== undefined) {
                            this[pName] = ret;
                        }

                        return this;
                    };
                }

                if (!(getter in prototype)) {
                    prototype[getter] = function() {
                        return this[pName];
                    };
                }

                if (!(reset in prototype)) {
                    prototype[reset] = function() {
                        return this[setter].call(this, this.config[name]);
                    };
                }

                if (name.search(/^is|has/) !== -1) {
                    if (!(name in prototype)) {
                        prototype[name] = function() {
                            return !!this[getter].apply(this, arguments);
                        };
                    }
                }
            });
        }

        if (fn) {
            fn.call(this, cls, data);
        }
    },

    statics: function(cls, data, fn) {
        if (Ext.isObject(data.statics)) {
            Ext.Object.each(data.statics, function(name, value) {
                cls[name] = value;
            });
        }

        delete data.statics;

        if (fn) {
            fn.call(this, cls, data);
        }
    }
});

Ext.Class.setDefaultPreprocessors(['extend', 'mixins', 'config', 'statics']);

})();

/**
 * @class Ext.ClassManager
 * @singleton
 * @requires Ext.Class
 *
 * Manages all classes and handles mapping from string class name to actual class object
 */

Ext.ClassManager = {

    /**
     * @property classes
     * @type Object
     * All classes which were defined through the ClassManager. Keys are the
     * name of the classes and the values are references to the classes.
     * @private
     */
    classes: {},

    /**
     * @property aliasClassMap
     * @type Object
     * Keys are the aliases, Classes are the values
     * @private
     */
    aliasClassMap: {},

    /**
     * @property dependencyOrder
     * @type Array
     * An array of an order that will work for the currently loaded classes.
     * This is not guaranteed to be the same everytime due to the asynchronous
     * nature of the Class Loader.
     */
    dependencyOrder: [],

    aliasNameMap: {},

    existCache: {},

    /**
     * Checks to see if a class has already been created.
     * @param {String} className
     */
    exist: function(className) {
        var i, root, chunks;

        if (!className) {
            return false;
        }

        if (Ext.isArray(className)) {
            for (i = 0; i < className.length; i++) {
                if (!arguments.callee.call(this, className[i])) {
                    return false;
                }
            }

            return true;
        }

        if (this.classes.hasOwnProperty(className) || this.existCache.hasOwnProperty(className)) {
            return true;
        }

        if (Ext.isString(className)) {
            root = Ext.global;
            chunks = className.split('.');

            for (i = 0; i < chunks.length; i++) {
                if (!root || !root[chunks[i]]) {
                    return false;
                }

                root = root[chunks[i]];
            }

            this.pushToDepencencyList(className);

            this.existCache[className] = true;

            return true;
        }


        return false;
    },

    /**
     * Pushes a class name on the end of the dependency list.
     * @param {String} name
     */
    pushToDepencencyList: function(name) {
        if (name) {
            if (!Ext.Array.contains(this.dependencyOrder, name) && Ext.Array.contains(Ext.Loader.requireHistory, name)) {
                this.dependencyOrder.push(name);
            }
        }

        return this;
    },

    /**
     * Creates a namespaced object by ensuring all subobjects exist and sets
     * a value to the object.
     *
     * For example:
     *  Ext.ClassManager.createNamespace('MyCompany.pkg.Example', value)
     * @param {String} name
     * @param {Mixed} value
     */
    createNamespace: function(name, value) {
        var root  = Ext.global,
            parts = name.split('.'),
            leaf  = parts.pop();

        for (var i = 0, ln = parts.length, part; i < ln; i++) {
            part = parts[i];

            if (!root[part]) {
                root[part] = {};
            }

            root = root[part];
        }

        root[leaf] = value;

        return root[leaf];
    },

    /**
     * Sets a reference to a class.
     * @param {String} name
     * @param {Object} value
     * @returns {Ext.ClassManager} this
     */
    set: function(name, value) {
        this.classes[name] = this.createNamespace(name, value);

        return this;
    },

    /**
     * Retrieve a class by its name.
     * @param {String} name
     * @returns {Class} class
     */
    get: function(name) {
        if (this.classes.hasOwnProperty(name)) {
            return this.classes[name];
        }

        var root  = Ext.global,
            parts = name.split('.'),
            ln    = parts.length,
            i     = 0;

        for (; i < ln; i++) {
            if (!root || !root[parts[i]]) {
                return null;
            }

            root = root[parts[i]];
        }

        return root;
    },

    /**
     * Sets the alias for a class.
     * @param {Class/String} cls a reference to a class or a className
     * @param {String} alias Alias to use when referring to this class
     */
    setAlias: function(cls, alias) {
        var className;

        if (Ext.isString(cls)) {
            className = cls;
        }
        else {
            className = this.getName(cls);
        }

        if (this.aliasClassMap.hasOwnProperty(alias) && Ext.isDefined(console)) {
            console.warn("[Ext.ClassManager] Overriding already existed alias: '"+alias+"' of: '"+this.aliasClassMap[alias]+"' with: '"+className+"'");
        }
        
        this.aliasClassMap[alias] = className;

        return this;
    },

    /**
     * Get a reference to the class by its alias.
     * @param {String} alias
     * @returns {Class} class
     */
    getByAlias: function(alias) {
        return this.get(this.getNameByAlias(alias));
    },

    /**
     * Get the name of a class by alias.
     * @param {String} alias
     * @returns {String} className
     */
    getNameByAlias: function(alias) {
        if (this.aliasClassMap.hasOwnProperty(alias)) {
            return this.aliasClassMap[alias];
        }

        return '';
    },

    /**
     * Get the name of the class.
     * Example:
     *  Ext.ClassManager.getName(Ext.Action); // returns "Ext.Action"
     * @param {Class} class
     * @returns {String} className
     */
    getName: function(object) {
        return object && object.$className || '';
    },

    /**
     * Creates a class. This is usually invoked via the alias Ext.define
     * @param {String} className
     * @param {Object} data
     * @param {Function} createdFn Callback to execute after the class is created.
     * The current context of this will be the class definition.
     */
    create: function(className, data, createdFn) {
        var manager = this;

        if (!Ext.isString(className)) {
            throw new Error("[Ext.define] Invalid className of: '"+className+"', must be a valid string");
        }

        data.$className = className;

        return new Ext.Class(data, function() {
            this.$className = className;

            manager.pushToDepencencyList(className);

            var postprocessors = Ext.Array.from(data.postprocessors || manager.getDefaultPostprocessors()),
                process = function(clsName, cls, clsData) {
                    var name = postprocessors.shift();

                    if (!name) {
                        manager.set(className, cls);

                        if (Ext.isFunction(createdFn)) {
                            createdFn.call(cls, cls);
                        }

                        return;
                    }

                    this.getPostprocessor(name).call(this, clsName, cls, clsData, arguments.callee);
                };

            process.call(manager, className, this, data);
        });
    },

    /**
     * Instantiate a class by alias
     * @param {String} alias
     * @param {Object} args Additional args past the alias will be passed to the
     * class constructor.
     * @returns {Instance} classInstance
     */
    instantiateByAlias: function() {
        var args = Ext.Array.toArray(arguments),
            alias = args.shift(),
            className = this.getNameByAlias(alias);

        if (!className) {
            className = this.aliasNameMap[alias];

            if (!className) {
                throw new Error("[Ext.ClassManager] Cannot create an instance of unrecognized alias: " + alias);
            }

            if (console) {
                console.warn("[Ext.Loader] Synchronously loading '"+className+"'; consider adding Ext.require('"+alias+"') before application's code");
            }

            Ext.Loader.enableSyncMode(true);
            Ext.require(className, function() {
                Ext.Loader.enableSyncMode(false);
            });
        }

        args.unshift(className);

        return this.instantiate.apply(this, args);
    },

    /**
     * Instantiate a class by name.
     * @param {String} className
     * @param {Mixed} Additional arguments beyond the first argument of className
     * will be passed to the constructor of the class.
     * @returns {Instance} instance
     */
    instantiate: function() {
        var args = Ext.Array.toArray(arguments),
            name = args.shift(),
            cls;

        if (!Ext.isString(name) || name.length < 1) {
            throw new Error("[Ext.create] Invalid class name: '"+name+"', must be a valid string");
        }

        cls = this.get(name);

        if (!cls) {
            throw new Error("[Ext.create] Cannot create an instance of non-existing class with name: " + name);
        }

        if (!Ext.isFunction(cls)) {
            throw new Error("[Ext.create] '"+name+"' is a singleton and cannot be instantiated");
        }

        var constructor = cls.prototype.constructor,
            instanceCls = function() {
                return constructor.apply(this, args);
            };

        var temp = function(){};
        temp.prototype = cls.prototype;
        instanceCls.prototype = new temp;
        instanceCls.prototype.constructor = instanceCls;

        return new instanceCls;
    },

    postprocessors: {},

    /**
     * Register a post processor by name
     * @param {String} name
     * @param {Function} postprocessor
     */
    registerPostprocessor: Ext.Function.flexSetter(function(name, fn) {
        this.postprocessors[name] = fn;

        return this;
    }),

    /**
     * Retrieve a post processor by name
     * @param {String} name
     * @returns {Class} postProcessor
     */
    getPostprocessor: function(name) {
        return this.postprocessors[name];
    },

    /**
     * Get default post processors which are applied to every class.
     */
    getDefaultPostprocessors: function() {
        return this.defaultPostprocessors || [];
    },

    /**
     * Set the default post processors
     * @param {String/Array} The name of a registered post processor or an array of names.
     * @returns {Ext.ClassManager} classManager
     */
    setDefaultPostprocessors: function(postprocessors) {
        this.defaultPostprocessors = Ext.Array.from(postprocessors);

        return this;
    },

    addAliases: function(aliases) {
        Ext.merge(this.aliasNameMap, aliases);
    }
};

Ext.ClassManager.registerPostprocessor({
    alias: function(name, cls, data, fn) {
        var aliases = Ext.Array.from(data.alias),
            widgetPrefix = 'widget.',
            i, ln, alias;

        for (i = 0, ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            if (!Ext.isString(alias)) {
                throw new Error("[Ext.define] Invalid alias of: '"+alias+"' for class: '"+name+"'; must be a valid string");
            }

            this.setAlias(cls, alias);
        }

        // This is ugly, will change to make use of parseNamespace for alias later on
        for (i = 0, ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            if (alias.substring(0, widgetPrefix.length) === widgetPrefix) {
                // Only the first alias with 'widget.' prefix will be used for xtype
                // TODO change the property name to $xtype instead
                cls.xtype = alias.substring(widgetPrefix.length);
                break;
            }
        }

        if (fn) {
            fn.call(this, name, cls, data);
        }
    },

    singleton: function(name, cls, data, fn) {
        if (data.singleton === true) {
            cls = new cls;
        }
        
        if (fn) {
            fn.call(this, name, cls, data);
        }
    },

    legacyClassName: function(name, cls, data, fn) {
        var alternates = Ext.Array.from(data.legacyClassName);

        for (var i = 0, ln = alternates.length, alternate; i < ln; i++) {
            alternate = alternates[i];

            if (!Ext.isString(alternate)) {
                throw new Error("[Ext.define] Invalid alternate of: '"+alternate+"' for class: '"+name+"'; must be a valid string");
            }

            this.set(alternate, cls);
        }

        if (fn) {
            fn.call(this, name, cls, data);
        }
    }
});

Ext.ClassManager.setDefaultPostprocessors(['alias', 'singleton', 'legacyClassName']);

/** @scope Ext */
Ext.apply(Ext, {
    /*
     * Convenient shortcut, see {@link Ext.ClassManager#instantiate}
     * @member Ext create
     */
    create: Ext.Function.bind(Ext.ClassManager.instantiate, Ext.ClassManager),

    /*
     * Convenient shortcut
     * @member Ext createWidget
     */
    createWidget: function(name) {
        return Ext.ClassManager.instantiateByAlias.apply(Ext.ClassManager, ['widget.' + name].concat(Array.prototype.slice.call(arguments, 1)));
    },

    /*
     * Convenient shortcut, see {@link Ext.ClassManager#instantiateByAlias}
     * @member Ext createByAlias
     */
    createByAlias: Ext.Function.bind(Ext.ClassManager.instantiateByAlias, Ext.ClassManager),

    /*
     * Convenient shortcut, see {@link Ext.ClassManager#create}
     * @member Ext define
     */
    define: Ext.Function.bind(Ext.ClassManager.create, Ext.ClassManager),

    /*
     * Convenient shortcut, see {@link Ext.ClassManager#getName}
     * @member Ext getClassName
     */
    getClassName: Ext.Function.bind(Ext.ClassManager.getName, Ext.ClassManager)
});
/**
 * @class Ext.Loader
 * @author Jacky Nguyen
 * @singleton
 *
 * The heart of the new dynamic dependency loading capability in Ext JS 4
 */

(function(){

Ext.Loader = {

    /**
     * Flag indicating whether there are still files being loaded
     * @private
     */
    isLoading: false,

    /**
     * Maintain the queue for all dependencies. Each item in the array is an object of the format:
     * {
     *      requires: [...], // The required classes for this queue item
     *      callback: function() { ... } // The function to execute when all classes specified in requires exist
     * }
     * @private
     */
    queue: [],

    /**
     * Maintain the list of files that have already been handled so that they never get double-loaded
     * @private
     */
    isFileLoaded: {},

    /**
     * Maintain the list of listeners to execute when all required scripts are fully loaded
     * @private
     */
    readyListeners: [],

    /**
     * The default base path to look for source files
     * @private
     */
    basePath: '.',

    /**
     * Contains all class names that are ever required via {@link Ext.Loader#require}
     * @private
     */
    requireHistory: [],

    /**
     * Contains optional dependencies to be loaded last
     * @private
     */
    optionalRequires: [],

    /**
     * Configuration
     * @private
     */
    config: {
        /**
         * Whether or not to enable the dynamic dependency loading feature
         * Defaults to false
         * @cfg {Boolean} enabled
         */
        enabled: false,

        /**
         * Whether or not to enable automatic deadlock detection, very useful
         * during development
         * Defaults to true
         * @cfg {Boolean} enableDeadlockDetection
         */
        enableDeadlockDetection: true,

        /**
         * The base path for the loader to look for source files
         * Defaults to the current directory ('.')
         * @cfg {String} basePath
         */
        basePath: '.',

        /**
         * The mapping from namespace to a file path, relative to the base path.
         * For example: if the base path is './src'
         * <pre><code>
         * {
         *      'Ext': '.' // This is set by default, Ext.layout.Container will refer to ./src/layout/Container.js
         *      'My': 'my_own_folder' // My.layout.Container will refer to ./src/my_own_folder/layout/Container.js
         * }
         * </code></pre>
         *
         * If not being specified, for example, <code>Other.awesome.Class</code>
         * will simply refer to <code>./src/Other/awesome/Class.js</code>
         * @cfg {Object} namespaces
         */
        namespaces: {
            'Ext': '.'
        }
    },

    /**
     * Set the configuration for the loader. This should be called right after ext-core.js
     * (or ext-core-debug.js) is included in the page, i.e:
     * <pre><code>
     * &lt;script type="text/javascript" src="ext-core-debug.js">&lt;/script>
     * &lt;script type="text/javascript">
     *      Ext.Loader.setConfig({
     *          enabled: true,
     *          namespaces: {
     *              'My': 'my_own_path'
     *          }
     *      });
     * &lt;/script>
     * &lt;script type="text/javascript">
     *      Ext.require(...);
     *
     *      Ext.Loader.onReady(function() {
     *          // application code here
     *      });
     * &lt;/script>
     * </code></pre>
     * Refer to {@link Ext.Loader#config} for the list of possible properties
     *
     * @param {Object} config The config object to override the default values in {@link Ext.Loader#config}
     * @return {Ext.Loader} this
     */
    setConfig: function(config) {
        Ext.merge(this.config, config);

        return this;
    },

    /**
     * Get the config value corresponding to the specified name. If no name is given, will return the config object
     * @param {String} name The config property name
     * @return {Object/Mixed}
     */
    getConfig: function(name) {
        if (name) {
            return this.config[name];
        }

        return this.config;
    },

    /**
     * Sets the basePath to load files from. Returns itself to support chaining.
     * For example:
     *    Ext.Loader.setBasePath('../../src/').setPath('Ext','.');
     * @param {String} path
     * @returns {Ext.Loader} this
     */
    setBasePath: function(path) {
        this.config.basePath = path;

        return this;
    },

    /**
     * Sets the path of a namespace.
     * For Example:
     *   Ext.Loader.setPath('Ext', '.');
     * Indicates that any classes with the top level object "Ext" will be found
     * at the root basePath.
     */
    setPath: function(name, path) {
        this.config.namespaces[name] = path;

        return this;
    },

    /**
     * Translates a className to a path to load the file from by prefixing
     * the proper prefix and converting the .'s to /'s.
     *
     * For example:
     *   ("Ext.layout.Layout" => "js/Ext/layout/Layout.js")
     *
     * @param {String} className
     * @param {String} overrideBasePath (Optional)
     * @returns {String} path
     */
    getPath: function(className, overrideBasePath) {
        // Start with the base path
        var path = overrideBasePath !== undefined ? overrideBasePath : this.config.basePath,
            namespaces = this.config.namespaces;

        // Iterate through each specified className path ("Ext.layout.Layout" => "js/Ext/layout/Layout.js")
        for (var prefix in namespaces) {
            if (namespaces.hasOwnProperty(prefix)) {
                if (prefix === className.substring(0, prefix.length)) {
                    path += "/" + namespaces[prefix];
                    // Remove prefix from className, as we've already pathed it
                    className = className.substring(prefix.length + 1);
                    break;
                }
            }
        }

        path = path + "/" + className.replace(/\./g, "/") + '.js';
        path = path.replace(/\/\.\//g, '/').replace(/\/\//g, '/');

        return path;
    },

    /**
     * Returns Ext.ClassManager
     * @returns {Ext.ClassManager} manager
     * @private
     */
    getManager: function() {
        return Ext.ClassManager;
    },

    /**
     * Refresh all items in the queue. If all dependencies for an item exist during looping,
     * it will execute the callback and call refreshQueue again. Triggers onReady when the queue is
     * empty
     * @private
     */
    refreshQueue: function() {
        var i, item,
            ln = this.queue.length;

        if (ln == 0) {
            this.triggerReady();
            return;
        }

        for (i = 0; i < ln; i++) {
            item = this.queue[i];

            if (item && this.getManager().exist(item.requires)) {
                this.queue.splice(i, 1);
                item.callback.call(item.scope);
                this.refreshQueue();
                break;
            }
        }
    },

    /**
     * Load a script file, supports both asynchronous and synchronous approaches
     * @param {String} url
     * @param {Function} onLoad
     * @param {Scope} scope
     * @param {Boolean} synchronous
     * @private
     */
    loadScriptFile: function(url, onLoad, scope, synchronous) {
        var noCacheUrl  = url + '?' + Ext.Date.now(),
            fileName    = url.split('/').pop(),
            isLoaded    = false,
            onLoadFn    = function() {
                if (!isLoaded) {
                    isLoaded = true;
                    onLoad.call(scope || script);
                }
            };

        this.isLoading = true;

        if (!synchronous) {
            var script = document.createElement('script'),
                head = document.head || document.getElementsByTagName('head')[0];

            script.type = 'text/javascript';
            script.src = noCacheUrl;
            script.onload = onLoadFn;
            script.onreadystatechange = function() {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    onLoadFn();
                }
            };

            head.appendChild(script);
        }
        else {
            var xhr, status;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            if (xhr) {
                xhr.open('GET', noCacheUrl, false);
                xhr.send(null);

                status = (xhr.status == 1223) ? 204 : xhr.status;

                if (status >= 200 && status < 300) {
                    new Function(xhr.responseText + "\n//@ sourceURL="+fileName)();
                    onLoadFn();
                }
                else {
                    throw new Error("[Ext.Loader] Cannot load: '"+url+"', received status code: '"+status+"'");
                }
            }
        }

        return script;
    },

    /**
     * Loads all classes by the given names and all their direct dependencies; optionally executes the given callback function when
     * finishes, within the optional scope. This method is aliased by {@link Ext.require} for convenience
     * @param {String/Array} requiredClasses Can either be a string or an array of string
     * @param {Function} fn (Optional) The callback function
     * @param {Object} scope (Optional) The execution scope (<code>this</code>) of the callback function
     * @private
     */
    require: function(requiredClasses, fn, scope) {
        var filePath;

        if (Ext.isString(requiredClasses) && Ext.isString(fn)) {
            requiredClasses = Ext.Array.toArray(arguments);
            fn = Ext.emptyFn;
        }

        fn = fn || Ext.emptyFn;
        scope = scope || Ext.global;

        requiredClasses = Ext.Array.clean(Ext.Array.from(requiredClasses));
        requiredClasses = Ext.Array.filter(requiredClasses, function(name) {
            return !this.getManager().exist(name);
        }, this);

        // If the dynamic dependency feature is not being used, throw an error if the dependencies are not defined
        if (!this.config.enabled) {
            if (requiredClasses.length > 0) {
                throw new Error("[Ext.Loader] Missing required classes: " + requiredClasses.join(', '));
            }
        }

        if (requiredClasses.length == 0) {
            fn.call(scope);
            this.refreshQueue();
            return;
        }

        this.queue.push({
            requires: requiredClasses,
            callback: fn,
            scope: scope
        });

        // Array forEach
        for (var i = 0, ln = requiredClasses.length, className; i < ln; i++) {
            className = requiredClasses[i];

            if (!(this.isFileLoaded.hasOwnProperty(className) && this.isFileLoaded[className] === true)) {
                Ext.Array.include(this.requireHistory, className);

                this.isFileLoaded[className] = true;

                filePath = this.getPath(className);

                this.loadScriptFile(filePath, this.refreshQueue, this, this.syncModeEnabled);
            }
        }
    },

    /**
     * @private
     */
    addOptionalRequires: function(requires) {
        this.optionalRequires = this.optionalRequires.concat(Ext.Array.from(requires));

        return this;
    },

    /**
     * @private
     */
    triggerReady: function(force) {
        if (this.isLoading || force) {
            this.isLoading = false;

            var readyListeners = this.readyListeners,
                listener;

            if (this.optionalRequires.length) {
                // Clone then empty the array to eliminate potential recursive loop issue
                var optionalRequires = Ext.Array.clone(this.optionalRequires);

                // Empty the original array
                this.optionalRequires.length = 0;

                this.require(optionalRequires, Ext.Function.pass(this.triggerReady, [true], this), this);
                return this;
            }

            while (readyListeners.length) {
                listener = readyListeners.shift();
                listener.fn.call(listener.scope);
            }
        }

        return this;
    },

    /**
     * Add a new listener to be executed when all required scripts are fully loaded
     * @param {Function} fn The function callback to be executed
     * @param {Object} scope The execution scope (<code>this</code>) of the callback function
     * @param {Boolean} withDomReady Whether or not to wait for document dom ready as well
     */
    onReady: function(fn, scope, withDomReady) {
        if (!(withDomReady === false) && Ext.onReady) {
            var oldFn = fn;

            fn = function() {
                Ext.onReady(oldFn, scope);
            };
        }

        if (!this.isLoading) {
            fn.call(scope);
        }
        else {
            this.readyListeners.push({
                fn: fn,
                scope: scope
            });
        }
    },

    /**
     * Get files that have not been loaded but are currently
     * in the queue.
     * @private
     */
    getNotLoadedInQueue: function() {
        var classes = [],
            queue = this.queue,
            i, ln, item, cls;

        // Ugly loops, but better performance than forEach
        for (i = 0, ln = queue.length; i < ln; i++) {
            item = queue[i];

            for (i = 0, ln = item.requires.length; i < ln; i++) {
                cls = item.requires[i];

                if (!Ext.ClassManager.exist(cls) && !Ext.Array.contains(classes, cls)) {
                    classes.push(cls);
                }

            }
        }

        return classes;
    },


    /**
     * Map of fully qualified class names to an array of dependent classes.
     * @property dependencyMap
     * @type Object
     * @private
     */
    dependencyMap: {},

    /**
     * Retrieves classes that still have not been loaded in the queue
     * and don't have any dependencies.
     * @private
     */
    getUnresolved: function() {
        var unresolved = [],
            dependencies,
            missingClasses = this.getNotLoadedInQueue(),
            i, ln, cls;

        for (i = 0, ln = missingClasses.length; i < ln; i++) {
            cls = missingClasses[i];

            dependencies = this.dependencyMap[cls];

            if (!dependencies || dependencies.length == 0) {
                unresolved.push(cls);
            }
        }

        return unresolved;
    },

    /**
     * @private
     */
    enableSyncMode: function(isEnabled) {
        this.syncModeEnabled = isEnabled;
    }
};

/*
* Convenient shortcut to {@link Ext.Loader#require}
* @member Ext require
*/
Ext.require = Ext.Function.bind(Ext.Loader.require, Ext.Loader);

Ext.Class.registerPreprocessor('loader', function(cls, data, fn) {
    var me = this,
        manager = Ext.ClassManager,
        dependencyProperties = ['extend', 'mixins', 'requires'],
        dependencies = [],
        className = data.$className || null,
        dependencyMap = Ext.Loader.dependencyMap,
        i, j, ln, subLn, value, propertyName, propertyValue;

   /*
    * Basically loop through the dependencyProperties, look for string class names and push
    * them into a stack, regardless of whether the property's value is a string, array or object. For example:
    * {
    *      extend: 'Ext.MyClass',
    *      requires: ['Ext.some.OtherClass'],
    *      mixins: {
    *          observable: 'Ext.util.Observable';
    *      }
    * }
    * which will later be transformed into:
    * {
    *      extend: Ext.MyClass,
    *      requires: [Ext.some.OtherClass],
    *      mixins: {
    *          observable: Ext.util.Observable;
    *      }
    * }
    */
    for (i = 0, ln = dependencyProperties.length; i < ln; i++) {
        propertyName = dependencyProperties[i];

        if (data.hasOwnProperty(propertyName)) {
            propertyValue = data[propertyName];

            if (Ext.isString(propertyValue)) {
                dependencies.push(propertyValue);
            }
            else if (Ext.isArray(propertyValue)) {
                for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                    value = propertyValue[j];

                    if (Ext.isString(value)) {
                        dependencies.push(value);
                    }
                }
            }
            else {
                for (j in propertyValue) {
                    if (propertyValue.hasOwnProperty(j)) {
                        value = propertyValue[j];

                        if (Ext.isString(value)) {
                            dependencies.push(value);
                        }
                    }
                }
            }
        }
    }

    /*
     * Automatically detect deadlocks before-hand,
     * will throw an error with detailed path for ease of debugging. Examples of deadlock cases:
     * 
     * - A extends B, then B extends A
     * - A requires B, B requires C, then C requires A
     *
     * The detectDeadlock function will recursively transverse till the leaf, hence it can detect deadlocks
     * no matter how deep the path is.
     */
    if (className && Ext.Loader.getConfig('enableDeadlockDetection')) {
        dependencyMap[className] = dependencies;

        var deadlockPath = [],
            detectDeadlock = function(cls) {
                deadlockPath.push(cls);

                if (dependencyMap[cls]) {
                    if (Ext.Array.contains(dependencyMap[cls], className)) {
                        throw new Error("[Ext.Loader] Deadlock detected! '"+className+"' and '"+deadlockPath[1]+"' mutually require each others. " +
                            "Path: " + deadlockPath.join(' -> ') + ' -> ' + deadlockPath[0]);
                    }

                    for (i = 0, ln = dependencyMap[cls].length; i < ln; i++) {
                        detectDeadlock(dependencyMap[cls][i]);
                    }
                }
            };

        detectDeadlock(className);
    }

    Ext.require(dependencies, function() {
        for (i = 0, ln = dependencyProperties.length; i < ln; i++) {
            propertyName = dependencyProperties[i];

            if (data.hasOwnProperty(propertyName)) {
                propertyValue = data[propertyName];

                if (Ext.isString(propertyValue)) {
                    data[propertyName] = manager.get(propertyValue);
                }
                else if (Ext.isArray(propertyValue)) {
                    for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                        value = propertyValue[j];

                        if (Ext.isString(value)) {
                            data[propertyName][j] = manager.get(value);
                        }
                    }
                }
                else {
                    for (j in propertyValue) {
                        if (propertyValue.hasOwnProperty(j)) {
                            value = propertyValue[j];

                            if (Ext.isString(value)) {
                                data[propertyName][j] = manager.get(value);
                            }
                        }
                    }
                }
            }
        }

        if (fn) {
            fn.call(me, cls, data);
        }

    });
});

Ext.Class.getDefaultPreprocessors().unshift('loader');

Ext.ClassManager.registerPostprocessor('uses', function(name, cls, data, fn) {
    if (data.uses) {
        var uses = Ext.Array.from(data.uses);

        uses = Ext.Array.filter(uses, function(use) {
            return Ext.isString(use);
        });

        Ext.Loader.addOptionalRequires(uses);
    }

    if (fn) {
        fn.call(this, name, cls, data);
    }
});

Ext.ClassManager.getDefaultPostprocessors().push('uses');

})();




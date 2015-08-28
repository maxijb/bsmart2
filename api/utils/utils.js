Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry with - return function
    }
    var __method = this;
    var args = toArray(arguments);
    return function() {
        return __method.apply(this, args.concat(toArray(arguments)));
    }
}


function toArray(enums) {
    return Array.prototype.slice.call(enums);
}



String.prototype.capitalize = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.inArray = function(val) {
    var length = this.length;
    for(var i = 0; i < length; i++) {
        if(this[i] == val) return true;
    }
    return false;
}
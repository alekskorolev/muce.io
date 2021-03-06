import _  from './underscore_extend'

var browserDetector = {
    log: function(...args) {
        _.log(...args, this);
    },
    isAppleMobile: _.memoize(function() {
        return /.*AppleWebKit/i.test(window.navigator.userAgent);
    }),
    ifConditionThen: function(condition, cb, args, context) {
        if (!cb) {
            return undefined;
        }
        if (this[condition]()) {
            return cb.apply(context || this, args);
        }
        return undefined;
    },
    ifAppleMobileThen: function(cb, args, context) {
        return this.ifConditionApply('isAppleMobile', cb, args, context);
    }
}

export default browserDetector;

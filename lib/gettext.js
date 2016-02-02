/****************************/
/* This dummy for localized */
/****************************/
import _ from 'underscore';

var django,
    globals;

globals = window || {};
if (!globals.django) {
    django = globals.django = _.extend({
        pluralidx: function(count) {
            return count === 1 ? 0 : 1;
        },
        gettext: function(msgid) {
            return msgid;
        },
        ngettext: function(singular, plural, count) {
            return count === 1 ? singular : plural;
        },
        gettext_noop: function(msgid) {
            return msgid;
        },
        pgettext: function(context, msgid) {
            return msgid;
        },
        npgettext: function(context, singular, plural, count) {
            return count === 1 ? singular : plural;
        },
        interpolate: function(fmt, obj, named) {
            if (named) {
                return fmt.replace(/%\(\w+\)s/g, function(match) {
                    return String(obj[match.slice(2, -2)])
                });
            } else {
                return fmt.replace(/%s/g, function() {
                    return String(obj.shift())
                });
            }
        },
        get_format: function(format_type) {
            var value = django.formats[format_type];

            if (typeof value === 'undefined') {
                return format_type;
            } else {
                return value;
            }
        }
    });
}



/* add to global namespace */
globals.pluralidx = django.pluralidx;
globals.gettext = django.gettext;
globals.ngettext = django.ngettext;
globals.gettext_noop = django.gettext_noop;
globals.pgettext = django.pgettext;
globals.npgettext = django.npgettext;
globals.interpolate = django.interpolate;
globals.get_format = django.get_format;

export default django;

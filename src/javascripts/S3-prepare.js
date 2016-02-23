/**
 * Detect browser capabilities for use in CSS and scripts
 *
 * Must be concatenated and minified before use in a production environment.
 *
 * Consider inlining to prevent delays in page load.
 **/

/* = Cookie functions = */

var cookieManager = {};

// Set a cookie

cookieManager.create = function (name, value, days) {

    "use strict";

    var date, expires;

    if (days) {

        date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        expires = "; expires=" + date.toGMTString();

    } else {

        expires = "";

    }

    document.cookie = name + "=" + value + expires + "; path=/";

};


// Read a cookie

cookieManager.read = function (name) {

    "use strict";

    var c, i, nameEQ = name + "=", ca = document.cookie.split(';');

    for (i = 0; i < ca.length; i += 1) {

        c = ca[i];

        while (c.charAt(0) === ' ') {

            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {

            return c.substring(nameEQ.length, c.length);
        }

    }

    return null;
};


// Clear a cookie

cookieManager.erase = function (name) {

    "use strict";

    cookieManager.create(name, "", -1);

};





/* = Toggle the viewport based on whether the device is a touch screen or not = */

(function () {

    "use strict";

    // Check the query string and set or remove the "responsive" cookie

    if (location.search.indexOf("?responsive=false") === 0 || location.search.indexOf("&responsive=false") > 0) {

        cookieManager.create("responsive", "false");

    } else if (location.search.indexOf("?responsive=true") === 0 || location.search.indexOf("&responsive=true") > 0) {

        cookieManager.erase("responsive");

    }


    // Read the responsive cookie (if set) to determine whether to make the site responsive or not

    var responsiveCookie = cookieManager.read("responsive"), viewport;

    if (responsiveCookie === "false") {

        viewport = document.getElementById("viewport");

        viewport.setAttribute("content", "width=1206");

    }

}());





/* Remove no-js class */

(function () {

    "use strict";

    var classedElement = document.documentElement;

    classedElement.className = classedElement.className.replace(/(?:^|\s)no-js(?!\S)/, '');

}());

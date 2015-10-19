/**
 * Apply progressive enhancements as applicable.
 *
 * Requires prepare.js and jQuery
 *
 * Must be concatenated and minified before use in a production environment.
 **/

/*global
    
    $, Modernizr, cookie

*/


/* = Browser compatibility warnings = */

(function () {
    
    "use strict";

    var isMajor, isMinor, majorHTML, minorHTML, target = "body";
    
    
    // Check for major issues with browser compatibility
    
    isMajor = !Modernizr.backgroundsize || !Modernizr.inlinesvg || !Modernizr.generatedcontent || !Modernizr.boxsizing;
    
    
    // Check for minor issues with browser compatiblity
    
    isMinor = !Modernizr.rgba || !Modernizr.opacity || !Modernizr.cssgradients || !Modernizr.fontface || !Modernizr.csstransitions;
    
    
    // Set the corresponding warning messages
    
    majorHTML = '<div class="box  box--small  color-scheme--danger"><div class="wrapper"><strong class="island__highlight">Warning!</strong> The browser you&rsquo;re using is not able display this site correctly. <a href="http://whatbrowser.org/">Upgrade your browser</a> for a better experience.</div></div>';
    
    minorHTML = '<div class="box  box--small  color-scheme--warning"><div class="wrapper"><strong class="island__highlight">Warning!</strong> The browser you&rsquo;re using does not support all the features of this site. <a href="http://whatbrowser.org/">Upgrade your browser</a> for a better experience.</div></div>';
    
    
    // Add the warning to the DOM, if required
    
    if (isMajor) {
    
        $(target).prepend(majorHTML);
        
    } else if (isMinor) {
    
        $(target).prepend(minorHTML);
        
    }
    
}());





/* = Mobile/desktop toggle = */
            
(function () {
    
    "use strict";
    
    var linkHTML, responsiveCookie, target = '.js-site-footer';
    
    
    
    // Generate the toggle URL
        
    function responsiveSwitchURL(enabled) {
    
        var urlPath = location.pathname, urlQueryString = location.search, urlHash = location.hash;


        // Check for the presence of a query string

        if (urlQueryString.indexOf("?") >= 0) {
        
            // Check to see if the existing query string contains values for "responsive", and replace them accordingly
        
            if (urlQueryString.indexOf("?responsive=" + !enabled) === 0) {
                
                urlQueryString = urlQueryString.replace("?responsive=" + !enabled, "?responsive=" + enabled);
            
            } else if (urlQueryString.indexOf("&responsive=" + !enabled) > 0) {
                
                urlQueryString = urlQueryString.replace("&responsive=" + !enabled, "&responsive=" + enabled);
            
            } else {
              
                // If not, append the values for "responsive"
              
                urlQueryString += "&responsive=" + enabled;
            
            }
            
        } else {
        
            // If no query string is set, append one
        
            urlQueryString = "?responsive=" + enabled;
            
        }
        
        return urlPath + urlQueryString + urlHash;
        
    }
    
    
    // Apply the responsive toggle
    
    if (Modernizr.touch) {  // Use touch capabilities as a proxy for a mobile device 
        
        if (cookieManager.read("responsive") !== "false") {
        
            linkHTML = '<div class="site-footer__switch  is-mobile"><span class="delimited  delimited--pipe"><strong>Mobile</strong></span> <span class="delimited  delimited--pipe"><a class="site-footer__link" href="' + responsiveSwitchURL(false) + '">Desktop</a></span></div>';
            
        } else {
        
            linkHTML = '<div class="site-footer__switch  is-desktop"><span class="delimited  delimited--pipe"><a class="site-footer__link" href="' + responsiveSwitchURL(true) + '">Mobile</a></span> <span class="delimited  delimited--pipe"><strong>Desktop</strong></span></div>';
            
        }
        
        $(target).append(linkHTML);
    }
    
}());





/* = JavaScript UI toggles = */

$('[data-toggle]').each(function () {
    
    "use strict";
        
    var toggleMode = $(this).attr('data-toggle'), toggleTarget = null;

    
    if ($(this).is('[data-toggle-target]')) {
        
        toggleTarget = $(this).attr('data-toggle-target');
        
    }

    
    if (toggleMode.length > 0  && toggleTarget !== null) {

        $(this).on("click", function () {

            var toggleClass = "is-" + toggleMode;

            $(this).toggleClass(toggleClass);

            $(toggleTarget).toggleClass(toggleClass);

            return false;

        });

    }

});
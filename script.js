(function() {
    'use strict';

    if (document.querySelector('script[src$="/assets/js/common-nav.js"], script[src="assets/js/common-nav.js"]')) {
        return;
    }

    const script = document.createElement('script');
    script.src = '/assets/js/common-nav.js';
    script.defer = true;
    document.head.appendChild(script);
})();

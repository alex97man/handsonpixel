import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check for consent from localStorage (default to false if not set)
    const consent = localStorage.getItem('cookie-consent') === 'true';

    if (!consent || !GA_ID) return;

    // Load Google Analytics Tag
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    } else {
      // Send page view on route change
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    }

    // Meta Pixel (Facebook)
    if (PIXEL_ID) {
        if (!window.fbq) {
            !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', PIXEL_ID);
        }
        window.fbq('track', 'PageView');
    }

    // Microsoft Clarity
    if (CLARITY_ID && !window.clarity) {
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", CLARITY_ID);
    }

  }, [location, GA_ID]);

  return null;
};

export default Analytics;

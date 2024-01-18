import Script from "next/script";

const AtlasSnippet = () => (
    <Script id="atlas-snippet">{`(()=>{"use strict";var t,e={appId:"${process.env.NEXT_PUBLIC_ATLAS_APP_ID}",v:2,autorun:{},q:[],call:function(){this.q.push(arguments)}};window.Atlas=e;var n=document.createElement("script");n.async=!0,n.src="https://app.atlas.so/client-js/atlas.bundle.js";var s=document.getElementsByTagName("script")[0];null===(t=s.parentNode)||void 0===t||t.insertBefore(n,s)})();`}</Script>
);

export default AtlasSnippet;
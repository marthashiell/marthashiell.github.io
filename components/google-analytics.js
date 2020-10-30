import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

@customElement('google-analytics')
class GoogleAnalytics extends PolymerElement {
  static get properties() { return {
    path: {
      type: String,
      observer: 'pathChanged'
    }
  }}

  connectedCallback() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-83209989-1';
    document.body.appendChild(script);

    gtag('js', new Date());
    gtag('config', 'UA-83209989-1', {send_page_view: false});
  }

  pathChanged(path) {
    if (path) {
      gtag('event', 'page_view', {page_path: path});
    }
  }
}

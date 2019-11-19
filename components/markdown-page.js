import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/marked-element/marked-element.js';

@customElement('markdown-page')
class MarkdownPage extends PolymerElement {
  static get properties() { return {
    page: {
      type: String,
      observer: 'pageChanged'
    }
  }}

  pageChanged(page) {
    if (page) {
      this.source = '/content/' + page + '.md';
    }
  }

  onRender() {
    this.dispatchEvent(new CustomEvent('render'));
  }

  static get template() {
    return html`
      <style>
      a {
        color: #369;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      p {
        font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
        line-height: 1.5;
      }
      </style>
      <marked-element disable-remote-sanitization on-marked-render-complete="onRender">
        <div slot="markdown-html"></div>
        <script type="text/markdown" src$="[[source]]"></script>
      </marked-element>
    `;
  }
}

import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/notification-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './google-analytics.js';
import './markdown-page.js';

@customElement('index-app')
class IndexApp extends PolymerElement {
  setDefaultRoute() {
    if (!this.route.path) {
      this.set('route.path', '/' + this.pages[0].page);
    }
  }
  onHeaderRender() {
    this.shadowRoot.querySelector('app-header-layout').notifyResize();
  }

  static get template() {
    return html`
      <style>
        app-drawer {
          text-align: center;
        }
        app-drawer img {
          border-radius: 75px;
          margin: 10px;
        }

        paper-icon-item {
          cursor: pointer;
        }

        app-header-layout {
          max-width: 800px;
        }
        app-header {
          background-color: #FFF;
        }
        app-drawer-layout:not([narrow]) paper-icon-button[drawer-toggle] {
          display: none;
        }
        paper-icon-button {
          float: right;
        }
      </style>
      <app-location route="{{route}}" use-hash-as-path></app-location>
      <app-route route="{{route}}" pattern="/:value" data="{{page}}"></app-route>
      <google-analytics path="[[route.path]]"></google-analytics>

      <iron-ajax auto url="/content/pages.json" handle-as="json" last-response="{{pages}}" on-response="setDefaultRoute"></iron-ajax>

      <app-drawer-layout>
        <app-drawer slot="drawer" opened="{{opened}}">
          <img src="/images/martha.jpg" width="150" height="150"/>
          <paper-listbox selected="{{page.value}}" attr-for-selected="page">
            <template is="dom-repeat" items="[[pages]]">
              <paper-icon-item page="[[item.page]]" drawer-toggle>
                <iron-icon icon="[[item.icon]]" slot="item-icon"></iron-icon>[[item.title]]
              </paper-icon-item>
            </template>
          </paper-listbox>
        </app-drawer>
        <app-header-layout>
          <app-header slot="header" effects="waterfall" fixed>
            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
            <markdown-page page="header" on-render="onHeaderRender"></markdown-page>
          </app-header>
          <markdown-page page="[[page.value]]"></markdown-page>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
}

import { LitElement, html, css } from 'lit';

class FloatingNavbar extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _navItems: { state: true },
      _openMenu: { state: true },
      _currentHash: { state: true },
      _currentPath: { state: true },
    };
  }

  constructor() {
    super();
    this._openMenu = null;
    this._currentHash = window.location.hash;
    this._currentPath = window.location.pathname;
    this._boundEventHandlers = this._handleBrowserEvents.bind(this);
    this._boundClickOutside = this._handleClickOutside.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._boundEventHandlers);
    window.addEventListener('location-changed', this._boundEventHandlers);
    window.addEventListener('popstate', this._boundEventHandlers); // Handles Back button
    document.addEventListener('click', this._boundClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._boundEventHandlers);
    window.removeEventListener('location-changed', this._boundEventHandlers);
    window.removeEventListener('popstate', this._boundEventHandlers);
    document.removeEventListener('click', this._boundClickOutside);
  }

  // FAILSAFE: Runs on every HA update to sync URL if events failed
  willUpdate(changedProperties) {
    // 1. Sync Path
    if (this._currentPath !== window.location.pathname) {
      this._currentPath = window.location.pathname;
    }
    // 2. Sync Hash
    if (this._currentHash !== window.location.hash) {
      this._currentHash = window.location.hash;
    }

    // 3. Handle Styles
    if (changedProperties.has('_config')) {
      const styles = this._config.styles || {};
      if (styles.z_index) this.style.setProperty('--z-index', styles.z_index);
      if (styles.margin_left) this.style.setProperty('--margin-left', styles.margin_left);
      this.style.setProperty('--spacer-height', styles.spacer_height || '80px');
    }
  }

  _handleBrowserEvents() {
    // Force close menu on any navigation
    this._openMenu = null;

    // Small delay to allow browser to complete history update
    setTimeout(() => {
      this._currentPath = window.location.pathname;
      this._currentHash = window.location.hash;
      this.requestUpdate();
    }, 50);
  }

  _handleClickOutside(e) {
    if (!this._openMenu) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._openMenu = null;
    }
  }

  setConfig(config) {
    if (!config.items) throw new Error('You need to define a list of items');
    this._config = config;
    this._navItems = config.items.map((item, index) => ({
      ...item,
      id: item.id || `item-${index}`
    }));
  }

  _evaluateBadge(item) {
    if (item.badge_template) {
      try {
        const func = new Function('states', 'user', 'hass', `return ${item.badge_template}`);
        return func(this.hass.states, this.hass.user, this.hass);
      } catch (e) { return false; }
    }
    if (item.badge_entity) {
      const stateObj = this.hass.states[item.badge_entity];
      if (!stateObj) return false;
      return stateObj.state === 'on' || Number(stateObj.state) > 0;
    }
    return false;
  }

  _checkUserVisibility(item) {
    if (!item.users) return true;
    if (!this.hass || !this.hass.user) return true;
    return item.users.some(u => u.toLowerCase() === this.hass.user.name.toLowerCase());
  }

  _handleAction(item) {
    if (item.sub_items) {
      // Toggle menu: If clicking the same one, close it. If new, open it.
      this._openMenu = this._openMenu === item.id ? null : item.id;
      return;
    }

    this._openMenu = null; // Close menu on regular action

    if (!item.tap_action) return;
    const action = item.tap_action;

    if (action.action === 'navigate') {
      const path = action.navigation_path;
      if (path) {
        if (path.includes('#')) {
          // Hash navigation
          const targetHash = path.substring(path.indexOf('#'));
          if (this._currentHash === targetHash) {
            // If already there, strip hash (toggle behavior)
            window.history.pushState(null, '', window.location.pathname);
            this._currentHash = '';
          } else {
            window.history.pushState(null, '', path);
            this._currentHash = targetHash;
          }
          window.dispatchEvent(new Event('hashchange'));
        } else {
          // Standard navigation
          window.history.pushState(null, '', path);
        }
        // Notify HA and Browser
        window.dispatchEvent(new Event('location-changed', { bubbles: true, composed: true }));
      }
    }
    else if (action.action === 'call-service') {
      const [domain, service] = action.service.split('.');
      this.hass.callService(domain, service, action.service_data || action.data);
    }
    else if (action.action === 'fire-dom-event') {
      const event = new Event('ll-custom', { bubbles: true, composed: true });
      event.detail = action;
      this.dispatchEvent(event);
    }
    else if (action.action === 'toggle-menu') {
      this.dispatchEvent(new Event('hass-toggle-menu', { bubbles: true, composed: true }));
    }
    else if (action.action === 'url') {
      window.open(action.url_path);
    }
  }

  // --- REVISED: Exclusive Active Logic ---
  _isActive(item) {
    // 1. If a menu is open, ONLY the menu items (parent or child) can be active.
    //    This prevents the "Current Page" button from staying lit while a menu is open.
    if (this._openMenu) {
      if (item.id === this._openMenu) return true; // It's the open menu parent
      if (item.sub_items && item.sub_items.some(sub => this._isActive(sub))) return true; // It contains active child
      // Note: We deliberately DO NOT check path logic here. 
      // If a menu is open, path logic is suppressed.
      return false;
    }

    // 2. Manual/Template Overrides
    if (item.active === true) return true;
    if (item.active_template) {
      try {
        const func = new Function('states', 'user', 'hass', 'path', 'hash', `return ${item.active_template}`);
        return func(this.hass.states, this.hass.user, this.hass, this._currentPath, this._currentHash);
      } catch (e) { return false; }
    }

    // 3. Sub-items logic (Recursive check for closed menus)
    if (item.sub_items) {
      return item.sub_items.some(sub => this._isActive(sub));
    }

    // 4. Standard Path Logic
    if (item.tap_action && item.tap_action.navigation_path) {
      const path = item.tap_action.navigation_path;

      // Hash matching
      if (path.includes('#')) {
        return path.endsWith(this._currentHash) && this._currentHash !== '';
      }

      // Path matching (Normalized to ignore trailing slashes)
      const current = this._currentPath.replace(/\/$/, "");
      const target = path.replace(/\/$/, "");
      return current === target;
    }

    return false;
  }

  render() {
    if (!this._navItems) return html``;
    const styles = this._config.styles || {};
    const isPreview = this.closest('hui-card-preview') !== null;

    return html`
      <div class="floating-layer ${isPreview ? 'preview-mode' : ''}" style="
        --navbar-bg: ${styles.background || '#ffffff'};
        --navbar-blur: ${styles.blur || '10px'};
        --navbar-color: ${styles.color || '#454545'};
        --navbar-active-color: ${styles.active_color || '#000000'};
        --navbar-width: ${styles.width || '100%'};
        --icon-size: ${styles.icon_size || '24px'};
        --button-padding: ${styles.button_padding || '6px'};
      ">
        <div class="navbar-container">
          ${this._navItems.map((item) => {
      if (!this._checkUserVisibility(item)) return html``;

      // Determine active state using the new logic
      const isActive = this._isActive(item);
      const showBadge = this._evaluateBadge(item);
      const isMenuOpen = this._openMenu === item.id;

      return html`
              <div class="nav-item-wrapper">
                ${item.sub_items && isMenuOpen ? html`
                  <div class="sub-menu">
                    ${item.sub_items.map(sub => {
        if (!this._checkUserVisibility(sub)) return html``;
        // For sub-items, we still check path logic to highlight current choice
        // But we bypass the top-level "_isActive" suppression logic manually here
        let isSubActive = false;
        if (sub.tap_action && sub.tap_action.navigation_path) {
          const current = this._currentPath.replace(/\/$/, "");
          const target = sub.tap_action.navigation_path.replace(/\/$/, "");
          isSubActive = current === target;
        }

        return html`
                            <div class="sub-menu-item ${!sub.name ? 'icon-only' : ''} ${isSubActive ? 'active' : ''}" 
                                 @click=${(e) => { e.stopPropagation(); this._handleAction(sub); }}>
                              <ha-icon icon="${sub.icon}"></ha-icon>
                              ${sub.name ? html`<span>${sub.name}</span>` : ''}
                            </div>
                        `;
      })}
                  </div>
                ` : ''}

                <div 
                  class="nav-item ${isActive ? 'active' : ''}" 
                  @click=${() => this._handleAction(item)}
                >
                  <div class="icon-container">
                      <ha-icon icon="${item.icon}"></ha-icon>
                      ${showBadge ? html`<div class="badge"></div>` : ''}
                  </div>
                  ${item.name && !item.hide_name ? html`<span class="title">${item.name}</span>` : ''}
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: var(--spacer-height, 80px);
        background: transparent;
        margin-left: var(--margin-left, 0px);
        transition: margin-left 0.3s ease;
      }
      @media (max-width: 870px) {
        :host { margin-left: 0px !important; }
      }
      .floating-layer {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        max-width: 600px;
        z-index: var(--z-index, 6);
      }
      .navbar-container {
        display: flex;
        align-items: center;
        background: var(--navbar-bg);
        backdrop-filter: blur(var(--navbar-blur));
        -webkit-backdrop-filter: blur(var(--navbar-blur));
        border-radius: 35px;
        padding: 10px 16px; 
        width: var(--navbar-width);
        box-shadow: 0px 4px 20px rgba(0,0,0,0.15);
        border: 1px solid rgba(255,255,255,0.2);
        box-sizing: border-box;
      }
      .floating-layer.preview-mode {
        position: absolute;
        bottom: 0; left: 0;
        transform: none;
        width: 100%; max-width: 100%;
      }
      :host-context(hui-card-preview) {
        z-index: 1 !important;
        margin-left: 0 !important;
        height: auto; 
        display: block;
        position: relative;
      }
      .nav-item-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        flex: 1; 
      }
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--navbar-color);
        transition: all 0.2s ease;
        padding: var(--button-padding);
        border-radius: 12px;
      }
      .nav-item:hover { opacity: 1; background-color: rgba(255,255,255,0.1); }
      .nav-item.active {
        color: var(--navbar-active-color);
        opacity: 1;
        transform: scale(1.05);
      }
      .nav-item.active::after {
        content: ''; position: absolute; bottom: 2px;
        width: 4px; height: 4px;
        background: var(--navbar-active-color);
        border-radius: 50%;
      }
      ha-icon { --mdc-icon-size: var(--icon-size); }
      .title { font-size: 10px; margin-top: 4px; font-weight: 500; }
      .icon-container { position: relative; display: flex; align-items: center; justify-content: center; }
      .badge {
        position: absolute; top: -2px; right: -2px;
        width: 8px; height: 8px;
        background-color: var(--error-color);
        border-radius: 50%;
        border: 1px solid var(--navbar-bg);
      }
      .sub-menu {
        position: absolute; bottom: 75px; left: 50%;
        transform: translateX(-50%);
        background: var(--navbar-bg);
        border-radius: 16px;
        padding: 8px;
        box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
        display: flex; flex-direction: column; gap: 6px;
        animation: fadeUp 0.2s ease-out;
        z-index: 1000;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(var(--navbar-blur));
        -webkit-backdrop-filter: blur(var(--navbar-blur));
      }
      .sub-menu-item {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 12px;
        border-radius: 8px; cursor: pointer;
        white-space: nowrap;
        color: var(--navbar-color);
      }
      .sub-menu-item.icon-only { justify-content: center; }
      .sub-menu-item:hover { background: rgba(0,0,0,0.05); color: var(--navbar-active-color); }
      .sub-menu-item span { font-size: 14px; font-weight: 500; }
      .sub-menu-item.active {
        color: var(--navbar-active-color);
        background: rgba(0,0,0,0.05);
        font-weight: bold;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translate(-50%, 10px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    `;
  }
}
customElements.define('mysmart-floating-navbar', FloatingNavbar);
window.customCards = window.customCards || [];
window.customCards.push({ type: "mysmart-floating-navbar", name: "MySmart Floating Navbar", description: "A floating bottom navigation bar." });
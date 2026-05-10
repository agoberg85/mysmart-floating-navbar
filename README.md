# MySmart Floating Navbar

A floating navigation bar card for Home Assistant dashboards.

## Installation

### HACS

1. Open **HACS**.
2. Add `https://github.com/agoberg85/mysmart-floating-navbar` as a custom dashboard repository.
3. Install **MySmart Floating Navbar**.
4. Refresh your browser.

### Manual

1. Copy `mysmart-floating-navbar.js` into your Home Assistant `www` folder.
2. Add it as a dashboard resource:

```yaml
resources:
  - url: /local/mysmart-floating-navbar.js
    type: module
```

## Development

```bash
npm install
npm run build
```

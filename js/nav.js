class Aside extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<nav>
    <link rel="stylesheet" href="${location.origin}/global-stylings/css/nav-styling.css" />
    <div class="wrapper">
      <a id="logo-link" href="${location.origin}">.mohay</a>
      <div id="nav-div">
        <a class="nav-a" href="${location.origin}/pages/documentation/documentation.html">Documentation</a>
        <a class="nav-a" href="${location.origin}/pages/about-us.html">About Us</a>
        <div id="nav-btn-div">
          <a id="nav-codespace-btn" class="codespace-btn" href="${location.origin}/pages/codespace.html">Codespace</a>
        </div>
      </div>
    </div>
  </nav>`;
	}
}
window.customElements.define('nav-bar', Aside);

class NavBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<nav>
    <link rel="stylesheet" href="${location.origin}/global-stylings/css/nav-styling.css" />
    <div class="wrapper">
      <a id="logo-link" href="/">.mohay</a>
      <div id="nav-div">
        <a href="/pages/documentation/documentation.html">Documentation</a>
        <a href="/pages/about-us.html">About Us</a>
        <div id="nav-btn-div">
          <button id="nav-codespace-btn" class="codespace-btn">Codespace</button>
        </div>
      </div>
    </div>
  </nav>`;
	}
}
window.customElements.define('nav-bar', NavBar);
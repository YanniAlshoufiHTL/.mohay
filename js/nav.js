class NavBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<nav>
    <div class="wrapper">
      <div id="logo-div">.mohay</div>
      <div id="nav-div">
        <a href="pages/documentation.html">Documentation</a>
        <a href="pages/about-us.html">About Us</a>
        <div id="nav-btn-div">
          <button id="nav-codespace-btn" class="codespace-btn">Codespace</button>
        </div>
      </div>
    </div>
  </nav>`;
	}
}
window.customElements.define('nav-bar', NavBar);

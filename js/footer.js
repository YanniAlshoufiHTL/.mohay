class Footer extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<div class="footer-wrapper">
      <link rel="stylesheet" href="${location.origin}/global-stylings/css/footer-styling.css" />
      <footer></footer>
    </div>`;
	}
}
window.customElements.define('page-footer', Footer);

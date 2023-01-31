class Aside extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<div class="side-bar">
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./variables.html">Varibles</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./Constants.html">Constants</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./point.html">Points</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./shapes.html">Shapes</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./lines.html">Lines</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./comments.html">Comments</a>
    </li>
    <li class="side-bar-element-wrapper">
      <a class="side-bar-elements" href="./vector.html">Vectors</a>
    </li>
  </div>`;
	}
}
window.customElements.define('documentation-aside', Aside);

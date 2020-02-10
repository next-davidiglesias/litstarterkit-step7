import {until} from 'lit-html/directives/until.js';
import { render, html } from "lit-html";

let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 5000)
  });

const content = (async () => {
  const res = await fetch('https://api.github.com/orgs/nodejs');
  const json = await res.json();
  const wait = await promise;
  return html`<h1>${json.name}</h1>`
})();

const mytemplate = html`${until(content, html`
  <div class="content">
    <div class="lds-circle">
      <div></div>
    </div>
  <span>loading...</span>
  </div>
`)}`

render(mytemplate, document.body.querySelector('section'))
const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title} (${ page.tags.length })</a></li>`)}
    </ul>
  </ul>`);

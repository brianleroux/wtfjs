export default function wtf({ html, state }) {
    const { store } = state

    return html`
      <site-layout>
        <article>
            <h1>${store.title}</h1>
            <p>${store.message.html}</p>
        </article>
      </site-layout>
    `
}

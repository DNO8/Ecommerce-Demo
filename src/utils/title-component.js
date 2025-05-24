import { LitElement, html, css } from 'lit';

export class TitleComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
            }
            h1{
                font-family: Blue-Ocean;
                font-size:2em;
            }
            
        `
    ];
static get properties() {
    return {
        enunciado: { type: String },
    };
}
    render() {
        return html`<h1 class="title">${this.enunciado}<h1>`;
    }
}
customElements.define('title-component', TitleComponent);

import { LitElement, html, css } from 'lit';

export class DescriptionComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                
                
            }
            article{
                position:relative;
                z-index:1;  
            }
            h2{
                font-family: Vaughan;
                font-weight: 300;
            }   
        `
    ];

    render() {
        return html`
        <article>
            <h2>Bienvenidos a mi tienda</h2>
            <p>Descubre mi arte y revisa mis productos terminados<p>
            <p>incluso puedes llevartelos, entra!<p>
        </article>`;
    }
}
customElements.define('description-component', DescriptionComponent);

import { LitElement, html, css } from 'lit';
import { TitleComponent } from '../../../utils/title-component';
import { GridShop } from '../components/grid-shop';
export class ShopView extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                width: 100%;
                min-height: 100vh;
                padding: 3rem;
                box-sizing: border-box;
            }
            .descripcion-tienda {
                margin-bottom: 2rem;
            }
            .grid-container {
                width: 100%;
            }
        `
    ];

    render() {
        return html`
        <title-component enunciado="SHOP"></title-component>
        <article class="descripcion-tienda">
            <p>Descubre todos mis productos aca, todos son de una unidad por lo que cada pieza es unica.</p>
            <p>Tiéntate y distínguete</p>
        </article>
        <article class="grid-container">
            <grid-shop></grid-shop>
        </article>

        `;
    }
}
customElements.define('shop-view', ShopView);

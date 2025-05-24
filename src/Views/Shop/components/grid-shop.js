import { LitElement, html, css } from 'lit';
import { obtenerProductos } from '../../../../public/data/productos';
import { ProductCard } from './product-card';
import './producto-detalle.js';

export class GridShop extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .grid-container {
            list-style-type: none;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            padding: 0;
            margin: 0;
        }

        .item-wrapper {
            position: relative;
        }

        producto-detalle {
            animation: fadeIn 0.5s ease-in-out;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    static get properties() {
        return {
            _products: { type: Array },
            selectedProduct: { type: Object },
            selectedIndex: { type: Number },
        };
    }

    constructor() {
        super();
        this._products = [];
        this.selectedProduct = null;
        this.selectedIndex = -1;
    }

    firstUpdated() {
        obtenerProductos().then(productos => {
            this._products = [...productos];
        });

        document.addEventListener('cartProduct-deleted', this._handleProductCartDeleted.bind(this));
        document.addEventListener('update-stock', this._updateStock.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('cartProduct-deleted', this._handleProductCartDeleted);
        document.removeEventListener('update-stock', this._updateStock);
        super.disconnectedCallback();
    }

    _updateStock(event) {
        const updatedList = event.detail.updatedList;
        this._products = this._products.map(product => {
            const updatedProduct = updatedList.find(p => p.nombre === product.nombre);
            return updatedProduct ? { ...product, stock: updatedProduct.stock } : product;
        });
    }

    _handleProductCartDeleted(event) {
        const productData = event.detail?.product;
        const merma = event.detail.merma;
        if (!productData || typeof productData.quantity !== 'number') return;

        this._products = this._products.map(product => {
            if (product.nombre === productData.nombre) {
                return { ...product, stock: product.stock + merma };
            }
            return product;
        });
    }

    _handleShowDetails(e) {
        this.selectedProduct = e.detail.product;
        this.selectedIndex = e.detail.index;
    }

    _handleCloseDetails() {
        this.selectedProduct = null;
        this.selectedIndex = -1;
    }

    render() {
        return html`
            <ul class="grid-container">
                ${this._products.map((product, index) => html`
                    <li class="item-wrapper">
                        ${this.selectedIndex === index
                            ? html`
                                <producto-detalle
                                    .product=${this.selectedProduct}
                                    display
                                    @close-details=${this._handleCloseDetails}
                                ></producto-detalle>
                            `
                            : html`
                                <product-card
                                    .product=${product}
                                    .index=${index}
                                    @show-details=${this._handleShowDetails}
                                ></product-card>
                            `}
                    </li>
                `)}
            </ul>
        `;
    }
}

customElements.define('grid-shop', GridShop);

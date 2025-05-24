import { LitElement, html, css } from 'lit';

export class ProductoDetalle extends LitElement {
  static styles = css`
  :host {
    display: block;

  }

  :host([display]) {
    transform: translateX(0);
    opacity: 1;
  }

    .container {
      padding: 1rem;
      color:white;
    }

    .close-btn {
      float: right;
      cursor: pointer;
    }
  `;

  static properties = {
    product: { type: Object },
    display: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.product = {};
    this.display = false;
  }

  _close() {
    this.display = false;
    this.dispatchEvent(new CustomEvent('close-details', { bubbles: true, composed: true }));
  }
  

  render() {
    return html`
      <div class="container">
        <span class="close-btn" @click=${this._close}>✖</span>
        <h2>${this.product.nombre}</h2>
        <p>${this.product.descripcion}</p>
        <p>Tamaño: ${this.product.tamaño}</p>
        <p>Peso: ${this.product.peso}</p>
        <p>Materiales: ${this.product.materiales}</p>
        <p>Stock: ${this.product.stock}</p>
      </div>
    `;
  }
}
customElements.define('producto-detalle', ProductoDetalle);

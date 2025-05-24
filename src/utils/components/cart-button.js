import { LitElement, html, css } from 'lit';
import { DropdownComponent } from './dropdown-component';
export class CartButton extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            .cart-container{
                    position:relative;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:90px;
                    height:30px;
            }
            .btn-cart{
                width:5ex;
                height:5ex;
                padding:0;
                border:none;
                margin:0;
                background:none;
                z-index:20;
                cursor:pointer;
            }
            .icon-cart{
                display:block;
                width:inherit;
                height: inherit;
            }
            .bubble-count{
                position:absolute;
                bottom:20%;
                right:30%;
                transform:translate(50%,50%);
                background-color:light-dark(#5f27cd,#900C3F);
                color:#F9F6EE;
                padding:1px;
                width:20px;
                height:20px;
                border-radius:50%;
                font-size:.8em;
                display:flex;
                justify-content:center;
                align-items:center;
            }
            .hidden{
                display:none;
            }
        `
    ];
    static get properties() {
        return {
            count: { type: Number },
        };
    }
    constructor(){
        super();
        this.selectedProducts=[];
        this.count=0;
        this.total=0;
        this.hidden=true;
        this._handleProductSelected=this._handleProductSelected.bind(this);
        this._handleProductCartDeleted=this._handleProductCartDeleted.bind(this);
        this.intermediario=this.intermediario.bind(this);
    }
    connectedCallback(){
        super.connectedCallback();
        document.addEventListener('product-selected',this._handleProductSelected);
        document.addEventListener('cartProduct-deleted', this._handleProductCartDeleted);
        document.addEventListener('Handle-display',this.intermediario);
    }
    disconnectedCallback(){
        document.removeEventListener('product-selected',this._handleProductSelected);
        document.removeEventListener('cartProduct-deleted', this._handleProductCartDeleted);
        document.removeEventListener('Handle-display',this.intermediario);
        super.disconnectedCallback();
    }
    intermediario(event){
        this.hidden=event.detail.hidden;
        this.dispatchEvent(new CustomEvent('send-selected',{
            detail:{prePurchaseList:this.selectedProducts},
            bubbles:true,
            composed:true,
        }))
    }
    _handleProductSelected(event){
        const precio= event.detail.precio;
        const existence = this.selectedProducts.findIndex(p => p.nombre === event.detail.nombre);
        if (existence!=-1) {
            this.sortProducts(existence,precio);
        } else {
            const newProduct = {
                ...event.detail,
                quantity: 1,
            };
            newProduct.stock--
            this.selectedProducts = [...this.selectedProducts, newProduct];
        }
        this.count++;
        this.total += event.detail.precio;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('update-stock',{
            detail:{updatedList:this.selectedProducts},
            bubbles:true,
            composed:true,
        }))
        
    }
    _handleProductCartDeleted(event){
        const productData = event.detail?.product;
        if (!Array.isArray(this.selectedProducts)) {
            console.error('selectedProducts no está inicializado correctamente');
            this.selectedProducts = [];
            return;
        }
        if (!productData || typeof productData.nombre !== 'string') {
            console.error('Producto inválido al eliminar del carrito:', event);
            return;
        }
        const index = this.selectedProducts.findIndex(p => p.nombre === productData.nombre);
        if (index !== -1) {
            const product = this.selectedProducts[index];
            this.count -= product.quantity || 1;
            this.total -= product.precio;
            this.selectedProducts = this.selectedProducts.filter(p => p.nombre !== productData.nombre);
            this.requestUpdate();
        }
    }
    sortProducts(e,precio)
    {
        const setQuantity=(product, i) => {
            if (i === e) {
                product.stock--;
                return { 
                    ...product, 
                    quantity: (product.quantity || 1) + 1, 
                    precio: product.precio + precio,
                };
            }
            return product;
        }
        if (e !== -1) {
            this.selectedProducts = this.selectedProducts.map(setQuantity);
        }
        
        this.requestUpdate(); 
    }
    handleDropdown(){
        this.hidden=!this.hidden;
        this.dispatchEvent(new CustomEvent('display-hidden',{
            detail:{hidden:this.hidden},
            bubbles:true,
            composed:true,
        }))
      }
    render() {
        return html`
        <div class="cart-container">
            <button class="btn-cart" id="btn-cart" @click="${this.handleDropdown}">
                <img class="icon-cart" src="/public/icons/shop-cart.png" alt="icon-insta"></img>
                <span class="${this.count>0?'bubble-count':'hidden'}">${this.count>9?'9+':this.count}</span>
            </button>
            <div id="dropdown-container">
                <dropdown-component .listProducts=${this.selectedProducts} .total=${this.total}></dropdown-component>
            </div>
        </div>`;
    }
}
customElements.define('cart-button', CartButton);

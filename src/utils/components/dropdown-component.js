import { LitElement, html, css } from 'lit';
import { LiquidButton } from '/src/utils/liquid-button.js';

export class DropdownComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            :host([hidden]) {
                display: none;
            }
            .dropdown-sub{  
            position: absolute;
            top: 90%;
            background-color: rgba(255, 160, 203, 0.95);
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 100, 0.3);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            padding: 1rem;
            display: grid;
            grid-template-rows: auto auto;
            gap: 1rem;
            font-family: Vaughan, sans-serif;
            color: #333;
            list-style: none;
            width: 350px;
            z-index: 999;
            transition: all 0.3s ease;
            } 
            .product-row{
                color:black;
                margin-left:auto;
                width:100%;
                height:auto;
                list-style:none;
                gap:0;
                display:grid;
                grid-template-columns: 0.5fr 0.5fr 1fr 1fr 2fr;
                gap:1em;
                place-items:center;
            }
            .close-container{
                width:2ex;
                height:2ex;
                padding:0;
                border:none;
                margin:0;
                background:none;
                cursor:pointer;
            }
            .img-close{
                display:block;
                width:inherit;
                height: inherit;
                }
            .image-cart{
                width:25px;
                height:25px;
            }
            #input-quantity{
                max-width:2rem;
                max-height:2rem;
                text-align:center;
            }
            .content-total{
                text-align: right;
            }
            .linea{
                display: block;
                height: 1px;
                background-color: rgba(255, 255, 100);
                margin: 0 10px 10px 0;
                opacity: 0.5;
            }
            .link{
                display:flex;
                justify-content:center;
                align-items:center;
                text-decoration:none;
                color:#fff;
                border-radius:15px;
                font-weight:600;
                font-size:1rem;
             }
        `
    ];
    static get properties() {
        return {
            listProducts: { type: Array },
            total:{ type: Number },
            valorBase:{type: Number},
            hidden: { type: Boolean, reflect: true },
        };
    }
    constructor(){
        super();
        this.listProducts = [];
        this.total=0;
        this.valorBase=0;
        this.optionsCurrency = { style: "currency", currency: "CLP" };
        this.isHovered = false; 
        this.hoveredButton = '';
        this.hidden=true;
        this._showPanel=this._showPanel.bind(this);
        
    }
    connectedCallback(){
        super.connectedCallback();
        document.addEventListener('display-hidden',this._showPanel);
    }
    disconnectedCallback(){
        document.removeEventListener('display-hidden',this._showPanel);
        super.disconnectedCallback();
    }
    _showPanel(event) {
        this.hidden=event.detail.hidden;
    }
    removeProduct(product){
        this.listProducts = this.listProducts.filter((p) => p.nombre !== product.nombre);
        this.updateTotal();
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('cartProduct-deleted',{
            detail:{
                product:product,
                merma:product.quantity,
                },
            bubbles:true,
            composed:true,
        }))
    }
    updateTotal()
    {
        this.total = this.listProducts.reduce((sum, product) => sum + product.precio, 0)
    }
    handleMouseEnterCart(e) {
        const selected= e.target.getAttribute("text");
        this.hoveredButton=selected;
        
        this.isHovered = true;
        if (selected === 'Terminar Compra') {
            e.target.setAttribute("color1","#36DFE7");
            e.target.setAttribute("color2","#BF09E6");
            e.target.setAttribute("color3","#900C3F");
        }
        this.requestUpdate();
      }
    
      handleMouseLeaveCart(e) {
        const selected= e.target.getAttribute("text");
        this.isHovered = false;
        e.target.setAttribute("color1","36DFE7");
        e.target.setAttribute("color2","BF09E6");
        e.target.setAttribute("color3","900C3F");
        this.requestUpdate();
        
      }
      _handleTerminarCompra(event){
        if(this.listProducts.length<1)
        {
            console.error('No hay productos en el carrito');
        }else{
            this.hidden=true;
            this.dispatchEvent(new CustomEvent('Handle-display', {
            detail: {hidden:this.hidden}, 
            bubbles: true,
            composed: true,
            }));
            this.requestUpdate();
        }
      }
    
    render() {
        return html`
        <ul class="dropdown-sub">
            ${this.listProducts.map(product=>html`
             <li class="product-row">
                <!-- boton para eliminar el total de productos -->
                <button class="close-container" @click="${()=>this.removeProduct(product)}"><img class="img-close" src="/public/icons/cerrar.png" alt="icon-close"/></button>
                <span class="image-cart"><img src="/public/${product.imagen}" class="image-cart"></img></span>
                <span>${product.nombre}</span>
                <span>Cantidad
                        <input 
                            id="input-quantity"
                            type="number" 
                            min="1" 
                            step="1" 
                            value="${product.quantity || 1}"
                            readonly
                        >
                </span>
                <span id="product-value">${new Intl.NumberFormat("es-CL",this.optionsCurrency).format(product.precio)} CLP </span>
            </li> 
            `)}
            <li>
                <span class="linea"></span>
                <div class="content-total">
                    <span>Total:</span>
                    <span>${new Intl.NumberFormat("es-CL",this.optionsCurrency).format(this.total)} CLP</span>
                </div>
                
            </li>
            <li>
                <liquid-button
                    text="Terminar Compra"
                    width="180"
                    height="30"
                    color1="#36DFE7"
                    color2="#BF09E6"
                    color3="#900C3F"
                    left="3em"
                    class=link
                    ref="#Buy-layer"
                    @mouseenter=${this.handleMouseEnterCart}
                    @mouseleave=${this.handleMouseLeaveCart}
                    @click=${this._handleTerminarCompra}
                    >
                </liquid-button>
            </li>
        </ul>`;
    }
}
customElements.define('dropdown-component', DropdownComponent);


import { LitElement, html, css } from 'lit';
import { LiquidButton } from '/src/utils/liquid-button.js';
export class ProductCard extends LitElement 
{
    static styles = [
        css`
            :host {
                display: block;
            }

            :host([display]) {
                transform: scaleX(1);
                opacity: 1;
            }

            .container {
                background: white;
                border-radius: 10px;
                padding: 1rem;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            
            .product-card {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color:transparent;
                backdrop-filter:blur(2px);
                border-radius: 15px;
                padding: 1rem;
                box-sizing: border-box;
                box-shadow:2px 0px 5px 2px rgba(78, 78, 78, 0.3);
                cursor:pointer;
            }
            img {
                width: 100%;
                max-width: 200px;
                height: 200px;
                object-fit: cover;
                border-radius:5px;
            }
        `
    ];
    static get properties() {
        return {
            product: { type: Object },
            index: { type: Number },
        };
    }
    constructor(){
        super();
        this.product={}
        this.index=-1
        this.optionsCurrency={style:"currency",currency:"CLP" };
    }
     _productDetails()
    {
        this.dispatchEvent(new CustomEvent('show-details', {
            detail: {
            product:this.product,
            index: this.index,
            },
            bubbles: true,
            composed: true,
        }));
    }
      handleEmisor(product,e)
    {  
        e.stopPropagation();
        if(product.stock===0)
        {
            alert('no hay stock para el producto seleccionado');
        }else{
             const productoConIVA = {
            ...product,
            precio: product.precio + product.iva
            };
            this.dispatchEvent(new CustomEvent('product-selected',{
                detail:productoConIVA,
                bubbles:true,
                composed:true,
            }));
        }
        
    }
    handleMouseEnterCart(e) 
    {
        const selected= e.target.getAttribute("text");
        this.hoveredButton=selected;
        
        this.isHovered = true;
        if (selected === 'Agregar al carrito') {
            e.target.setAttribute("color1","#36DFE7");
            e.target.setAttribute("color2","#BF09E6");
            e.target.setAttribute("color3","#900C3F");
        }
        this.requestUpdate();
    }
    handleMouseLeaveCart(e) 
    {
        const selected= e.target.getAttribute("text");
        this.isHovered = false;
        e.target.setAttribute("color1","36DFE7");
        e.target.setAttribute("color2","BF09E6");
        e.target.setAttribute("color3","900C3F");
        this.requestUpdate();

    }

    render() 
    {
        return html`
        <li @click="${this._productDetails}" class="product-card">
            <h1>${this.product.nombre}</h1>
            <img src="/public/${this.product.imagen}" alt="Product Image"/>
            <p>${new Intl.NumberFormat("es-CL",this.optionsCurrency).format(this.product.precio+this.product.iva)} CLP</p><span>IVA incluido</span>
            <liquid-button
                text="Agregar al carrito"
                width="180"
                height="30"
                color1="#36DFE7"
                color2="#BF09E6"
                color3="#900C3F"
                left="3em"
                class=link
                weight="bolder"
                @mouseenter=${this.handleMouseEnterCart}
                @mouseleave=${this.handleMouseLeaveCart}
                @click="${(e)=>this.handleEmisor(this.product,e)}">
            </liquid-button>
        </li>
        `;
    }
}

customElements.define('product-card', ProductCard);

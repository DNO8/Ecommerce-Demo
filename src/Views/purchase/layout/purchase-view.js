import { LitElement, html, css } from 'lit';
import '/src/Views/Purchase/components/formulario-envio.js'
import '/src/Views/Purchase/components/courier-list.js'

export class PurchaseView extends LitElement {
    static styles = [
        css`:host {
  display: none;
  font-family: sans-serif;
}

.prelistArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: transparent;
}

.prelistArea ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  list-style: none;
  padding: 3rem;
  margin: 0 0 2rem 0;
}

/* PRODUCTOS */
.item-container {
  display: grid;
  grid-template-columns: 100px 1fr 120px;
  gap: 1rem;
  background: #ffffff;
  background-color: transparent;
  backdrop-filter: blur(2px);
  border-radius: 8px;
  padding: 1rem;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
}

.item-container img {
  width: 100px;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #F9F6EE;
}

.product-price {
  font-size: 1rem;
  color: blueviolet;
  font-weight: 600;
}

.quantity {
  font-size: 0.9rem;
  color: #F5FFFA;
}

.stock-warning {
  font-size: 0.9rem;
  color: #F5FFFA;
}

/* ZONA DE PAGO */
.payment-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
}

.card-container,
.subtotal-container,
.btn-container {
  background: #ffffff;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
}
.subtotal-container {
  font-weight: bold;
  font-size: 1.1rem;
}
.btn-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-container button {
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: #007185;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-container button:hover {
  background-color: #005f6b;
}

        `
    ];
    static get properties() {
        return {
            _Prelist: { type: Array },
            
        };
    }
    constructor(){
        super();
        this._Prelist=[];
        this.data=[];
        this.productData=[];
        this._subtotal=0;
        this.gastosEnvio=0;
        this.productQuantity=0;
        this.courierName = 'Starken';
        this.courierId=2;
        this.error=false;
        this.confirmacion=false;
        this.errorMessage="este repartidor no está disponible en tu locación.";
        this.optionsCurrency={style:"currency",currency:"CLP" };
        this.currency=new Intl.NumberFormat("es-CL", this.optionsCurrency);
        this._handleDisplay=this._handleDisplay.bind(this);
        this._handleData=this._handleData.bind(this);
        this._handleCourier=this._handleCourier.bind(this);
        this._handleGastos=this._handleGastos.bind(this);
        this._handleError=this._handleError.bind(this);
        this._handleForm=this._handleForm.bind(this);
        
    }
    connectedCallback(){
        super.connectedCallback();
        document.addEventListener('Handle-display', this._handleDisplay);
        document.addEventListener('send-selected',this._handleData);
        document.addEventListener('send-courier',this._handleCourier);
        document.addEventListener('send-gastos',this._handleGastos);
        document.addEventListener('send-error',this._handleError);
        document.addEventListener('send-data',this._handleForm)
    }
    disconnectedCallback()
    {
        document.removeEventListener('Handle-display', this._handleDisplay);
        document.removeEventListener('send-selected',this._handleData);
        document.removeEventListener('send-courier',this._handleCourier);
        document.removeEventListener('send-gastos',this._handleGastos);
        document.removeEventListener('send-error',this._handleError);
        document.removeEventListener('send-data',this._handleForm);
        super.disconnectedCallback();
    }
    _handleDisplay(){
     
        if (this.style.display === 'block') {
            
          } else {
            this.style.display = 'block';
          }
    }
    _handleData(event){
        this._Prelist=event.detail.prePurchaseList;
        this._subtotal=0;
        this.productQuantity=0;
        this._Prelist.forEach((p)=>{
          this.productQuantity+=p.quantity
            this._subtotal+=p.precio;
        });
    }
    _handleCancelarCompra(){
        this._Prelist=[];
        this.style.display='none';
    }
    _handleForm(event)
    {
      this.productData=event.detail.data.productos
      this.data=event.detail.data
      
    }
     async _handlePayCall()
    {
      const result= await this._crearPago(this.data);
      if(result.success && result.url)
      {
        window.location.href=result.url

      }else{
        alert('error al inciar el pago...'+result.error)
      }
      this.confirmacion=!this.confirmacion
      //this._crearEnvio();
      this.requestUpdate();
    }
    async _crearEnvio()
    {
      if(this.gastosEnvio>0)
      {
        try {
          const result = await fetch('http://localhost:3001/shipit-demo/crear-envio', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body:JSON.stringify(this.data),
          });
          const envio = await result.json();
          if(!envio.success)
          {
            console.log('error:'+envio.error);
          }
          return envio;
        } catch (err) {
          console.error('Error al crear el envio en el backend:', err);
        }
      }
        
    }
    async _crearPago(data)
    {
      const _subtotal=this.data.subtotal+this.gastosEnvio
      
      data={...data,subtotal:_subtotal}
      console.log(data);
      if(this.gastosEnvio>0)
      {
        try {
          const result = await fetch('http://localhost:3001/flow-demo/pagar', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body:JSON.stringify(data),
          });
          const pago = await result.json();
          console.log(pago);
          return pago;
        } catch (err) {
          console.error('Error al crear el pago en flow desde el backend:', err);
        }}
      
    }
    _handleCourier(event){
      event.stopPropagation();
      this.courierName=event.detail.name
      this.courierId=event.detail.id
      this.requestUpdate();
    }
    _handleGastos(event){
      this.gastosEnvio=event.detail
      this.error=false
      this.requestUpdate();
    }
    _handleError(event){
      this.error=event.detail.status;
      console.log('error, '+event.detail.error);
      this.requestUpdate();
    }

    render() {
        return html`
                <div class="prelistArea">
                <ul>
                    ${this._Prelist.map(product => html`
                    <li class="item-container">
                        <img src="/public/${product.imagen}">
                        <div class="product-info">
                        <span class="product-name">${product.nombre}</span>
                        <span class="quantity">Cantidad: ${product.quantity}</span>
                        <span class="product-price">${new Intl.NumberFormat("es-CL", this.optionsCurrency).format(product.precio)} CLP</span>
                        <span class="stock-warning">Solo quedan ${product.stock} ${product.stock > 1 ? 'productos MÁS' : 'producto MÁS'}</span>
                        </div>
                        <div></div> 
                    </li>
                    `)}
                </ul>
                <courier-list></courier-list>
                <formulario-envio 
                .preList=${this._Prelist} 
                .courierName=${this.courierName} 
                .productItems=${this.productQuantity} 
                .subtotal=${this._subtotal} 
                .courierId=${this.courierId}
                .confirmacionVenta=${this.confirmacion}
                ></formulario-envio>
                      <div class="subtotal-container">
                        <p>Gastos de envio: ${this.error?this.errorMessage:this.currency.format(this.gastosEnvio)+" CLP"}</p>
                        <p>SubTotal: ${new Intl.NumberFormat("es-CL", this.optionsCurrency).format(this._subtotal+this.gastosEnvio)} CLP</p> 
                                            
                      </div>
                      <div class="btn-container">
                      <button @click="${this._handleCancelarCompra}">Cancelar Compra</button>
                      <button @click="${this._handlePayCall}">Proceder al Pago</button>
                      </div>
                  </div>
                </div>`;
    }
}
customElements.define('purchase-view', PurchaseView);

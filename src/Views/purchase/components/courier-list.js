import { LitElement, html, css } from 'lit';

export class CourierList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 70vw;
        box-sizing: border-box;
        margin: 0;
        padding: 2rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: transparent;
        backdrop-filter: blur(2px);
      }

      h2 {
        font-family: Caviar-Dreams;
        color:blueviolet;
      }

      .couriers-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        grid-auto-rows: minmax(70px, 70px);
        gap: 1.5rem;
        width: 100%;
        justify-content: center;
        align-content: center;
      }

      .card {
        background: white;
        border-radius: 16px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        position: relative;
        z-index: 0;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
      }

      .card img {
        max-width: 70px;
        object-fit: contain;
        margin-bottom: 0.5rem;
      }

      .card.selected {
        border: 2px solid transparent;
        background-clip: padding-box;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
      }

      .card.selected::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 18px;
        background: linear-gradient(135deg, #ff69b4,rgb(172, 110, 231));
        filter: blur(6px);
        opacity: 0.9;
      }
    `
  ];

  static get properties() {
    return {
      _courierList: { type: Array },
      selectedCourier: { type: Number },
    };
  }

  constructor() {
    super();
    this._courierList = [];
    this.selectedCourier = 0;
    
  }
  firstUpdated()
  {
    this._showCouriers();
  }
  async _showCouriers() {
    try {
      const couriersPermitidos=[2,1,8];
      const result = await fetch('http://localhost:3001/shipit-demo/couriers', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      });
      const couriers = await result.json();
      this._courierList=couriers.filter(courier=>couriersPermitidos.includes(courier.id));
    } catch (err) {
      console.error('Error al obtener couriers:', err);
    }
  }

  selectCourier(courierId,name) {
    this.selectedCourier = courierId;
    this.dispatchEvent(new CustomEvent('send-courier',
        {
            detail:{name,id:this.selectedCourier},
            bubbles:true,
            composed:true,
            
        }
    ));
  }

  render() {
    return html`
      <h2>Elige tu método de envío.</h2>
      <p>Prueba todos los repartidores puede que alguno salga mas barato ;)</p>
      <div class="couriers-container">
        ${this._courierList.map(
          courier => html`
            <div
              class="card ${this.selectedCourier === courier.id ? 'selected' : ''}"
              @click=${() => this.selectCourier(courier.id,courier.name)}
            >
              <img src="${courier.image_original_url}" alt="repartidor" />
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('courier-list', CourierList);

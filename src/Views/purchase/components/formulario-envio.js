import { LitElement, html, css } from 'lit';
import { obtenerDirecciones } from '../../../../public/data/direcciones.mjs';

export class FormularioEnvio extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }

    .payment-section {
      width: 70vw;
      height: auto;
      background-color: transparent;
      backdrop-filter: blur(2px);
    }

    form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.2rem 2rem;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      height: 100%;
      align-content: start;
    }

    h2 {
      grid-column: 1 / -1;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: #fff;
    }

    .form-group label {
      margin-bottom: 0.4rem;
      font-size: 0.95rem;
      font-weight: 500;
      color: #fff;
    }

    .form-group input {
      color: #F5FFFA;
    }

    .form-group input::placeholder {
      color: #F5FFFA;
    }

    .form-group input,
    .form-group select {
      padding: 0.65rem 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      color: #F5FFFA;
      background: transparent;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-group select > option {
      color: rgb(136, 136, 136);
    }

    .form-group input:focus,
    .form-group select:focus {
      border-color: transparent;
      color: #E2DFD2;
      outline: none;
    }

    button {
      grid-column: 1 / -1;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
      background-color: #5c6bc0;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #3f51b5;
    }

    .error {
      color: #fff5ee;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    @media (max-width: 600px) {
      form {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `;

  static get properties() {
    return {
      preList: { type: Array },
      courierName: { type: String },
      courierId: { type: Number },
      productItems: { type: Number },
      subtotal: { type: Number },
      _errores: { type: Array },
      confirmacionVenta: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._formData = {
      nombre: '',
      direccion: '',
      numero:0,
      comuna: '',
      ciudad: '',
      region: '',
      correo: '',
      tel: 0,
    };
    this.preList = [];
    this._errores = [];
    this._requiredFields = ['nombre', 'correo', 'tel', 'direccion', 'numero', 'comuna', 'region'];
    this.regionesOrdenadas = [];
    this._comunasFiltradas = [];
    this.data=[];
    this.productItems = 0;
    this.confirmacionData=false;
    obtenerDirecciones().then((direcciones) => {
      this.regionesOrdenadas = [...direcciones];
    });
  }

  updated(changedProps) {
    if (changedProps.has('courierName')) {
      const completo = this._requiredFields.every((campo) => this._formData[campo]);
      if (completo) {
        this._formData.comuna = this.removeAccents(this._formData.comuna);
        this._cotizarEnvio();
      }
    }
  }

  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  }

  _handleRegionChange(e) {
    const regionId = Number(e.target.value);
    this._formData.region = regionId;
    this._comunasFiltradas = this.regionesOrdenadas.filter((c) => c.region_id === regionId);
    this._formData.comuna = '';
    this._updateForm(e); // también valida
  }

  _updateForm(e) {
    const { name, value,type } = e.target;
    if(type!='number' && type!='tel')
    {
      this._formData[name] = value.trim();
    }else{
      this._formData[name]=Number(value);
    }
    this._errores = this._requiredFields.filter((campo) => !this._formData[campo]);
    if (this._errores.length === 0) {
      this._formData.comuna = this.removeAccents(this._formData.comuna);
      this._cotizarEnvio();
    }
  }

  async _cotizarEnvio() {
    const data = {
      ...this._formData,
      productos: this.preList.map((p) => ({
        sku_id:p.id, 
        nombre: p.nombre,
        amount:p.quantity,
        description:p.descripcion,
        peso: p.peso,
        alto: p.alto,
        ancho: p.ancho,
        largo: p.largo,
      })),
      courier: this.courierName,
      courierId:this.courierId,
      productItems: this.productItems,
      subtotal: this.subtotal,
      descripcion:'articulos hechos a mano',
      nBoletaVenta:"BELENYOTEAMABA",
    };
    this.data=data;
    const result = await fetch('http://localhost:3001/shipit-demo/cotizar', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    const precioEnvio = await result.json();
    if (precioEnvio.error) {
      document.dispatchEvent(new CustomEvent('send-error', {
        detail: {status:true,error:precioEnvio.error},
        bubbles: true,
        composed: true,
      }));
    } else {
      const gastosEnvio = precioEnvio.precio;
      document.dispatchEvent(new CustomEvent('send-gastos', {
        detail: gastosEnvio,
        bubbles: true,
        composed: true,
      }));
      this.confirmacionData=true;
      if(this.confirmacionData===true)
      {
        this.dispatchEvent(new CustomEvent('send-data',{
          detail:{data:this.data},
          bubbles:true,
          composed:true,
        }))
      }
    }
  }

  render() {
    return html`
      <div class="payment-section">
        <form>
          ${this._renderInput('nombre', 'Nombre Completo', 'text', 'Nombre es requerido')}
          ${this._renderInput('correo', 'Correo', 'email', 'Correo es requerido')}
          ${this._renderInput('tel', 'Celular', 'tel', 'Celular es requerido')}
          ${this._renderInput('direccion', 'Calle Domicilio', 'text', 'Dirección es requerida')}
          ${this._renderInput('numero', 'Número', 'number', 'Número es requerido')}
          ${this._renderInput('anexo', 'Opcional', 'text')}
          ${this._renderInput('ciudad', 'Ciudad', 'text')}

          <div class="form-group">
            <label>Región</label>
            <select name="region" @change="${this._handleRegionChange}">
              <option value="">Seleccione una región</option>
              ${[...new Set(this.regionesOrdenadas.map(c => JSON.stringify({ id: c.region_id, name: c.region_name })))]
                .map(json => {
                  const region = JSON.parse(json);
                  if(region.name==='Metropolitana')//Solo traer la region Metropolitana por rentabilidad costo
                  {
                    return html`<option value="${region.id}" ?selected="${this._formData.region == region.id}">${region.name}</option>`;
                  }
                  return;
                })}
            </select>
            ${this._errores.includes('region') ? html`<span class="error">Región es requerida</span>` : ''}
          </div>

          <div class="form-group">
            <label>Comuna</label>
            <select name="comuna" @change="${this._updateForm}">
              <option value="">Seleccione una comuna</option>
              ${this._comunasFiltradas.map(comuna => html`
                <option value="${comuna.name}" ?selected="${this._formData.comuna === comuna.name}">${comuna.name}</option>
              `)}
            </select>
            ${this._errores.includes('comuna') ? html`<span class="error">Comuna es requerida</span>` : ''}
          </div>
        </form>
      </div>
    `;
  }

  _renderInput(name, label, type = 'text', errorMsg = '') {
    const placeAnexo=label==='Opcional'? 'Ej: casa 5/ depto 303': label;
    return html`
      <div class="form-group">
        <label>${label}</label>
        <input name="${name}" type="${type}" placeholder="${placeAnexo}" @input="${this._updateForm}" />
        ${errorMsg && this._errores.includes(name) ? html`<span class="error">${errorMsg}</span>` : ''}
      </div>
    `;
  }
}

customElements.define('formulario-envio', FormularioEnvio);

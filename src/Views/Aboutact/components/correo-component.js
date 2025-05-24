import { LitElement, html, css } from 'lit';
import { LiquidButton } from '/src/utils/liquid-button.js';

export class CorreoComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            section{
                display:inline-block;
                background-color:red;
                padding:3rem;
                background-color:transparent;
                background-image:linear-gradient(120deg, rgba(243, 104, 224,0.3),rgba(196, 69, 105,0.5  ));
                backdrop-filter:blur(10px);
                background-size:30px;
                border-radius:15px;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
                position:relative;
                right:10em;
                left:70%;
                top:-3em;
            }
            .mail-container{
            display:flex;
            gap:10px;
            }
            input{
                border-radius:15px;
                padding:8px;
                text-align:center;
                font-family:inherit;
            }
            .btn-copy{
                font-family:inherit;
                margin:0;
                cursor:pointer;
                }
            .btn-enviar{
                font-family:inherit;
                font-weight:600;
                height:auto;
                padding:8px;
                margin:0;
                cursor:pointer;
                letter-spacing:2px;
                }
            .icon{
                display:block;
                width:inherit;
                height: inherit;
            }
            span{
                display:none;
            }
            .span-visible{
                margin:auto;
                display:block;
                color:#feca57;
                font-weight:600;
            }
        `
    ];
    constructor(){
        super();
        this.email = 'bsandovalm@uft.edu';
        this.isHovered = false; 
        this.hoveredButton = '';
    }
    openEmailClient() {
        const subject = encodeURIComponent('Consulta');
        const body = encodeURIComponent('Me interesa tu trabajo!');
        window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
      }
    
      copyEmail() {
        const span=this.renderRoot.querySelector('span');
        navigator.clipboard.writeText(this.email).then(() => {
          span.setAttribute('class','span-visible')
        }).catch((err) => {
          console.error('Error al copiar el correo: ', err);
        });
      }
      
    handleMouseEnter(e) 
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
    handleMouseLeave(e) 
    {
        this.isHovered = false;
        e.target.setAttribute("color1","36DFE7");
        e.target.setAttribute("color2","BF09E6");
        e.target.setAttribute("color3","900C3F");
        this.requestUpdate();

    }

    render() {
        return html`
        <section>
            <p>Para proyectos, contacto o cotización, tengo este correo</p>
            <p>puedes darle al boton de enviar o de copiar</p>
            <div class="mail-container">
                <input type="text" value="${this.email}" readonly></input>
                <liquid-button
                    text="Copiar"
                    width="100"
                    height="30"
                    color1="#36DFE7"
                    color2="#BF09E6"
                    color3="#900C3F"
                    left="2.8em"
                    class=btn-copy
                    weight="bolder"
                    @mouseenter=${()=>this.handleMouseEnter}
                    @mouseleave=${()=>this.handleMouseLeave}
                    @click="${this.copyEmail}">
                </liquid-button>
                <span class="">Correo Copiado!<span>
                 
            </div>
             <liquid-button
                text="Enviar Correo"
                width="180"
                height="30"
                color1="#36DFE7"
                color2="#BF09E6"
                color3="#900C3F"
                left="4em"
                class=btn-envir
                weight="bolder"
                @mouseenter=${()=>this.handleMouseEnter}
                @mouseleave=${()=>this.handleMouseLeave}
                @click="${this.openEmailClient}">
            </liquid-button>
        </section>
        `;
    }
}
customElements.define('correo-component', CorreoComponent);

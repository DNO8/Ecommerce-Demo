import { LitElement, html, css } from 'lit';
import page from 'https://esm.sh/page';
import { LiquidButton } from './liquid-button';
import { CartButton } from './components/cart-button';
export class NavbarComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                margin:0;
                padding:0;
                
            }
            nav{
                width:fit-content;
                position:absolute;
                background-color: transparent;
                backdrop-filter:blur(30px);
                padding:0;
                transition: all 0.3s ease;
                top:0;
                left:30%;
                right:30%;
                z-index:5;
                border-radius:25px;
                box-shadow:2px 2px 2px 1px rgba(0, 0, 0, 0.5);
                }
            .fixed {
                    position: fixed;
                  top: 0;
                     left: 0;
                     right: 0;
                     }
             ul{
             list-style-type: none;
             padding-left:15px;
             margin: 0;
             display: flex;
             justify-content: center;
             gap:5rem;   
             backdrop-filter:blur(30px); 
             transition: 0.5s ease;
             
             }
             li{
                display:flex;
                justify-content:center;
                align-items:center;
             
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
             @media (max-width:1440px){
                 ul{
                     right:4rem;
                     gap:2rem;
                     padding:0.5rem;
                   
                }
            }
            @media (max-width:1024px){
                li{
                    width:80px;
                    height:auto;
                }
            }
            
        `
    ];
    static get properties() {
        return {
            isFixed: { type: Boolean },
            _ruta:{type:String}
        };
    }
    constructor(){
        super();
        this.isFixed=false;
        this.handleScroll=this.handleScroll.bind(this);
        this.isHovered = false; 
        this.hoveredButton = '';
    }
     firstUpdated() {
         this.handleScroll = this.handleScroll.bind(this);
         window.addEventListener('scroll', this.handleScroll);
         this.handleScroll(); 
         
       }
          disconnectedCallback() {
         super.disconnectedCallback();
         window.removeEventListener('scroll', this.handleScroll);
       }
       handleScroll() {
         const viewportHeight = window.innerHeight;
         const scrollPosition = window.scrollY;
    
         if (scrollPosition > viewportHeight && !this.isFixed) {
           this.isFixed = true;
           this.requestUpdate();
         } else if (scrollPosition <= viewportHeight && this.isFixed) {
           this.isFixed = false;
           this.requestUpdate();
         }
       }
       handleMouseEnter(e) {
        const selected= e.target.getAttribute("text");
        this.hoveredButton=selected;
        
        this.isHovered = true;
        if (selected === 'Home') {
            e.target.setAttribute("color1","#36DFE7");
            e.target.setAttribute("color2","#BF09E6");
            e.target.setAttribute("color3","#900C3F");
        } else if (selected === 'Tienda') {
            e.target.setAttribute("color1","#36DFE7");
            e.target.setAttribute("color2","#BF09E6");
            e.target.setAttribute("color3","#900C3F");
        } else if (selected === 'Contacto') {
            e.target.setAttribute("color1","#36DFE7");
            e.target.setAttribute("color2","#BF09E6");
            e.target.setAttribute("color3","#900C3F");
        }
        this.requestUpdate();
      }
    
      handleMouseLeave(e) {
        const selected= e.target.getAttribute("text");
        this.isHovered = false;
        e.target.setAttribute("color1","transparent");
        e.target.setAttribute("color2","transparent");
        e.target.setAttribute("color3","transparent");
        this.requestUpdate();
        
      }

      _handleClickNav(e,ruta){
        e.preventDefault();
        this._ruta=ruta
        page.show(this._ruta);
      }
      
      
    render() {
        return html`
        <nav class="${this.isFixed ? 'fixed' : ''}">
            <ul>
                <li><liquid-button
                    text="Home"
                    width="90"
                    height="30"
                    color1="transparent"
                    color2="transparent"
                    color3="transparent"
                    text-color="#000"
                    left="2.5em"
                    class=link
                    @click=${(e)=>{this._handleClickNav(e,'/')}}
                    @mouseenter=${this.handleMouseEnter}
                    @mouseleave=${this.handleMouseLeave}
                    >
                    </liquid-button>
                </li>
                <li><liquid-button
                    text="Tienda"
                    width="90"
                    height="30"
                    color1="transparent"
                    color2="transparent"
                    color3="transparent"
                    text-color="#000"
                    left="2.3em"
                    class=link
                    @click=${(e)=>{this._handleClickNav(e,'/productos')}}
                    @mouseenter=${this.handleMouseEnter}
                    @mouseleave=${this.handleMouseLeave}
                    >
                    </liquid-button>
                </li>
                <li><liquid-button
                    text="Contacto"
                    width="90"
                    height="30"
                    color1="transparent"
                    color2="transparent"
                    color3="transparent"
                    text-color="#000"
                    left="2em"
                    class=link
                    @click=${(e)=>{this._handleClickNav(e,'/sobre')}}
                    @mouseenter=${this.handleMouseEnter}
                    @mouseleave=${this.handleMouseLeave}
                    >
                    </liquid-button>
                </li>
                <li class="li-cart">
                    <cart-button></cart-button>
                </li>
            </ul>
        </nav>
        `;
    }
}
customElements.define('navbar-component', NavbarComponent);

import { LitElement, html, css } from 'lit';
import { TitleComponent } from '../../../utils/title-component';
import { DescriptionComponent } from '../components/description-component';
import { CarrouselComponent } from '../components/carrousel-component';
export class LandingView extends LitElement {
    static styles = [
        css`
            :host {
                display: grid;
                margin:0;
                padding:0;
                width:100%;
                height:100vh;
                grid-template-areas:
                ". . ."
                ". card-container ."
                ". . .";
                grid-template-rows:0.1fr 0.5fr auto;
                grid-template-columns:0.1fr 0.4fr auto;
                gap:10px;
                align-items:center;
                position:relative;
               
            }
            .btn{
                width:3ex;
                height:3ex;
                padding:0;
                border:none;
                margin:0;
                background:none;
                z-index:1;
            }
            .icon{
                display:block;
                width:inherit;
                height: inherit;
            }
            .btn-shop{
                font-family: Vaughan;
                padding-left: min(2em, 10%);
                padding-right: min(2em, 10%);
                padding-top: min(1em, 10%);
                padding-bottom: min(1em, 5%);
                background:transparent;
                background-color:light-dark(#900C3F,#574b90);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: all 0.5s ease-out;
                letter-spacing:0.5em;
            }
            .btn-shop:hover{
                background-color:light-dark(#574b90,#c44569) ;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            }
            .card-container{
            max-width: 80%;
            max-height: 80vh;
            position:relative;
            z-index:1;
            grid-area: card-container;
            }
            .card-container .card-content{
            background-color:transparent;
            background-image:linear-gradient(120deg, rgba(255, 255, 255,0.3),rgba(196, 69, 105,0.2));
            backdrop-filter:blur(10px);
            border-radius:15px;
            padding:50px;
            }
            .carrousel-box{
                position: absolute;
                margin:0;
                padding:0;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
            }
            
            .button-container{
                display:flex;
                gap:20px;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
            }
            .button-container .btn{
                transition: 0.3s ease;
                border-radius:100%;
            }
            .button-container .btn:hover{
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            }
            @screen (min-width:980px){
                .button-containter{
                    flex-direction: column;
                }
                
            }
            @supports not (backdrop-filter:blur(30px)){
            .card-container .card-content{
                    background-color:#0005;
                }
            }
        `
    ];

    render() {
        return html`
        <section class="card-container">
            <div class="card-content">
            <title-component enunciado="Tienda Belen ART" class="title"></title-component>
            <description-component></description-component>
                <div class="button-container">
                    <a class="btn" href="https://www.instagram.com/beleenart?igsh=YTI1OTR5eGVmODZ2" target="_blank"><img class="icon" src="/public/icons/insta-icon.png" alt="icon-insta"></img></a>
                    <a class="btn" href="https://cl.linkedin.com/" target="_blank"><img class="icon" src="/public/icons/linkedin-icon.png" alt="icon-insta"></img></a>
                    <a class="btn-shop" href="#Shop-layer">TIENDA</a>
                </div>
                
            </div>
        </section>
        <article class="carrousel-box">
            <carrousel-component></carrousel-component>
        </article>

            `;
    }
}
customElements.define('landing-view', LandingView);

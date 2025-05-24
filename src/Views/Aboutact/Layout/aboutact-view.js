import { LitElement, html, css } from 'lit';
import { TitleComponent } from '../../../utils/title-component';
import { CorreoComponent } from '../components/correo-component';

export class AboutactView extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                width:100%;
                height:100vh;
                
                
            }
            .bg-vd-BA{
                width:inherit;
                height:inherit;
                background-color:transparent;
                position:relative;
                overflow:hidden;
            }
            .bg-content{
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                width:30rem;
                margin-top:5rem;
                background-color:red;
                padding:3rem;
                background-color:transparent;
                background-image:linear-gradient(120deg, rgba(243, 104, 224,0.3),rgba(196, 69, 105,0.5  ));
                backdrop-filter:blur(10px);
                background-size:30px;
                border-radius:15px;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
                
                position:relative;
                left:10em;
                top:10em;
                }
            article{
                background-image:linear-gradient(120deg, rgba(255, 255, 255,0.2),rgba(0,0,0,0.2));
                border-radius:15px;
                padding:3em;
                justify-content:center;
            }
            .video-container {
                position: absolute;
                inset: 0; /* top: 0; bottom: 0; left: 0; right: 0 */
                z-index: -1;
                overflow: hidden;
            }

            .video-container video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                opacity: 1;
                display: block;
            }
            // .video-container{
            //     position:absolute;
            //     top:0;
            //     bottom:0;
            //     object-fit:cover;
            //     width:inherit;
            //     height:inherit;
            //     margin:0;
            //     padding:0;
            //     mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10px, rgba(0, 0, 0, 0.5) 15px, rgba(0, 0, 0, 1) 20px);
            //     -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 10px, rgba(0, 0, 0, 0.5) 15px, rgba(0, 0, 0, 1) 20px);
            //     z-index:-1;
            // }
            // .video-container video{
            //     opacity:1;
            //     width: 100%;
            //     max-width: 100%; 
            //     height: auto;
            // }
        `
    ];

    render() {
        return html`
            <section class="bg-vd-BA">
                <section class="bg-content">
                    <title-component enunciado="Acerca de mi"></title-component>
                        <article>
                                <p>Llevo 1 año con este proyecto, el cual llamo "nombre".<p>
                                <p>el cual me ha llevado a diferentes perspectivas del arte y me ha enseñado que la libertad para expresarse es 
                                    lo que mas me mueve y el poder dejarles a ustedes
                                    esa sensacion plasmada en un marco.</p>
                        </article>
                </section>
                <correo-component></correo-component>
                <div class="video-container">
                    <video lazyload autoplay muted loop playsinline preload="metadata">
                        <source src="/public/video/video-Belen-Art.webm" type="video/webm">
                        Tu navegador no soporta video HTML5.
                    </video>
                <div>
            </section>
            
                
        `;
    }
}
customElements.define('aboutact-view', AboutactView);

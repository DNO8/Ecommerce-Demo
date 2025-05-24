import { LitElement, html, css } from 'lit';
import { gsap } from '/src/utils/gsap-config.js';

export class CarrouselComponent extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            
        }
        .carrusel-box {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index:-1;
        }
        .slide-inner {
            display: flex;
            height: 100%;
            transition: transform 0.3s ease;
        }
        .slide {
            flex: 0 0 100%;
            height: 100%;
        }
        .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            mask-image:linear-gradient(#000 95%, transparent);
        }
        .controler-container {
            position: absolute;
            width:100%;
            top:50%;
            left:00%;
            transform: translateY(-50%);
            z-index: 10;  
        }
        .controler-container button{
            cursor:pointer
             width:3rem;
            height:3rem;
            padding:0;
            border:none;
            margin:0;
            background:none;
            }
        .controler-container button img{
            width:inherit;
            height:inherit;
            
        }
        .prevBtn{
            position:absolute;
            left:5%;
            right:95%;
            cursor:pointer;
        }
        .nextBtn{
            position:absolute;
            left:95%;   
            right:5%;
           cursor:pointer;
        }
        @media (max-width:768px){
            .controler-container{
                display:none;
                background:red;
            }
        }
    `;

    static properties = {
        images: { type: Array },
        currentIndex: { type: Number },
    };

    constructor() {
        super();
        this.images = [
            '/public/images/carousel-images/IMG-CRBA1.webp',
            '/public/images/carousel-images/IMG-CRBA2.webp',
            '/public/images/carousel-images/IMG-CRBA3.webp',
            '/public/images/carousel-images/IMG-CRBA4.webp',
            '/public/images/carousel-images/IMG-CRBA5.webp',
            '/public/images/carousel-images/IMG-CRBA6.webp',
            '/public/images/carousel-images/IMG-CRBA7.webp',
            '/public/images/carousel-images/IMG-CRBA8.webp',
            '/public/images/carousel-images/IMG-CRBA9.webp',
            '/public/images/carousel-images/IMG-CRBA10.webp',
            '/public/images/carousel-images/IMG-CRBA11.webp',
            '/public/images/carousel-images/IMG-CRBA12.webp',
            '/public/images/carousel-images/IMG-CRBA13.webp'
        ];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.autoplayInterval = null;
    }

    firstUpdated() {
        this.slideInner = this.renderRoot.querySelector(".slide-inner");
        // this.setupDraggable();
        this.startAutoplay();
    }
    toggleAutoplay() {
        this.isPlaying =!this.isPlaying;
        if (this.isPlaying) {
            this.startAutoplay();
        } else {
            this.stopAutoplay();
        }
    }
    handleUserInteraction() {
        this.stopAutoplay();
        // Limpiar el timeout existente si lo hay
        if (this.autoplayResumeTimeout) {
            clearTimeout(this.autoplayResumeTimeout);
        }

        // Configurar un nuevo timeout para reanudar el autoplay después de 3 minutos
        this.autoplayResumeTimeout = setTimeout(() => {
            this.startAutoplay();
        }, 3 * 60 * 1000); // 3 minutos en milisegundos
    }
    startAutoplay() {
        this.isPlaying = true;
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 2000); // Cambia de diapositiva cada 3 segundos
    }
    stopAutoplay() {
        this.isPlaying = false;
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    // setupDraggable() {
    //     let startX;
    //     let isDragging = false;

    //     this.slideInner.addEventListener('mousedown', (e) => {
    //         startX = e.pageX - this.slideInner.offsetLeft;
    //         isDragging = true;
    //     });

    //     this.slideInner.addEventListener('mousemove', (e) => {
    //         if (!isDragging) return;
    //         e.preventDefault();
    //         const x = e.pageX - this.slideInner.offsetLeft;
    //         const walk = (x - startX) * 2; // Multiplicador para hacer el deslizamiento más sensible
    //         this.slideInner.style.transform = `translateX(${-this.currentIndex * 100 + walk / this.offsetWidth * 100}%)`;
    //     });

    //     this.slideInner.addEventListener('mouseup', () => {
    //         isDragging = false;
    //         const threshold = this.offsetWidth / 4; // Umbral para cambiar de slide
    //         const walk = parseInt(this.slideInner.style.transform.replace('translateX(', ''));
    //         if (Math.abs(walk) > threshold) {
    //             if (walk > 0) {
    //                 this.prevSlide();
    //             } else {
    //                 this.nextSlide();
    //             }
    //         } else {
    //             this.animateToSlide(this.currentIndex);
    //         }
    //     });

    //     this.slideInner.addEventListener('mouseleave', () => {
    //         if (isDragging) {
    //             isDragging = false;
    //             this.animateToSlide(this.currentIndex);
    //         }
    //     });
    // }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.animateToSlide(this.currentIndex);
    }

    prevSlide(e) {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.animateToSlide(this.currentIndex);
    }

    animateToSlide(index) {
        gsap.to(this.slideInner, {
            duration: 0.3,
            x: `-${index * 100}%`,
            ease: "power2.out",
            immediateRender: false
        });
    }

    render() {
        return html`
            <div class="carrusel-box">
                <div class="slide-inner">
                    ${this.images.map(src => html`
                        <div class="slide">
                            <img src="${src}" alt="Slide image" >
                        </div>
                    `)}
                </div>
            </div>
            <div class="controler-container">
                <!-- <button @click=${()=>{this.prevSlide;this.handleUserInteraction;}} class="prevBtn"><img src="/public/icons/atras.png"></img></button>
                <button @click=${()=>{this.nextSlide,this.handleUserInteraction;}} class="nextBtn"><img src="/public/icons/proximo.png"></img></button> -->
            </div>
        `;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.stopAutoplay(); // Asegúrate de detener el autoplay cuando el componente se desmonte
    }
}

customElements.define('carrousel-component', CarrouselComponent);
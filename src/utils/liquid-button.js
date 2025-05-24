import { LitElement, html, css } from 'lit';

export class LiquidButton extends LitElement {
  static properties = {
    tension: { type: Number },
    width: { type: Number },
    height: { type: Number },
    margin: { type: Number },
    hoverFactor: { type: Number },
    gap: { type: Number },
    debug: { type: Boolean },
    forceFactor: { type: Number },
    color1: { type: String },
    color2: { type: String },
    color3: { type: String },
    textColor: { type: String },
    text: { type: String },
    ref:{type:String},
    left:{type: String},
  };

  static styles = css`
    :host {
      display: inline-block;
      
      
    }
    svg {
      cursor: pointer;
      overflow:hidden;
      
    }
    .liquid-button-content{
      position:relative;
      }
    .span-text {
        display:flex;
        position: absolute;
        justify-content:center;
        align-items:center;
        top: 1.5rem;
        font-weight:bold;
        font-family:Caviar-Dreams;
        background: transparent;
        z-index: 10;
        pointer-events: none;
        user-select: none;
        
        }
  `;

  constructor() {
    super();
    this.left=0;
    this.tension = 0.4;
    this.width = 150;
    this.height = 50;
    this.margin = 15;
    this.hoverFactor = -0.1;
    this.gap = 5;
    this.debug = false;
    this.forceFactor = 0.1;
    this.color1 = '';
    this.color2 = '';
    this.color3 = '';
    this.textColor = '#FFFFFF';
    this.text = '';
    this.weight='';
    this.ref="#"
    this.touches = [];
    this.xmlns = 'http://www.w3.org/2000/svg';
    this.noise = 0;
    this.layers = [{
      points: [],
      viscosity: 0.5,
      mouseForce: 400,
      forceLimit: 1,
    }, {
      points: [],
      viscosity: 0.4,
      mouseForce: 500,
      forceLimit: 2,
    }];

    this.mouseHandler = this.mouseHandler.bind(this);
    this.touchHandler = this.touchHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this.animate = this.animate.bind(this);

    this.id = LiquidButton.id = (LiquidButton.id || 0) + 1;
  }

  firstUpdated() {
    this.svgElement = this.shadowRoot.querySelector('svg');
    this.svgText = this.shadowRoot.querySelector('text');
    this.svgDefs = this.shadowRoot.querySelector('defs');

    // Crear paths para las capas
    this.layers.forEach(layer => {
      layer.path = document.createElementNS(this.xmlns, 'path');
      this.svgElement.appendChild(layer.path);
    });

    this.initOrigins();
    this.animate();

    // Agregar event listeners
    document.body.addEventListener('touchstart', this.touchHandler);
    document.body.addEventListener('touchmove', this.touchHandler);
    document.body.addEventListener('touchend', this.clearHandler);
    document.body.addEventListener('touchcancel', this.clearHandler);
    this.svgElement.addEventListener('mousemove', this.mouseHandler);
    this.svgElement.addEventListener('mouseout', this.clearHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Limpiar event listeners
    document.body.removeEventListener('touchstart', this.touchHandler);
    document.body.removeEventListener('touchmove', this.touchHandler);
    document.body.removeEventListener('touchend', this.clearHandler);
    document.body.removeEventListener('touchcancel', this.clearHandler);
    if (this.svgElement) {
      this.svgElement.removeEventListener('mousemove', this.mouseHandler);
      this.svgElement.removeEventListener('mouseout', this.clearHandler);
    }
  }

  mouseHandler(e) {
    this.touches = [{
      x: e.offsetX,
      y: e.offsetY,
      force: 1,
    }];
  }

  touchHandler(e) {
    this.touches = [];
    const rect = this.svgElement.getBoundingClientRect();
    
    for (let touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
      const touch = e.changedTouches[touchIndex];
      const x = touch.pageX - rect.left;
      const y = touch.pageY - rect.top;
      if (x > 0 && y > 0 && x < this.svgWidth && y < this.svgHeight) {
        this.touches.push({x, y, force: touch.force || 1});
      }
    }
    
  }

  clearHandler() {
    this.touches = [];
  }

  get svgWidth() {
    return this.width + this.margin * 2;
  }

  get svgHeight() {
    return this.height + this.margin * 2;
  }

  createPoint(x, y) {
    return {
      x, y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
    };
  }

  initOrigins() {
    this.layers.forEach(layer => {
      const points = [];
      
      // Puntos superiores
      for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
        points.push(this.createPoint(x + this.margin, this.margin));
      }
      
      // Puntos del lado derecho
      for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      
      // Puntos inferiores
      for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
        points.push(this.createPoint(x + this.margin, this.margin + this.height));
      }
      
      // Puntos del lado izquierdo
      for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          (this.height - Math.sin(angle) * this.height / 2) + this.margin - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      
      layer.points = points;
    });
  }

  update() {
    super.update();
    if (!this.svgElement) return;

    this.layers.forEach(layer => {
      const points = layer.points;
      
      // Actualizar puntos
      points.forEach(point => {
        const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
        const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = d * this.forceFactor;
        point.vx += f * ((dx / d) || 0);
        point.vy += f * ((dy / d) || 0);
        
        // Aplicar fuerzas de los toques
        this.touches.forEach(touch => {
          let mouseForce = layer.mouseForce;
          if (
            touch.x > this.margin &&
            touch.x < this.margin + this.width &&
            touch.y > this.margin &&
            touch.y < this.margin + this.height
          ) {
            mouseForce *= -this.hoverFactor;
          }
          const mx = point.x - touch.x;
          const my = point.y - touch.y;
          const md = Math.sqrt(mx * mx + my * my);
          const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
          point.vx += mf * ((mx / md) || 0);
          point.vy += mf * ((my / md) || 0);
        });

        // Aplicar viscosidad y actualizar posición
        point.vx *= layer.viscosity;
        point.vy *= layer.viscosity;
        point.x += point.vx;
        point.y += point.vy;
      });

      // Calcular puntos de control
      points.forEach((point, i) => {
        const prev = points[(i + points.length - 1) % points.length];
        const next = points[(i + points.length + 1) % points.length];
        
        const dPrev = Math.sqrt(Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2));
        const dNext = Math.sqrt(Math.pow(point.x - next.x, 2) + Math.pow(point.y - next.y, 2));

        const line = {
          x: next.x - prev.x,
          y: next.y - prev.y,
        };
        const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

        point.cPrev = {
          x: point.x - (line.x / dLine) * dPrev * this.tension,
          y: point.y - (line.y / dLine) * dPrev * this.tension,
        };
        point.cNext = {
          x: point.x + (line.x / dLine) * dNext * this.tension,
          y: point.y + (line.y / dLine) * dNext * this.tension,
        };
      });
    });
  }

  draw() {
    if (!this.svgElement) return;

    this.layers.forEach((layer, layerIndex) => {
      if (layerIndex === 1) {
        if (this.touches.length > 0) {
          // Limpiar gradientes anteriores
          while (this.svgDefs.firstChild) {
            this.svgDefs.removeChild(this.svgDefs.firstChild);
          }
          
          // Crear nuevos gradientes
          this.touches.forEach((touch, touchIndex) => {
            const gradient = document.createElementNS(this.xmlns, 'radialGradient');
            gradient.id = `liquid-gradient-${this.id}-${touchIndex}`;
            
            const start = document.createElementNS(this.xmlns, 'stop');
            start.setAttribute('stop-color', this.color3);
            start.setAttribute('offset', '0%');
            
            const stop = document.createElementNS(this.xmlns, 'stop');
            stop.setAttribute('stop-color', this.color2);
            stop.setAttribute('offset', '100%');
            
            gradient.appendChild(start);
            gradient.appendChild(stop);
            this.svgDefs.appendChild(gradient);
            
            gradient.setAttribute('cx', touch.x / this.svgWidth);
            gradient.setAttribute('cy', touch.y / this.svgHeight);
            gradient.setAttribute('r', touch.force);
            
            layer.path.style.fill = `url(#${gradient.id})`;
          });
        } else {
          layer.path.style.fill = this.color2;
        }
      } else {
        layer.path.style.fill = this.color1;
      }

      // Crear el path SVG
      const commands = [];
      commands.push('M', layer.points[0].x, layer.points[0].y);
      
      layer.points.forEach((point, i) => {
        const nextPoint = layer.points[(i + 1) % layer.points.length];
        commands.push(
          'C',
          point.cNext.x,
          point.cNext.y,
          nextPoint.cPrev.x,
          nextPoint.cPrev.y,
          nextPoint.x,
          nextPoint.y
        );
      });
      
      commands.push('Z');
      layer.path.setAttribute('d', commands.join(' '));
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(this.animate);
  }
  render() {
    return html`
    <section class="liquid-button-content">
        <a href="${this.ref}">
          <svg
              width="${this.svgWidth}"
              height="${this.svgHeight}"
              viewBox="0 0 ${this.svgWidth} ${this.svgHeight}"
              xmlns="${this.xmlns}"
          ><defs></defs>
          </svg>
          <span 
              class="span-text" 
              style="
              color: ${this.textColor}; 
              font-size: ${~~(this.height/2)}px;
              front-weight:${this.weight};
              left:${this.left};
              "
          >
              ${this.text}
          </span>
        </a>
      <section>
    `;
  }
}

customElements.define('liquid-button', LiquidButton);
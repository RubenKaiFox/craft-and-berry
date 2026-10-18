/* ==========================================================================
   FOXY COLLAGE SPLIT BUTTON CONTROLLER
   Manages hover hysteresis for split button component
   ========================================================================== */

class FoxyCollageSplitButton extends HTMLElement {
  constructor() {
    super();
    this.wrapper = this.querySelector('.foxy-collage__split-wrapper');
    this.timeout = null;
  }

  connectedCallback() {
    if (!this.wrapper) return;

    // Hover & focus event listeners
    this.wrapper.addEventListener('mouseenter', () => this.showSplit());
    this.wrapper.addEventListener('mouseleave', () => this.hideSplitWithDelay());
    this.wrapper.addEventListener('focusin', () => this.showSplit());
    this.wrapper.addEventListener('focusout', () => this.hideSplitWithDelay());

    // Mobile touch trigger
    const singleBtn = this.querySelector('.foxy-collage__split-single');
    if (singleBtn) {
      singleBtn.addEventListener('click', (e) => {
        if (!this.wrapper.classList.contains('is-split')) {
          e.preventDefault();
          this.showSplit();
        }
      });
    }
  }

  showSplit() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.wrapper.classList.add('is-split');
  }

  hideSplitWithDelay() {
    // Hysteresis buffer ensuring the split state remains active while navigating mouse to either button
    this.timeout = setTimeout(() => {
      this.wrapper.classList.remove('is-split');
    }, 400);
  }
}

if (!customElements.get('foxy-collage-split-button')) {
  customElements.define('foxy-collage-split-button', FoxyCollageSplitButton);
}

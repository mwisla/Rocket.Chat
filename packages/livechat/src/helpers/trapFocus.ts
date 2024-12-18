
function isVisible(el: HTMLElement): boolean {
    return !!(el && (el.offsetWidth || el.offsetHeight || (el.getClientRects && el.getClientRects().length)));
};

export function trapFocus(e: KeyboardEvent, elId: string, minFocuseItems: number = 2) {
    const el = document.getElementById(elId);
    if (!el) {
        return;
    }
    trapFocusRef(e, el, minFocuseItems);
};

export function trapFocusRef(e: KeyboardEvent, el: HTMLElement, minFocuseItems: number = 2) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9 || e.code === 'Tab';

    if (!isTabPressed) {
        return;
    }
    const focusableElements = 'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';
    const focusableContent = Array.prototype.slice.call(el.querySelectorAll(focusableElements));

    if (focusableContent.filter(e => isVisible(e as HTMLElement)).length < minFocuseItems) {
        return;
    }

    const firstFocusableElement = <HTMLElement>focusableContent[0];
    const lastFocusableElement = <HTMLElement>focusableContent[focusableContent.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
        }
    } else if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
    }
}

const focusableElements = 'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

function isVisible(el: HTMLElement): boolean {
    return !!(el && (el.offsetWidth || el.offsetHeight || (el.getClientRects && el.getClientRects().length)));
};

export function trapFocusById(e: KeyboardEvent, containerId: string, minFocuseItems: number = 2) {
    const el = document.getElementById(containerId);
    if (!el) {
        return;
    }
    trapFocus(e, el, minFocuseItems);
};

export function trapFocus(e: KeyboardEvent, container: HTMLElement, minFocuseItems: number = 2) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9 || e.code === 'Tab';

    if (!isTabPressed) {
        return;
    }
    const focusableContent = Array.prototype.slice.call(container.querySelectorAll(focusableElements));

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
};

export function setFocusOnFirst(el: HTMLElement, timeout: number = 50) {
    const doFocus = () => {
        const focusableContent = Array.prototype.slice.call(el.querySelectorAll(focusableElements));
        const firstFocusableElement = <HTMLElement>focusableContent[0];
        firstFocusableElement.focus();
    };
    if (el) {
        doFocus();
    }
    else {
        setTimeout(doFocus, timeout);
    }

}

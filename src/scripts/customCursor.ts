const defaultSize = 24;
let customCursorEl: HTMLImageElement;

const hideCursorStyleEl = document.createElement("style");
hideCursorStyleEl.innerHTML = "* { cursor: none }";

let hitX = 0;
let hitY = 0;

export function setCustomCursor(imgPath: string, hitpointX: number, hitpointY: number, size: number = defaultSize) {
    customCursorEl = document.createElement("img");
    customCursorEl.id = "custom-cursor";
    customCursorEl.style.position = "absolute";
    customCursorEl.style.zIndex = "99999";

    customCursorEl.height = size;
    customCursorEl.width = size;
    customCursorEl.src = imgPath;

    hitX = hitpointX * (size / defaultSize);
    hitY = hitpointY * (size / defaultSize);

    return customCursorEl;
}

const handleMouseMove = (e: MouseEvent) => {
    customCursorEl.style.top = `${e.y - hitY}px`;
    customCursorEl.style.left = `${e.x - hitX}px`;
}

export function enableCustomCursor() {
    document.body.appendChild(customCursorEl);
    document.body.appendChild(hideCursorStyleEl);

    document.addEventListener("mousemove", handleMouseMove);
}

export function disableCustomCursor() {
    customCursorEl.remove();
    hideCursorStyleEl.remove();
    document.body.style.cursor = "default";

    document.removeEventListener("mousemove", handleMouseMove);
}

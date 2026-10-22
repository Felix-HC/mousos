export function makeDraggable(win: HTMLElement) {

    win.addEventListener("mousedown", (e) => {
        if (e.altKey) {
            if (e.button == 0) {
                win.style.cursor = "grab";
                const onMove = (e: MouseEvent) => {
                    win.style.left = `${parseInt(window.getComputedStyle(win).left) + e.movementX}px`;
                    win.style.top = `${parseInt(window.getComputedStyle(win).top) + e.movementY}px`;
                }

                document.addEventListener("mousemove", onMove);

                document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", onMove);
                    win.style.cursor = "default";
                }, { once: true });
            }
        }
    });

    win.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const initWidth = parseInt(window.getComputedStyle(win).width);
        const initHeight = parseInt(window.getComputedStyle(win).height);

        const initX = parseInt(window.getComputedStyle(win).left);
        const initY = parseInt(window.getComputedStyle(win).top);

        let moving = false;
        let x = 0;
        let y = 0;
                    
        if (e.altKey) {
            // TODO: Resize cursors

            const onMove = (e: MouseEvent) => {
                if (!moving) {
                    x = e.x;
                    y = e.y;
                    moving = true;
                }

                if ((x - initX) < (initWidth / 2)) {
                    win.style.width = `${Math.max(parseInt(window.getComputedStyle(win).width) - e.movementX, 50)}px`;

                    if (parseInt(win.style.width) > 50) {
                        win.style.left = `${parseInt(window.getComputedStyle(win).left) + e.movementX}px`;
                    }
                } else {
                    win.style.width = `${Math.max(parseInt(window.getComputedStyle(win).width) + e.movementX, 50)}px`;
                }

                if ((y - initY) < (initHeight / 2)) {
                    win.style.height = `${Math.max(parseInt(window.getComputedStyle(win).height) - e.movementY, 50)}px`;

                    if (parseInt(win.style.height) > 50) {
                        win.style.top = `${parseInt(window.getComputedStyle(win).top) + e.movementY}px`;
                    }
                } else {
                    win.style.height = `${Math.max(parseInt(window.getComputedStyle(win).height) + e.movementY, 50)}px`;
                }
            }

            document.addEventListener("mousemove", onMove);

            document.addEventListener("mouseup", () => {
                moving = false;
                document.removeEventListener("mousemove", onMove);
            }, { once: true });
        }
    });
}

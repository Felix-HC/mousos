import { CatViewer } from "../programs/CatViewer/CatViewer";
import { Counter } from "../programs/Counter/Counter";
import { disableCustomCursor, enableCustomCursor, setCustomCursor } from "./customCursor";
import type { Program } from "./programs";

let maxPID = 0;

export const programs: any[] = [CatViewer, Counter];

export function run(name: string, top: number, left: number) {
    let program: Program | undefined;
    const pid = maxPID++;

    switch (name) {
        // Actions first!
        case "close":
            handleCloseAction();
            return;
        case "minimize":
            return;

        // Programs :3
        case "cat-viewer":
            program = new CatViewer(pid);
            break;
        case "counter":
            program = new Counter(pid);
            break;
    }

    if (program != undefined) {
        program.open(top, left);
    } else {
        console.error("Couldn't find a program with the name: " + name);
    }
}

function handleCloseAction() {
    const customCursor = setCustomCursor("/assets/icons/mallet.svg", 0, 15, 96);
    enableCustomCursor();

    let firstClick = true;
    const onClick = (e : MouseEvent) => {
        if (firstClick) {
            firstClick = false;
            return;
        }

        customCursor.style.rotate = "-45deg";

        const clickedEl = document.elementsFromPoint(e.x, e.y).find((e) => e.classList.contains("program"));

        if (clickedEl != undefined) {
            const target = clickedEl as HTMLElement;

            target.style.transition = "1s cubic-bezier(0.18, 0.66, 0.05, 1) top";
            target.style.top = "150%";

            setTimeout(() => {
                target.remove();

                if (target.classList.contains("cat-viewer")) {
                    console.log("you killed the cat... /silly")
                }
            }, 1000);
        }

        setTimeout(() => {
            disableCustomCursor();
        }, 250);
        document.removeEventListener("click", onClick);
    }

    document.addEventListener("click", onClick);
}

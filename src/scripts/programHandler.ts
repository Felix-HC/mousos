import { CatViewer } from "../programs/CatViewer/CatViewer";
import { Counter } from "../programs/Counter/Counter";
import type { Program } from "./programs";

let maxPID = 0;

export const programs: any[] = [CatViewer, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter, Counter];

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
    document.body.style.cursor = "url('/assets/icons/mallet.png'), auto";

    let firstClick = true;
    const onClick = (e : MouseEvent) => {
        if (firstClick) {
            firstClick = false;
            return;
        }

        let target: HTMLElement | undefined = undefined;

        if ((e.target as HTMLElement).classList.contains("program")) {
            target = (e.target as HTMLElement);
        } else {
            let parent = (e.target as HTMLElement)?.parentElement;
            while (parent != undefined) {
                if (parent.classList.contains("program")) {
                    target = parent;
                    break;
                } else if (parent.id == "desktop") {
                    break;
                } else {
                    parent = parent.parentElement;
                }
            }
        }

        if (target != undefined) {
            target.style.transition = "1s cubic-bezier(0.18, 0.66, 0.05, 1) top";
            target.style.top = "150%";

            setTimeout(() => {
                target.remove();

                if (target.classList.contains("cat-viewer")) {
                    console.log("you killed the cat... /silly")
            }
            }, 2000);
            
        }

        document.body.style.cursor = "default";
        document.removeEventListener("click", onClick);
    }

    document.addEventListener("click", onClick);
}

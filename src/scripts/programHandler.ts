import { CatViewer } from "../programs/CatViewer/CatViewer";
import { Counter } from "../programs/Counter/Counter";
import type { Program } from "./programs";

let maxPID = 0;

export function openProgram(name: string, top: number, left: number) {
    let program: Program | undefined;
    const pid = maxPID++;

    switch (name) {
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

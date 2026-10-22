import { makeDraggable } from "./windows";

export abstract class Program {
    pid: number;
    name: string;
    prettyName: string;
    html: HTMLElement;

    constructor(pid: number, name: string, prettyName: string, html: HTMLElement, draggable: boolean) {
        html.classList.add(name);
        html.classList.add("program");
        if (draggable) html.classList.add("draggable");

        this.pid = pid;
        this.name = name;
        this.prettyName = name;
        this.html = html;
    }

    open(top: number, left: number) {
        document.getElementById("programs")?.appendChild(this.html);
        this.html.style.top = `${top - (this.html.clientHeight / 2)}px`;
        this.html.style.left = `${left - (this.html.clientWidth / 2)}px`;
        makeDraggable(this.html);
        
        this.runScript();
    }

    close() {
        document.getElementById(`${this.pid}`)?.remove();
    }

    runScript() {

    }

    static buildElement(html: string, pid: number) {        
        const window = document.createElement("div");
        window.id = pid.toString();

        window.innerHTML = `${html}`;

        return window;
    }
}

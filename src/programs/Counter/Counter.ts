import { Program } from "../../scripts/programs";

export class Counter extends Program {
    static count = 0;

    constructor(pid: number) {
        Counter.count++;

        const html = /* html */`
            <button id="counter-button-${pid}">0</button>
        `;
    
        super(pid, "counter", "Counter!!", Program.buildElement(html, pid), true);
    }

    runScript() {
        const counterButton = document.getElementById("counter-button-" + this.pid) as HTMLButtonElement;
        counterButton.addEventListener("click", () => {
            counterButton.innerText = (parseInt(counterButton.innerText) + 1).toString();
        });
    }
}

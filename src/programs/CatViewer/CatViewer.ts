import { Program } from "../../scripts/programs";

export class CatViewer extends Program {
    static count = 0;
    static name = "cat-viewer";
    static prettyName = "Cat Viewer :3"
    static icon = "pets.svg";

    constructor(pid: number) {
        CatViewer.count++;

        const html = /* html */`
            <img id="catviewer-img-${pid}">
        `;
    
        super(pid, "cat-viewer", "Cat Viewer :3", Program.buildElement(html, pid), true);
    }

    runScript() {
        fetch("https://cataas.com/cat").then((cat) => {
            if (cat.status == 200) {
                cat.blob().then((catBlob) => {
                    const catObjectURL = URL.createObjectURL(catBlob);

                    const catElement = document.getElementById("catviewer-img-" + this.pid) as HTMLImageElement;
                    catElement.src = catObjectURL;
                });
            }
        });
    }
}

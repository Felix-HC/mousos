import { Program } from "../../scripts/programs";

export class CatViewer extends Program {
    static count = 0;

    constructor(pid: number) {
        CatViewer.count++;

        const html = /* html */`
            <img id="catviewer-img-${pid}" src="https://cataas.com/cat">
        `;
        
        const script = /* js */`
            
        `;

        super(pid, "cat-viewer", "Cat Viewer :3", Program.buildElement(html, script, pid), true);
    }
}

/*
** ResizeBug
**
** Displays the size of the parent element in a tooltip
** when the parent element is resized
**
** Usage:
** add to `<head>`:
**   `<script src="ResizeBug.ts" type="module" async></script>`
** 
** add to the container element(s) you want to monitor:
**   `<resize-bug></resize-bug>` 
***
** Note:
**   don't do this: `<resize-bug />` 
*/
class ResizeBug extends HTMLElement {
    connectedCallback() {
        this.style.position = "absolute"
        this.style.top = "1em"
        this.style.right = "1em"
        this.style.zIndex = "1000"
        this.style.backgroundColor = "goldenrod"
        this.style.padding = "0.5em"
        this.style.borderRadius = "1em"
        this.style.color = "black"
        this.style.fontSize = "1.25rem"
        this.style.fontWeight = "bold"

        let timeout: number | null = null
        let parentPosition: string | null = null

        const hideBug = () => {
            this.style.display = "none"
            if (parentPosition) {
                this.parentElement!.style.position = parentPosition
            }
        }

        const showBug = () => {
            if (timeout) {
                clearInterval(timeout)
            }
            timeout = setTimeout(hideBug, 1000)
            // save the parent element's position to restore it later
            parentPosition = this.parentElement!.style.position

            // this causes the tooltip to be displayed in the top right corner of the parent element
            this.parentElement!.style.position = "relative"
            this.style.display = "block"
        }

        const onResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                const theSize = entry.contentBoxSize[0]
                this.textContent = `${Math.round(theSize.inlineSize)}x${Math.round(theSize.blockSize)}`
                showBug()
            }
        }

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(this.parentElement!)
        console.log("resize bug ready");
    }
}
customElements.define("resize-bug", ResizeBug)

/*
** SimpleClock
**
** Displays local time in 24-hour hh:mm format
** updates every minute
**
** Usage:
** add to `<head>`:
**   `<script src="SimpleClock.ts" type="module" async></script>`
**
** add to the document:
**   `<simple-clock></simple-clock>`
**
** Note:
**   *don't* do this: `<simple-clock />` 
** 
**   You *can* do this: `<simple-clock>Local time: </simple-clock>`
**   and it will be displayed as "Local time: 05:27"
*/
class SimpleClock extends HTMLElement {
  private interval: number = 0;
  connectedCallback() {

    const timeNode = document.createTextNode("")
    const updateTime = () => {
      timeNode.textContent = new Date().toTimeString().slice(0, 5)
    }
    this.appendChild(timeNode)

    // figure out when the next minute starts
    let now = Date.now()
    let later = (Math.trunc(now / 60000) + 1) * 60000
    let wait = later - now

    // when the next minute starts, update the time and start the interval timer
    setTimeout(() => {
      updateTime() // once
      this.interval = setInterval(updateTime, 60000) // every minute
    }, wait)

    // set the time immediately
    updateTime() // once
  }

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = 0
    }
  }
}

customElements.define("simple-clock", SimpleClock);
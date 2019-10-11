setup = () => {
  console.log("Setting up.")
  iframe = frames[0]
  idoc = iframe.window.document
  $ = (d, x) => d.querySelector(x)
  $$ = (d, x) => [].slice.apply(d.querySelectorAll(x))
  each = (d, x, f) => $$(d, x).forEach(f)

  idler = null
  idle = () => {
    idler && clearTimeout(idler)
    idler = setTimeout(() => {
      console.log("Nobody did anything for a while...")
      if (!iframe.location.href.startsWith(url)) {
        iframe.location.href = url
      } else {
        iframe.location.reload()
        // idoc.scrollingElement.scrollTo({ top: 0, behavior: "smooth" })
        // each(idoc, "input", x => { x.value = null; x.blur() })
      }
      idle()
    }, 1000 * 60 * 3)
  }

  idle()

  idoc.onscroll = idle

  each(idoc, "input", x => {
    x.onfocus = () => {
      idle()
      input = x
      keyboard.classList.toggle("present", true)
      x.scrollIntoView({ behavior: "smooth" })
    }
    x.onblur = () => {
      idle()
      input = null
      keyboard.classList.toggle("present", false)
    }
  })

  each(document, "#keyboard button", x => {
    x.onmousedown = () => {
      idle()
      if (x == backspace) {
        if (input.selectionStart > 0) {
          input.setRangeText("", input.selectionStart - 1, input.selectionEnd, "end")
        }
      } else {
        input.setRangeText(x.innerText.toLowerCase(), input.selectionStart, input.selectionEnd, "end")
      }
      return false
    }
  })

  keyboard.onmousedown = () => { return false }

  // $(idoc, ".cookie-notification-block").style.display = "none";
  $(idoc, ".cookie-monster").style.display = "none";
  // $(idoc, ".form-wrapper").style.visibility = "initial";

  url = "https://merksmajas.lv"
  interval = setInterval(() => {
    each(idoc, "input", x => {
      x.autocomplete = "off"
      if (x.type == "email") {
        // Cannot use selection API with email types.
        x.type = "text"
      }
    })

    each(idoc, "a", x => {
      x.target = ""
      if (!x.href.startsWith(url)) {
        x.onclick = () => {
          return false
        }
      }
    })

    if (!iframe.location.href.startsWith(url)) {
      iframe.location.href = url
      clearInterval(interval)
    }
  }, 500)
}

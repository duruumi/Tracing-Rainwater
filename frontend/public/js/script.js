
$(function () {
  let lightSwitch = document.getElementById("lightSwitch");
  if (!lightSwitch) {
    return;
  }

  /**
   * @function darkmode
   * @summary: changes the theme to 'dark mode' and save settings to local stroage.
   * Basically, replaces/toggles every CSS class that has '-light' class with '-dark'
   */
  function darkMode() {
    document.querySelectorAll(".background-blur-light").forEach((element) => {
      element.className = element.className.replace(/-light/g, "-dark");
    });

    document.querySelectorAll(".search-input-light").forEach((element) => {
      element.className = element.className.replace(/-light/g, "-dark");
    });

    document.querySelectorAll(".card-light").forEach((element) => {
      element.className = element.className.replace(/-light/g, "-dark");
    });

    // set light switch input to true
    if (!lightSwitch.checked) {
      lightSwitch.checked = false;
    }
    localStorage.setItem("lightSwitch", "dark");
  }

  /**
   * @function lightmode
   * @summary: changes the theme to 'light mode' and save settings to local stroage.
   */
  function lightMode() {
    document.querySelectorAll(".background-blur-dark").forEach((element) => {
      element.className = element.className.replace(/-dark/g, "-light");
    });

    document.querySelectorAll(".search-input-dark").forEach((element) => {
      element.className = element.className.replace(/-dark/g, "-light");
    });

    document.querySelectorAll(".card-dark").forEach((element) => {
      element.className = element.className.replace(/-dark/g, "-light");
    });

    if (lightSwitch.checked) {
      lightSwitch.checked = true;
    }
    localStorage.setItem("lightSwitch", "light");
  }

  /**
   * @function onToggleMode
   * @summary: the event handler attached to the switch. calling @darkMode or @lightMode depending on the checked state.
   */
  function onToggleMode() {
    if (lightSwitch.checked) {
      darkMode();
    } else {
      lightMode();
    }
  }

  /**
   * @function getSystemDefaultTheme
   * @summary: get system default theme by media query
   */
  function getSystemDefaultTheme() {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      return "dark";
    }
    return "light";
  }

  function setup() {
    var settings = localStorage.getItem("lightSwitch");
    if (settings == null) {
      settings = getSystemDefaultTheme();
    }

    if (settings == "dark") {
      lightSwitch.checked = true;
    }

    if (settings == "dark") {
        $('#colormode-icon-light').addClass("hidden-icon");
    }

    if (settings == "light") {
        $('#colormode-icon-dark').addClass("hidden-icon");
    }

    lightSwitch.addEventListener("change", onToggleMode);
    onToggleMode();
  }

  setup();
});

$(document).ready(function () {

    $('input[type=checkbox]').click(function(){
       if ($('#lightSwitch').is(':checked')) {
        $('#colormode-icon-light').addClass("hidden-icon");
        $('#colormode-icon-dark').removeClass("hidden-icon");
    }
    else{
        $('#colormode-icon-dark').addClass("hidden-icon");
        $('#colormode-icon-light').removeClass("hidden-icon");
    }
    });
   
});

//yanni das bleibt HIER klar?
$(function () {
    let button = document.querySelector(".loader");
    button.addEventListener(
        "click",

        function () {
            alert("askdja");
            button.innerHTML = "";
            button.classList.add("rotate");

            setTimeout(function () {
                button.classList.remove("rotate");
                button.innerHTML = "Compile";
            }, 6000);
        },
        false
    );
});

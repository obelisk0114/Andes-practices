
(function () {
    const header = document.querySelector(".titleLabel");
    const structureButtons = document.querySelectorAll(".buttonClass2");

    for (let i = 0; i < structureButtons.length; i++) {
        structureButtons[i].addEventListener("click", (e) => {
            const newHeader = e.target.textContent;
            header.textContent = newHeader;

            e.target.disabled = true;

            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.disabled = false;
            }
            else {
                e.target.previousElementSibling.disabled = false;
            }
        });
    }

    const actionButtons = document.querySelectorAll(".buttonClass");

    // push
    actionButtons[0].addEventListener("click", (e) => {
        const getInput = document.querySelector(".inputClass");
        const getMain = document.querySelector(".main");

        const newElement = document.createElement("Div");
        const text = document.createTextNode(getInput.value);
        newElement.setAttribute("class", "element");
        newElement.appendChild(text);
        getMain?.appendChild(newElement);

        actionButtons[1].disabled = false;
    });

    // pop: based on stack or queue
    actionButtons[1].addEventListener("click", (e) => {
        const getMain = document.querySelector(".main");
        const allElements = document.querySelectorAll(".element");
        const currentStructure = header?.textContent;

        if (allElements.length === 1) {
            actionButtons[1].disabled = true;
        }

        if (currentStructure === "Queue") {
            const popTarget = allElements[0];
            getMain?.removeChild(popTarget);
        }
        else {
            const popTarget = allElements[allElements.length - 1];
            getMain?.removeChild(popTarget);
        }
    });
}());

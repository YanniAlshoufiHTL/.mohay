<template>
    <div id="codespace-wrapper">
        <div id="top-bar-wrapper">
            <div id="menu-wrapper">
                <div class="menu-element">File</div>
                <div class="menu-element">Edit</div>
                <div class="menu-element">Find</div>
                <div class="menu-element">Navigate</div>
                <div class="menu-element">Project</div>
                <div class="menu-element">Help</div>
            </div>
            <div id="profile-icon-wrapper">
                <div class="profile-icon"></div>
            </div>
        </div>
        <div id="main-wrapper">
            <div id="preview" class="draggable" draggable="true">Preview</div>
            <div id="code-area" class="draggable" draggable="true">
                <div contenteditable="true">code</div>
            </div>
            <div id="folder-viewer" class="draggable" draggable="true">
                folder
                <div id="red"></div>
            </div>
        </div>
    </div>
</template>

<script>
import p5 from "p5";
export default {
    name: "Codespace",
    methods: {
        executeCode(code) {
            eval(code);
        },
    },
    mounted() {
        const draggableItems = document.querySelectorAll(".draggable");
        let dragSource = null;
        let draggedItem = null;
        let dragSourceContent = "";
        let dragSourceClass = "";

        function dragStart(event) {
            dragSource = this;
            draggedItem = this.cloneNode(true);
            dragSourceContent = this.innerHTML;
            dragSourceClass = this.className;
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", "");
            this.classList.add("dragging");
        }

        function dragEnter(event) {
            event.preventDefault();
            this.classList.add("hovered");
        }

        function dragLeave() {
            this.classList.remove("hovered");
        }

        function dragOver(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        }

        function dragDrop(event) {
            event.stopPropagation();
            if (dragSource !== this) {
                swapElements(dragSource, this);
            }
            this.classList.remove("hovered");
        }

        function dragEnd() {
            draggableItems.forEach((item) => {
                item.classList.remove("dragging");
                item.classList.remove("hovered");
            });
        }

        function swapElements(source, target) {
            const sourceHTML = source.innerHTML;
            const sourceStyle = source.getAttribute("style");

            source.innerHTML = target.innerHTML;
            source.setAttribute("style", target.getAttribute("style"));

            target.innerHTML = sourceHTML;
            target.setAttribute("style", sourceStyle);

            draggedItem = null;
        }

        draggableItems.forEach((item) => {
            item.addEventListener("dragstart", dragStart);
            item.addEventListener("dragenter", dragEnter);
            item.addEventListener("dragleave", dragLeave);
            item.addEventListener("dragover", dragOver);
            item.addEventListener("drop", dragDrop);
            item.addEventListener("dragend", dragEnd);
        });
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";
@import "../styles/variables.scss";

$select-ui-color: #77769642;
$top-bar-height: 50px;
$top-bar-elements-width: 750px;

$bar-element-border-weight: 4px;

$main-wrapper-width: 95vw;
#main-wrapper {
    position: absolute;
    top: calc(calc(var(--nav-height) / 10) + 7vh);

    background-color: var(--bg-color);
    border: var(--codespace-box-border-color);
    border-width: 0.2rem;
    border-style: solid;

    width: 95vw;
    height: 74vh;
    border-radius: 0.5rem;

    display: grid;
    grid-template-columns: calc(50% - 0.5rem) calc(50% - 0.5rem);
    grid-template-rows: calc(70% - 0.5rem) calc(30% - 0.5rem);
    grid-gap: 0.5rem;
    .draggable {
        background-color: var(--codespace-box-bg-color);
        border: 0.2rem solid var(--codespace-box-border-color);
        box-sizing: border-box;

        border-radius: 0.5rem;

        transition: all 0.3s ease;

        &:hover {
            cursor: grab;
        }
    }

    .hovered {
        transform: translate(0, -10px); /* Example translation for animation */
        background-color: blue; /* Add the desired background color */
    }

    #preview {
        margin-top: 0.5rem;
        margin-left: 0.5rem;

        grid-column: 1;
        grid-row: 1;
    }

    #folder-viewer {
        margin-left: 0.5rem;

        grid-column: 1;
        grid-row: 2;
    }

    #red {
        //USED for testing switching childs of divs
        width: 100px;
        height: 100px;
        background-color: red;
        align-self: center;
    }
    #code-area {
        margin-top: 0.5rem;

        grid-column: 2;
        grid-row: 1 / span 2;
    }
}

#codespace-wrapper {
    position: relative;
    left: calc((100vw - $main-wrapper-width) / 2);

    width: $main-wrapper-width;
}

#top-bar-wrapper {
    position: relative;
    top: calc(var(--nav-height) / 10);

    display: flex;
    width: 100%;
    height: $top-bar-height;

    background-color: var(--bg-color);
    font-family: var(--primary-font);

    #menu-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: $top-bar-elements-width;
        box-sizing: border-box;

        font-size: 1.2rem;

        color: var(--codespace-menu-bar-fg-color);

        .menu-element {
            min-width: 110px;
            text-align: center;
            font-weight: bold;

            padding: 3px 12px;

            user-select: none;
            box-sizing: border-box;

            border: $bar-element-border-weight solid
                var(--codespace-menu-btn-border-color);
            border-radius: 13px;

            background-color: var(--codespace-menu-btn-bg-color);
            transition: background filter 0.1s;
            cursor: pointer;

            &:hover {
                background-color: var(--codespace-menu-btn-bg-hover-color);
            }

            &:active {
                filter: brightness(0.8);
            }
        }
    }

    #profile-icon-wrapper {
        width: calc(100% - $top-bar-elements-width);
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .profile-icon {
            box-sizing: border-box;
            background-color: var(--codespace-account-circle-bg-color);

            border-radius: 50%;
            border: $bar-element-border-weight solid
                var(--codespace-account-circle-border-color);
            height: calc($top-bar-height * 0.9);
            width: calc($top-bar-height * 0.9);
        }
    }
}

$frame-gap: 30px;
#main-editor-frame {
    position: fixed;
    bottom: calc((100vw - $main-wrapper-width) / 2);

    display: flex;
    gap: $frame-gap;

    height: calc(
        100vh - var(--nav-height) - $top-bar-height -
            (100vw - $main-wrapper-width) / 2 - calc(var(--nav-height) / 10) -
            (100vw - $main-wrapper-width) / 4
    );
    width: $main-wrapper-width;

    background-color: var(--bg-color);

    #non-editor-frame-section {
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: $frame-gap;

        > * {
            width: 100%;
            background-color: var(--nav-bg);
        }

        #frame-run-window {
            flex: 3;
        }

        #frame-explorer-window {
            flex: 2;
        }
    }

    #frame-editor-section {
        flex: 1;

        display: flex;

        #frame-editor {
            flex: 1;
            background-color: var(--nav-bg);

            font-family: monospace;
            font-size: 1rem;
            padding: 30px;
        }
    }
}
</style>

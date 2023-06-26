<template>
    <div id="codespace-wrapper">
        <!--<div id="top-bar-wrapper">
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
    -->
        <div id="main-wrapper">
            <div id="preview" class="draggable" draggable="true"></div>
            <div id="code-area" class="draggable" draggable="true">
                <div id="numbers"></div>
                <div id="code-area2" contenteditable="true" @input="updateCode">{{ code }} </div>
            </div>
            <div id="folder-viewer" class="draggable" draggable="true">
                <button class="button" @click="executeCode">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { analyzeAndGetNew } from "@/scripts/transpilationFlow";

import p5 from 'p5';

export default {
    name: "Codespace",
    methods: {
        async executeCode() {
            const code = this.getCodeLines();

            //const result = await analyzeAndGetNew(code);
            //console.log(result)
            //if (result.codeCorrect === true) {
            //console.log(result.code);
            //alert(result.code);

            const p5Code = `sketch.background('#f0f');const E = 10;sketch.fill('#000000');sketch.stroke('#000000');sketch.rect(E,E*20,10,E);`;
            this.executeP5Code(p5Code);

            /*} else {
                console.log(
                    `The code has an error in it at line ${result.line}!\nError message:\n\n${result.failureReason}`
                );
                alert(
                    `The code has an error in it at line ${result.line}!\nError message:\n\n${result.failureReason}`
                );
            }*/
        },

        executeP5Code(code) {
            const sketch = new p5((sketch) => {
                sketch.setup = () => {
                    let canvas = sketch.createCanvas(890, 475);
                    canvas.parent('preview');
                };

                sketch.draw = () => {
                    eval(code);
                };
            });

            return sketch;
        },
        updateCode(event = null) {
            console.log("update");

            const codeArea = document.getElementById('code-area2');
            const numbersDiv = document.getElementById('numbers');
            let lines = codeArea.children;

            numbersDiv.innerHTML = '';

            Array.from(lines).forEach((line, index) => {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = index + 1;
                numbersDiv.appendChild(numberDiv);
            });

            const lastDiv = document.createElement('div');
            lastDiv.textContent = lines.length + 1;
            numbersDiv.appendChild(lastDiv);
        },
        getCodeLines() {
            const codeArea = document.getElementById('code-area2');
            const lines = codeArea.children;
            let code = '';
            code += codeArea.textContent + '\n';

            for (let i = 0; i < lines.length; i++) {
                code += lines[i].textContent + '\n';
            }

            return code;
        },
    },
    mounted() {
        const draggableItems = document.querySelectorAll(".draggable");
        let dragSource = null;
        let draggedItem = null;
        let dragSourceContent = "";
        let dragSourceClass = "";


        this.updateCode();


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
        transform: translate(0, -10px);
        /* Example translation for animation */
        background-color: blue;
        /* Add the desired background color */
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


        .button {
            text-align: center;

            width: 6rem;
            height: 3rem;


            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 18px;
            text-transform: uppercase;
            background-color: #fff;
            color: #3498db;
            border: 2px solid #ccc;
            cursor: pointer;
        }
    }

    #code-area {
        margin-top: 0.5rem;

        grid-column: 2;
        grid-row: 1 / span 2;

        display: flex;


        #numbers {
            margin-top: 0.3rem;

            color: #D3D3D3;
            text-align: right;

            margin-left: 0.2rem;
            width: 2%;
            height: 99%;

            padding-right: 0.15rem;
            border-right: #D3D3D352 1px solid;
        }


        #code-area2 {
            margin-top: 0.3rem;

            outline: none;
            margin-left: 0.8rem;
            height: 100%;
            width: 98%;
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

                border: $bar-element-border-weight solid var(--codespace-menu-btn-border-color);
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
                border: $bar-element-border-weight solid var(--codespace-account-circle-border-color);
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

        height: calc(100vh - var(--nav-height) - $top-bar-height - (100vw - $main-wrapper-width) / 2 - calc(var(--nav-height) / 10) - (100vw - $main-wrapper-width) / 4);
        width: $main-wrapper-width;

        background-color: var(--bg-color);

        #non-editor-frame-section {
            flex: 1;

            display: flex;
            flex-direction: column;
            gap: $frame-gap;

            >* {
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
}
</style>

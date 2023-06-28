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

            const result = await analyzeAndGetNew(code);
            console.log(result)

            if (result.codeCorrect === true) {
                console.log(result.code);
                const p5Code = result.code.result;
                this.executeP5Code(p5Code);
                this.ErrorLine = -1;

            } else {
                this.ErrorLine = result.errorLine;
                console.log(
                    `The code has an error in it at line ${result.errorLine}!\nError message:\n\n${result.failureReason}`
                );
            }
            this.displayError();
        },

        executeP5Code(code) {
            let old = document.getElementsByClassName('p5Canvas');
            if (old[0] != null) {
                old[0].remove();
            }


            const sketch = new p5((sketch) => {
                sketch.setup = () => {
                    let canvas = sketch.createCanvas(890, 474);
                    canvas.parent('preview');
                };

                sketch.draw = () => {
                    sketch.background(255);
                    eval(code);
                };
            });

            return sketch;
        },
        displayError() {
            const codeArea = document.getElementById('code-area2');
            const lines = codeArea.children;

            let index = 1;

            console.log("Error line is " + this.ErrorLine);

            Array.from(lines).forEach((line) => {
                //if (index === this.ErrorLine) {
                //    line.style.background = getComputedStyle(document.documentElement).getPropertyValue('--codespace-error-color');
                //} else {
                //    line.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
                //}

                if (this.ErrorLine !== undefined && this.ErrorLine !== -1) {
                    if (index === this.ErrorLine) {
                        line.style.background = getComputedStyle(document.documentElement).getPropertyValue('--codespace-error-color');
                    } else {
                        line.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
                    }
                    index++;
                }

            });
        },
        updateCode(event = null) {

            const codeArea = document.getElementById('code-area2');
            const numbersDiv = document.getElementById('numbers');
            let lines = codeArea.children.length + 1;

            numbersDiv.innerHTML = '';

            for (let i = 0; i < lines; i++) {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = i + 1;
                numberDiv.style.fontFamily = 'JetBrainsMonoNLNerdFont';
                numbersDiv.appendChild(numberDiv);
            };

            const lastDiv = document.createElement('div');
            lastDiv.style.fontFamily = 'JetBrainsMonoNLNerdFont';
            lastDiv.textContent = lines + 1;
            numbersDiv.appendChild(lastDiv);

            //display Error and update style
            this.ErrorLine = 3;
            this.executeCode();
            this.displayError();
        },
        getCodeLines() {
            //const codeArea = document.getElementById('code-area2');
            //const lines = codeArea.children;
            //let code = "";
            //
            //for (let i = 0; i < lines.length; i++) {
            //    code += lines[i].textContent + '\n';
            //}
            //console.log(code);
            //return code;

            const divElement = document.getElementById("code-area2");

            function extractTextContent(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    return node.textContent.trim() + '\n';
                }

                if (node.nodeType === Node.ELEMENT_NODE) {
                    let textContent = '';
                    for (let childNode of node.childNodes) {
                        textContent += extractTextContent(childNode);
                    }
                    return textContent;
                }

                return '';
            }

            let extractedContents = extractTextContent(divElement).trim();
            return extractedContents;
        },
    },
    mounted() {
        const draggableItems = document.querySelectorAll(".draggable");
        let dragSource = null;
        let draggedItem = null;
        let dragSourceContent = "";
        let dragSourceClass = "";

        let ErrorLine = -1;

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
        font-family: JetBrainsMonoNLNerdFont;

        margin-top: 0.5rem;

        grid-column: 2;
        grid-row: 1 / span 2;

        display: flex;


        #numbers {
            margin-top: 0.3rem;

            color: var(--documentation-fg-color);
            text-align: right;

            margin-left: 0.2rem;
            width: 4%;
            height: 98%;

            padding-right: 0.15rem;
            border-right: #D3D3D352 1px solid;
        }

        overflow: auto;

        #code-area2 {
            font-family: JetBrainsMonoNLNerdFont;
            height: 95% !important;

            div {
                background-color: initial;
                background-color: var(--codespace-box-bg-color);
            }

            margin-top: 0.3rem;

            outline: none;
            margin-left: 0.8rem;
            height: 100%;
            width: 96%;
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

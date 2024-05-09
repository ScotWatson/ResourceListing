/*
(c) 2024 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadInterface = loadWindow.then(function () {
  return import("https://scotwatson.github.io/WebInterface/20240316/interface.mjs");
});

Promise.all( [ loadInterface ] ).then(start, fail);

function fail() {
  console.log("Fail");
}

const DOM_PARSER = new DOMParser();
function start([ Interface ]) {
  try {
    document.body.style.fontSize = "48pt";
    document.body.append("Click to Start");
    document.body.addEventListener("click", function () {
      (async function () {
        const file = await Interface.modalSingleFile({
          parameters: {},
        });
        const fileContents = await file.text();
        const fileDocument = DOM_PARSER.parseFromString(fileContents, "application/xml");
        if (fileDocument.documentElement.nodeName !== "resources") {
          throw "Invalid root element";
        }
        switch (fileDocument.documentElement.getAttribute("version") === "0") {
          case "0": {
            
          }
            break;
          default: {
            throw "Unrecognized file version";
          }
            break;
        }
        function version0() {
          const resources = [];
          for (const resourceNode of fileDocument.documentElement.children) {
            if (resourceNode.nodeName !== "resource") {
              throw "Invalid node";
            }
            const resource = {
              icon: resourceNode.getAttribute("icon"),
              url: resourceNode.getAttribute("url"),
              description: resourceNode.innerHTML,
            };
            resources.push(resource);
          }
        }
        function createEditor() {
          
        }
      })();
    });
  } catch (e) {
    console.error(e);
  }
}

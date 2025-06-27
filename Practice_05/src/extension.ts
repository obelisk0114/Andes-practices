// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "practice-05" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('practice-05.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Practice_05!');

		const extensionUri = context.extensionUri;

		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			"catCoding", // Identifies the type of the webview. Used internally
			"Stack or Queue", // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{ // Webview options.
				enableScripts: true
			}
		);

		// And set its HTML content
		panel.webview.html = getWebviewContent(panel, extensionUri);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(
	panel: vscode.WebviewPanel,
	extensionUri: vscode.Uri,
) {
	const styleMainUri = panel.webview.asWebviewUri(
		vscode.Uri.joinPath(extensionUri, "src", "static", "main.css")
	);

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Stack-Queue-Data-Structure</title>

	<link rel="stylesheet" type="text/css" href="${styleMainUri}">
</head>
<body>
	<div class="wrapper">
	    <h1 class="titleLabel">Queue</h1>

		<div class="main">
		    <div class="element">1</div>
			<div class="element">2</div>
			<div class="element">3</div>
		</div>

		<div class="buttonWrapper">
		    <input class="inputClass" type="text" name="push_value" />
		    <button class="buttonClass" value="push">push</button>
		    <button class="buttonClass" value="pop">pop</button>
		</div>

		<div class="buttonWrapper">
		    <button class="buttonClass2" value="stack">Stack</button>
		    <button class="buttonClass2" value="queue" disabled>Queue</button>
		</div>
	</div>

	<script>
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
			getMain.appendChild(newElement);

			actionButtons[1].disabled = false;
		});

		// pop: based on stack or queue
		actionButtons[1].addEventListener("click", (e) => {
			const getMain = document.querySelector(".main");
			const allElements = document.querySelectorAll(".element");
			const currentStructure = header.textContent;

			if (allElements.length === 1) {
			    actionButtons[1].disabled = true;
			}

		    if (currentStructure === "Queue") {
			    const popTarget = allElements[0];
				getMain.removeChild(popTarget);
			}
			else {
			    const popTarget = allElements[allElements.length - 1];
			    getMain.removeChild(popTarget);
			}
		});
	</script>
</body>
</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}

export function ApplyNowButton(editor){
    const { codeBlockManager } = Object.getPrototypeOf(editor).constructor
    codeBlockManager.setReplacer('apply_button',function(applyUrl){
        // Indentify multiple code blocks
        const wrapperId = `jobs${Math.random()
            .toString(36)
            .substr(2, 10)}`;

          // Avoid sanitizing iframe tag
          setTimeout(renderButton.bind(null, wrapperId, applyUrl), 0);

          return `<div id="${wrapperId}"></div>`;
    });
}

function renderButton(wrapperId, applyUrl) {
    const el = document.querySelector(`#${wrapperId}`);

    el.innerHTML = `<a href="${applyUrl}" target="_blank"><button class="tui-apply_button" >${"apply now"}</button></a>`;
}

const iframePlugin=(editor)=>{
    const { codeBlockManager } = Object.getPrototypeOf(editor).constructor
    codeBlockManager.setReplacer('frame',function(frameId){
        // Indentify multiple code blocks
        const wrapperId = `fr${Math.random()
            .toString(36)
            .substr(2, 10)}`;

          // Avoid sanitizing iframe tag
          setTimeout(renderIFrame.bind(null, wrapperId, frameId), 0);

          return `<div  id="${wrapperId}"></div>`;
    });
}
function renderIFrame(wrapperId, frameId) {
    const el = document.querySelector(`#${wrapperId}`);
    if(frameId.indexOf("codesandbox")===-1 && frameId.indexOf("codepen")===-1)
        el.innerHTML = "<p style='color:red;'>Permitted embed is codesandbox and codepen</p>";
    else 
        el.innerHTML = `<iframe width="100%" height="500" src="${frameId}"></iframe>`;
}

export default iframePlugin;
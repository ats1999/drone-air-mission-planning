import { EDEV,VDEV } from "@bdevg/ev";
import uploadImage from "@utils/uploadImage";
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

// syntax highlighting feature
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github-gist.css';   
// Import language files of highlight.js that you need
import javascript from 'highlight.js/lib/languages/javascript';
import clojure from 'highlight.js/lib/languages/clojure';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('clojure', clojure);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);

export function E(props){
    return <EDEV {...props} uploadImage={uploadImage} pluginsArray={[[codeSyntaxHightlight, { hljs }]]} />
}

export function V(props){
    return <VDEV {...props} pluginsArray={[[codeSyntaxHightlight, { hljs }]]} />
}


class Editor {
    
    constructor (elEditor) {

        $("#" + elEditor).text(`function echo(m) {\n\treturn m;\n}\nconsole.log(echo("Hello World"));`);
        
        this.elEditor = elEditor;
        this.fileName = "script.js";
        
        this.editor = "";        
        this.loadAceEditor();
        this.keyListener();
        
    }
    
    loadAceEditor(){
        
        this.editor = ace.edit(this.elEditor);
        this.editor.session.setMode("ace/mode/javascript");
        ace.require("ace/ext/language_tools");        
        this.editor.setTheme("ace/theme/dracula");
        
        this.editor.session.setTabSize(4);
        this.editor.session.setUseWrapMode(true);
        this.editor.setFontSize("18px");
        this.editor.setKeyboardHandler("ace/keyboard/vscode");        
       
               
        this.editor.setOptions({
            enableBasicAutocompletion: true
        });        
        
    }
    
    
    fileOpen(){
        
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            var file = e.target.files[0];

            var idxDot = file.name.lastIndexOf(".") + 1;
            var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

            if (extFile != "js") {
                alert("Cannot open this file because it is an unsupported file type.");
                return false;
            }
            

            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                                    
                this.editor.setValue(content, -1)
                this.fileName = file.name;

            }

        }

        input.click();        
        
    }
    
    
    fileSave(){
        
        let link = document.createElement('a');

        link.href = window.URL.createObjectURL(new Blob([this.editor.getValue()], {type: 'text/plain'}));
        link.download = this.fileName;
        link.click();
            
    }
    
    
    codeRun(){
        
        try {
            eval(this.editor.getValue());
        } catch (e) {
            console.error(e)            
        }        
        
    }
        
    
    keyListener(){
        
        
        var funcKeyObserver = (e) => {               
                                    
            if (e.key === "o"){
                e.preventDefault();
                this.fileOpen();
            
            }
            
            if (e.key === "s") {
                e.preventDefault();
                this.fileSave();
            }            
                    
        }  
                              
        
        window.addEventListener('keydown', (e) => {
            
            if(e.key === "Control"){ 
                                                
                window.addEventListener('keydown', funcKeyObserver);
                
            }
            
            if (e.key === "F9") {
            
                e.preventDefault();            
                this.codeRun();
            
            }
                                
        })        
        
        window.addEventListener('keyup', (e) => {
            
            if(e.key === "Control"){
                window.removeEventListener('keydown', funcKeyObserver);
            }
            
        })        
        
    }
    
}

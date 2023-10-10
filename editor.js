
class Editor {
    
    constructor (elEditor) {

        $("#" + elEditor).text(`
        
        


async function getPhoto() {

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        if (!stream.getVideoTracks().length) throw new Error("Nenhuma webcam encontrada");

        const capture = new ImageCapture(stream.getVideoTracks()[0]);

        const photoBlob = await capture.takePhoto({ imageWidth: 640 });

        var img = await createImageBitmap(photoBlob);

        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
        let x = (canvas.width - img.width * ratio) / 2;
        let y = (canvas.height - img.height * ratio) / 2;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);

        return canvas.toDataURL("image/jpg");
    } catch (err) {
        console.error(err);
        return "ERRO:" + err;
    }

};

var video;

const getPhoto2 = () => new Promise(
    (resolve, reject) => {

        if (!video) {
            video = document.createElement('video');
            video.style.display = false
            video.autoplay = true;
        }

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: 480,
                    height: 640,
                },
            })
            .then((stream) => {

                if (!stream.getVideoTracks().length) {
                    reject("Nenhuma webcam encontrada")
                }

                video.addEventListener('playing', () => {

                    var canvas = document.createElement("canvas");

                    var settings = stream.getTracks()[0].getSettings();
                    canvas.width = settings.width;
                    canvas.height = settings.height;


                    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

                    video.remove();
                    video = null;

                    resolve(canvas.toDataURL("image/png"))

                });

                video.srcObject = stream;
                video.play();

            })
            .catch((error) => {
                reject(error);
            });

    }
)

async function teste() {

    try {
        var foto = "";

        if (typeof ImageCapture === "function") {
            foto = await getPhoto();
        } else {
            foto = await getPhoto2();
        }

        console.log(foto)

    } catch (err) {
        console.error(err);
    }

};

teste()        
        
        
        
        `);
        
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

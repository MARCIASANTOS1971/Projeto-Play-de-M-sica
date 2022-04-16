window.player = {//encapsulamento do objeto

    cover: document.querySelector(".card-image"),
    title: document.querySelector(".card-content h5"),
    artist: document.querySelector(".artist"),
    audio: document.querySelector("audio"),
    
    data: {
        title: "Garota eu vou pra California",
        artist: "LuLu Santos",
        cover: "files/lulu-santos-foto.jpeg",
        file: "files/De Repente Califórnia.mp3"
    },
    
    start(){
        this.cover.style.background = `url('${this.data.cover}')no-repeat center center / cover`;
        this.title.innerText = this.data.title;
        this.artist.innerText = this.data.artist;
        this.audio.src = this.data.file;
    }
};




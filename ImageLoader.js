class ImageLoader {
    constructor() {
        this.lstPaths = [];
        this.callBack = null;
        this.loadedImageCount = 0;
        this.lstImageLoaded = [];
    }

    add(pImagePath) {
        this.lstPaths.push(pImagePath);
    }

    getTotalImages() {
        return this.lstPaths.length;
    }

    getTotalImagesLoaded() {
        return this.loadedImageCount;
    }

    getImageLoaded(pPath) {
        return this.lstImageLoaded[pPath];
    }

    start(pCallBack){
        this.callBack = pCallBack;
        this.lstPaths.forEach(path => {
            let img = new ImageBis();
            img.src = path;
            img.onload = this.imageLoaded.bind(this);
            this.lstImageLoaded[path] = img;
        })
    }

    imageLoaded(e) {
        this.loadedImageCount++;
        console.log("image chargé : " , e.target.currentSrc)
        if (this.getTotalImagesLoaded() == this.getTotalImages()) {
            this.callBack();
        }
    }

    getLoadingRation() {
        return this.getTotalImagesLoaded() / this.getTotalImages();
    }
}
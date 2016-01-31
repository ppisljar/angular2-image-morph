(function(app) {
    app.WarpImageComponent =
        ng.core.Component({
            selector: 'warp-image',
            templateUrl: 'app/views/warp-image.html',
            providers: [ProgressService],
            inputs: [
                'src', 'points', 'id'
            ],
            queries : {
                canvas : new ng.core.ViewChild('myCanvas')
            }
        })
        .Class({
            constructor: [ProgressService, function(progressService) {
                this.image = new Image();
                var self = this;
                this.image.onload = function() {
                    self.progressService.setImage(0, self.image.url);
                    self.setImage();
                };

                this.randomId = Math.round(Math.random()*100000);
                this.progressService = progressService.getInstance();
            }],
            ngOnChanges: function(changes) {
                if (changes.src) this.image.src = this.src;

                if (changes.points) {
                    var self = this;
                    setTimeout(function() {
                        for (var x = 0; x < self.points.length; x++) {
                            self.points[x] = new ImgWarper.Point(self.points[x].x, self.points[x].y);
                        }
                        self.warper.oriPoints = self.points;
                        self.warper.dstPoints = self.points;
                        self.warper.redraw();
                    }, 500);

                }
            },
            loadImage: function($event) {
                var fr = new FileReader();
                var self = this;
                fr.onload = function() {
                    self.image.src = fr.result
                };
                fr.readAsDataURL($event.target.files[0]);
            },
            setImage: function() {
                var ratio = this.canvas.nativeElement.width / this.image.width;      // set canvas size big enough for the image
                this.canvas.nativeElement.height = this.image.height*ratio;
                var ctx = this.canvas.nativeElement.getContext("2d");
                ctx.drawImage(this.image,0,0, this.image.naturalWidth, this.image.naturalHeight, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

                this.image.width = this.canvas.nativeElement.width;
                this.image.height = this.canvas.nativeElement.height;
                var imageData = ctx.getImageData(0, 0, this.image.width, this.image.height);
                //if (this.warper) delete this.warper;
                this.warper = new ImgWarper.PointDefiner(this.canvas.nativeElement, this.image, imageData);

                var self = this;
                this.canvas.nativeElement.onclick = function() {
                    self.progressService.setMatch(self.id);
                }
            },
            clearPoints: function() {
                this.warper.oriPoints = [];
                this.warper.dstPoints = [];
                this.warper.redraw();
            }
        });
})(window.app || (window.app = {}));

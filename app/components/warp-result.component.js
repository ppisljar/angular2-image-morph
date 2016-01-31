(function(app) {
    app.WarpResultComponent =
        ng.core.Component({
            selector: 'warp-result',
            templateUrl: 'app/views/warp-result.html',

            providers: [ProgressService],
            properties: ['warper1','warper2','imagestrip','gifel'],
            queries : {
                canvas : new ng.core.ViewChild('myCanvas')
            }
        })
        .Class({
            constructor: [ProgressService, function(progressService) {
                this.frames = 30;
                this.twoway = true;
                this.showresults = false;
                this.playing = false;
                this.loading = false;
                this.step = 0;
                this.steps_data = [];
                this.progressService = progressService.getInstance();
            }],
            ngOnChanges: function(changes) {

            },
            showSettings: function() {
                this.showresults = false;
            },
            stepBack: function() {
                if (this.step > 0) this.step--;
                this.draw();
            },
            stepForward: function() {
                if (this.step < this.animator.frames.length -1) this.step++;
                this.draw();
            },
            play: function() {
                this.playing = true;
                this.draw();
            },
            pause: function() {
                this.playing = false;
            },

            getFrameUrl: function() {
                return this.steps_data[this.step];
            },
            getGifUrl: function() {
                return this.steps_data[this.steps_data.length-1];
            },
            generate: function() {
                this.animator = new ImgWarper.Animator(this.warper1.warper, this.warper2.warper);
                this.animator.generate(this.frames);
                this.progressService.setStep(4);

                var ctx = this.canvas.nativeElement.getContext("2d");
                ctx.putImageData(this.animator.frames[this.frames/2], 0, 0);
                this.showresults = true;

                if (this.imagestrip) {
                    this.drawAll();
                }
            },
            drawAll: function() {
                this.loading = true;
                this.gifel.src = "img/loading.gif";
                this.steps_data = [];
                this.gif = new GIF({
                    workers: 2,
                    quality: 10,
                    width: 400,
                    height: 300
                });

                var ctx = this.canvas.nativeElement.getContext("2d");
                while (this.imagestrip.firstChild) {
                    this.imagestrip.removeChild(this.imagestrip.firstChild);
                }
                for (var x = 0; x < this.animator.frames.length; x++) {
                    ctx.putImageData(this.animator.frames[x],0,0);
                    var image = document.createElement("img");
                    image.src = this.canvas.nativeElement.toDataURL("image/png");
                    var a = document.createElement("a");
                    a.href = image.src;
                    a.download = "warp_frame_"+x+".jpg";
                    a.appendChild(image);
                    this.imagestrip.appendChild(a);

                    this.steps_data.push(image.src);
                    this.gif.addFrame(ctx, {copy: true, delay: 60});
                }

                if (this.twoway) {
                    for (var x = this.animator.frames.length-1; x >= 0; x--) {
                        ctx.putImageData(this.animator.frames[x],0,0);
                        this.gif.addFrame(ctx, {copy: true, delay: 60});
                    }
                }
                this.loading = false;

                var self = this;
                this.gif.on('finished', function(blob) {
                    self.gifel.src = URL.createObjectURL(blob);
                    self.steps_data.push(self.gifel.src);
                });

                this.gif.render();
            },
            draw: function() {
                var ctx = this.canvas.nativeElement.getContext("2d");
                ctx.putImageData(this.animator.frames[this.step],0,0);
                if (this.playing) {
                    if (typeof this.direction == "undefined") this.direction = true;
                    this.step = this.direction ? this.step + 1 : this.step - 1;
                    if (this.step == 0 || this.step == this.animator.frames.length - 1) this.direction = !this.direction;
                    var self = this;
                    window.requestAnimationFrame(function() { self.draw(); });
                }
            }

        });
})(window.app || (window.app = {}));

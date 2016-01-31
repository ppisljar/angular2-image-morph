(function(app) {

    app.AppComponent =
        ng.core.Component({
            selector: 'my-app',
            templateUrl: 'app/views/main.html',
            directives: [app.WarpImageComponent,app.WarpResultComponent],
            viewProviders: [ProgressService],
            providers: [ProgressService],
            queries : {
                warper1 : new ng.core.ViewChild('warper1'),
                warper2 : new ng.core.ViewChild('warper2'),
                imagestrip : new ng.core.ViewChild('imagestrip'),
                gif : new ng.core.ViewChild('gif'),
            }
        })
        .Class({
            constructor: [ProgressService, function(progressService) {

                this.menuDemo();


                this.progressService = progressService.getInstance();
                this.progressService.setStep(1);
                this.action_step = this.progressService.getStep();

            }],ngOnChanges: function() {
                console.log("ee");
            },
            menuStart: function() {
                // clear images and results
                this.menustate = "start";

                this.imagesrc1 = "img/load.jpg";
                this.imagesrc2 = "img/load.jpg";
                this.points = [];
                this.points = [];

                while (this.imagestrip.nativeElement.firstChild) {
                    this.imagestrip.nativeElement.removeChild(this.imagestrip.nativeElement.firstChild);
                }
                this.gif.nativeElement.src = "img/trans.png";
                console.log("start");
            },
            menuDemo: function() {
                // load demo images
                this.menustate = "demo";
                this.points1 = JSON.parse('[{"x":193,"y":216},{"x":226,"y":212},{"x":260,"y":219},{"x":306,"y":218},{"x":338,"y":208},{"x":370,"y":215},{"x":206,"y":229},{"x":226,"y":225},{"x":249,"y":230},{"x":314,"y":230},{"x":340,"y":224},{"x":361,"y":231},{"x":265,"y":313},{"x":297,"y":314},{"x":236,"y":360},{"x":282,"y":361},{"x":325,"y":360},{"x":251,"y":427},{"x":316,"y":428},{"x":165,"y":256},{"x":407,"y":253},{"x":199,"y":112},{"x":354,"y":103},{"x":188,"y":332},{"x":383,"y":328},{"x":211,"y":376},{"x":356,"y":383},{"x":124,"y":403},{"x":444,"y":405},{"x":178,"y":46},{"x":397,"y":49}]');
                this.points2 = JSON.parse('[{"x":191,"y":228},{"x":217,"y":217},{"x":268,"y":233},{"x":335,"y":231},{"x":383,"y":222},{"x":410,"y":229},{"x":214,"y":258},{"x":240,"y":253},{"x":262,"y":258},{"x":340,"y":260},{"x":363,"y":253},{"x":390,"y":257},{"x":285,"y":339},{"x":322,"y":337},{"x":256,"y":379},{"x":302,"y":381},{"x":348,"y":379},{"x":270,"y":453},{"x":324,"y":454},{"x":160,"y":273},{"x":440,"y":274},{"x":242,"y":122},{"x":345,"y":121},{"x":190,"y":375},{"x":413,"y":373},{"x":221,"y":411},{"x":385,"y":411},{"x":106,"y":531},{"x":497,"y":534},{"x":200,"y":69},{"x":415,"y":69}]');

                for (var x = 0; x < this.points1.length; x++) {
                    this.points1[x].x = this.points1[x].x*400/600;
                    this.points1[x].y = this.points1[x].y*400/600;
                }

                for (var x = 0; x < this.points2.length; x++) {
                    this.points2[x].x = this.points2[x].x*400/600;
                    this.points2[x].y = this.points2[x].y*400/600;
                }

                this.imagesrc1 = "img/face1.jpg";
                this.imagesrc2 = "img/face2.jpg";
            }

        })

})(window.app || (window.app = {}));

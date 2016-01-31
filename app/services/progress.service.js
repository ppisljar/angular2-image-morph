
    ProgressService = function () {

        this.step = 0;
        this.match = false;
        this.image1 = null;
        this.image2 = null;
        this.imgcnt = 0;
        this.points = 0;
    };

    ProgressService.prototype.setImage = function(i, img) {
        if (i == 1) this.image1 = img;
        else if (i==2) this.image2 = img;
        this.imgcnt++;
        this.match = 2;
        if (this.imgcnt == 2)
            this.step = 2;
    };

    ProgressService.prototype.getStep = function () {
        return this.step;
    };

    ProgressService.prototype.setStep = function (val) {
        this.step = val;
    };

    ProgressService.prototype.getMatch = function() {
        return this.match;
    };

    ProgressService.prototype.setMatch = function(val) {
        this.match = val;
        this.points++;
        if (this.points > 3 && this.match == 2 && this.step == 2) {
            this.step = 3;
        }
    };

    ProgressService.prototype.getInstance = function() {
        if (ProgressService.instance == null) {
            ProgressService.isCreating = true;
            ProgressService.instance = new ProgressService();
            ProgressService.isCreating = false;
        }

        return ProgressService.instance;
    }
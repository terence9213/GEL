
/* -------------------- [GEL.js] -------------------- */
/* ---   Graphics Engine Library for Javascript   --- */
/* -------------------------------------------------- */

var GEL = {
    Canvas: null,
    

    Init: function (preInit, callback) {

        this.CTX.Context = this.Canvas.getContext("2d");

        console.log(this);

        preInit();

        this.CTX.Init();

        callback();

    },




    Animation: {
        LastFrameTimeStamp: null,
        FPS: null,
        FPSDisplay: null,
        DilationFactor: 1,
        FrameCounter: 0,
        ElapsedTime: 0,

        //MASTER DRAW METHOD
        RenderFrame: function () {
            GEL.CTX.Clear();

            //Frame rate calculation
            var timeStamp = performance.now();
            var DELTA = GEL.Animation.LastFrameTimeStamp ? timeStamp - GEL.Animation.LastFrameTimeStamp : 0;
            GEL.Animation.ElapsedTime += GEL.Animation.DilationFactor * DELTA;
            GEL.Animation.FPS = Math.floor(1000/DELTA);
            if (++GEL.Animation.FrameCounter >= 20) {
                GEL.Animation.FPSDisplay = GEL.Animation.FPS;
                GEL.Animation.FrameCounter = 0;
            }
            GEL.Animation.LastFrameTimeStamp = timeStamp;

            //Debug overlay
            if (GEL.Animation.DebugOverlay.Active) {
                GEL.Animation.DebugOverlay.Draw(DELTA);
            }

            //console.log(this.Draw);
            requestAnimationFrame(GEL.Animation.RenderFrame);
        },


        //Debug stats (FPS/Delta/Dilation)
        DebugOverlay: {
            Active: true,
            Draw: function (DELTA) {
                GEL.CTX.Text.Write("FPS          : " + GEL.Animation.FPSDisplay, 0, 10);
                GEL.CTX.Text.Write("Delta        : " + DELTA, 0, 20);
                //GEL.CTX.Text.Write("Elapsed Time : " + Math.floor(GEL.Animation.ElapsedTime), 0, 30);
            }
        }
    },

    CTX: {
        Context: null,

        Init: function () {
            this.SizeManager.Resize();
        },

        SizeManager: {
            Width: 600,
            Height: 300,

            Resize: function () {
                GEL.Canvas.style.Width = this.Width;
                GEL.Canvas.style.Height = this.Height;
                GEL.Canvas.width = this.Width;
                GEL.Canvas.height = this.Height;

            }
        },


        Clear: function () {
            this.Context.clearRect(0, 0, this.SizeManager.Width, this.SizeManager.Height);
        },

        Shape: {
            Line: function () { },
            Circle: function () { }
        },

        Text: {
            FontSize: 12,
            FontType: "Courier",
            Align: "Right",
            Clr: "#000000",
            Pos: { X:0, Y:10 },
            Write: function (text, x, y) {
                this.MasterWrite(text, (x ? x : this.Pos.X), (y ? y : this.Pos.Y), this.Align, this.FontSize, this.Clr);
            },
            MasterWrite: function (text, x, y, align, size, clr) {
                GEL.CTX.Context.font = size + "px " + this.FontType;
                GEL.CTX.Context.textAlign = align;
                GEL.CTX.Context.fillStyle = clr;
                GEL.CTX.Context.fillText(text, x, y);
            }

        },


        Clr: {
            Black: "#000000",
            White: "#ffffff"
        }



    }

}
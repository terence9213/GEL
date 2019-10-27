
/* -------------------- [GEL.js] -------------------- */
/* ---   Graphics Engine Library for Javascript   --- */
/* -------------------------------------------------- */

// --- CONSTANT DECLARATION --- \\

//ENUMS
const CollisionBodyType = {
    NONE: 0,
    CIRCLE: 1,
    SQUARE: 2,
    RECTANGLE: 3
};


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

            //Frame rate calculation (DELTA: actual delta || delta: dilated delta)
            var timeStamp = performance.now();
            var DELTA = GEL.Animation.LastFrameTimeStamp ? timeStamp - GEL.Animation.LastFrameTimeStamp : 0;
            var delta = DELTA * GEL.Animation.DilationFactor;
            GEL.Animation.ElapsedTime += delta;
            GEL.Animation.FPS = Math.floor(1000 / DELTA);
            if (++GEL.Animation.FrameCounter >= 20) {
                GEL.Animation.FPSDisplay = GEL.Animation.FPS;
                GEL.Animation.FrameCounter = 0;
            }
            GEL.Animation.LastFrameTimeStamp = timeStamp;

            //Draw Scene (Btm Layer)
            GEL.SceneManager.DrawCurrentScene(DELTA, delta);

            //Debug overlay (Top Layer)
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
                GEL.CTX.Text.FontSize = 14;
                GEL.CTX.Text.Clr = "White";
                GEL.CTX.Text.Align = "start";
                GEL.CTX.Text.Write("FPS          : " + GEL.Animation.FPSDisplay, 0, 10);
                GEL.CTX.Text.Write("Delta        : " + DELTA, 0, 25);
                //GEL.CTX.Text.Write("Elapsed Time : " + Math.floor(GEL.Animation.ElapsedTime), 0, 30);
                GEL.CTX.Text.ResetConfig();
            }
        }
    },

    SceneManager: {
        CurrentScene: 0,
        SceneLibrary: [],

        //OBJ CLASS


        AddScene: function (scene) {
            scene.SceneIndex = this.SceneLibrary.length;
            this.SceneLibrary.push(scene);
        },

        AddScenes: function (sceneArray) {
            sceneArray.forEach(function (scene, index) {
                console.log("adding scene [" + index + "] ");
                GEL.SceneManager.AddScene(scene);
            });
        },

        DrawCurrentScene: function (DELTA, delta) {
            var scene = this.SceneLibrary[this.CurrentScene];

            scene.Draw(DELTA, delta);
        }

    },

    //OBJECT CLASSES\\
    Class: {
        Scene: function (draw) {
            this.SceneElapsedTime = 0;
            this.Draw = function (DELTA, delta) {
                this.SceneElapsedTime += delta;
                draw(DELTA, delta);
            };

        },

        Graphic: function () {
            this.Render = function () { }
        },

        Actor: function () {
            this.Position = { x: 0, y: 0 };
            this.Graphics = [];
            this.Render = function () {
                this.Graphics.forEach(function (graphic, index) {
                    graphic.Render();
                });
            };

            this.HasPhysics = false;
            this.CanCollide = false;
            this.CollisionBody = null;
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

        //DRAW BASIC SHAPES
        Shape: {
            Line: function (ox, oy, tx, ty, w, clr, alpha) {
                GEL.CTX.Context.globalAlpha = alpha ? alpha : 1;
                GEL.CTX.Context.beginPath();

                GEL.CTX.Context.lineWidth = w;
                GEL.CTX.Context.strokeStyle = clr;
                GEL.CTX.Context.moveTo(ox, oy);
                GEL.CTX.Context.lineTo(tx, ty);
                GEL.CTX.Context.stroke();

                GEL.CTX.Context.closePath();
                GEL.CTX.Context.globalAlpha = 1;
            },
            Circle: function (x, y, r, clr, alpha, fill, width) {
                GEL.CTX.Context.globalAlpha = alpha ? alpha : 1;
                GEL.CTX.Context.beginPath();
                GEL.CTX.Context.arc(x, y, r, 0, Math.PI * 2, false);
                if (fill) {
                    GEL.CTX.Context.fillStyle = clr;
                    GEL.CTX.Context.fill()
                }
                else {
                    GEL.CTX.Context.strokeStyle = clr;
                    GEL.CTX.Context.lineWidth = width;
                    GEL.CTX.Context.stroke();
                }
                GEL.CTX.Context.closePath();
                GEL.CTX.Context.globalAlpha = 1;
            }
        },

        Text: {
            FontSize: 12,
            FontType: "Courier",
            Align: "start",
            Clr: "#ffffff",
            Pos: { X: 0, Y: 0 },
            DefaultSettings: {
                FontSize: 12,
                FontType: "Courier",
                Align: "Right",
                Clr: "#ffffff"
            },
            ResetConfig: function () {
                this.FontSize = this.DefaultSettings.FontSize;
                this.FontType = this.DefaultSettings.FontType;
                this.Align = this.DefaultSettings.Align;
                this.Clr = this.DefaultSettings.Clr;
            },
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
            White: "#ffffff",
            Blue: "#0000FF",
            Green: "#008000"
        }

    },




    Physics: {
        Init: function () {
            
        },

        MasterUpdate: function () {

        },

        Constants: {},

        ObjectArray: [],

        CollisionBody: function () {
            this.Type = CollisionBodyType.NONE;
            this.Coordinates = [];
        }


    },

    Utils: {
        Random: {
            RandInt: function (max) {
                return Math.floor(Math.random() * Math.floor(max));
            },

            RandVector: function () {

            }

        }
    }

}
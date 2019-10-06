// JavaScript source code


window.onload = function () {

    GEL.Canvas = document.getElementById("canvas");

    GEL.Init(
        //Pre Init
        function () {
            //Set Custom colour pallet
            GEL.CTX.Clr.Red = "#ff0000";
            //Set default settings for text
            GEL.CTX.Text.DefaultSettings.FontSize = 20;
            GEL.CTX.Text.DefaultSettings.Clr = GEL.CTX.Clr.Red;
            GEL.CTX.Text.DefaultSettings.Align = "center";
            GEL.CTX.Text.ResetConfig();

            var sceneArray = InitialisaScenes();
            GEL.SceneManager.AddScenes(sceneArray);

        },

        //Callback
        function () {
            console.log("GEL init done");

            //Begin animation cycle on loading scene
            GEL.SceneManager.CurrentScene = 0;
            GEL.Animation.RenderFrame();

            //Load External Resources

        }
    );



};



// ----- Initialise Scenes ----- \\
InitialisaScenes = function () {
    var sceneArray = [];
    //Loading Scene
    var scene0 = new GEL.Class.Scene(function (DELTA, delta) {
        GEL.CTX.Text.Write("LOADING", 300, 150);
    });
    //Main Menu
    var scene1 = new GEL.Class.Scene(function (DELTA, delta) {
        GEL.CTX.Shape.Circle(300, 150, 20, GEL.CTX.Clr.White, 1, true, 0);
        GEL.CTX.Shape.Circle(300, 150, 40, GEL.CTX.Clr.Blue, 1, false, 10);
        GEL.CTX.Shape.Circle(300, 150, 60, GEL.CTX.Clr.Green, 1, false, 10);
        GEL.CTX.Shape.Circle(300, 150, 80, GEL.CTX.Clr.Red, 1, false, 10);
        GEL.CTX.Shape.Circle(300, 150, 100, GEL.CTX.Clr.Blue, 1, false, 10);
        GEL.CTX.Shape.Circle(300, 150, 120, GEL.CTX.Clr.Green, 1, false, 10);
        GEL.CTX.Shape.Circle(300, 150, 140, GEL.CTX.Clr.Red, 1, false, 10);
        GEL.CTX.Text.Write("Main Menu", 300, 150);
        GEL.CTX.Shape.Line(150, 160, 450, 160, 5, GEL.CTX.Clr.White, 1);
        GEL.CTX.Shape.Line(160, 180, 440, 180, 5, GEL.CTX.Clr.Green, 1);
        GEL.CTX.Shape.Line(170, 200, 420, 200, 5, GEL.CTX.Clr.Blue, 1);
    });

    sceneArray.push(scene0);
    sceneArray.push(scene1);

    return sceneArray;
};

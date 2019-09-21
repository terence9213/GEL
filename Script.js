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

            // ----- Initialise Scenes ----- \\
            //Loading Scene
            var scene0 = new GEL.SceneManager.Scene(function (DELTA, delta) {
                GEL.CTX.Text.Write("LOADING", 300, 150);
            });
            //Main Menu

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

    

}

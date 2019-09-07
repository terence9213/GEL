// JavaScript source code


window.onload = function () {

    GEL.Canvas = document.getElementById("canvas");

    GEL.Init(
        //Pre Init
        function () {
            //Set Custom colour pallet
            GEL.CTX.Clr.Red = "#ff0000";


        },

        //Callback
        function () {
            console.log("Callback called");

            //Begin animation
            GEL.Animation.RenderFrame();

        }
    );

    

}

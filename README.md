# GEL
Graphics Engine Library (Javascript)

GEL is a minimalistic Javascript library for creating powerful graphics using the HTML canvas
You can also call it GAME Engine Library if you want

#Development Notes:
- To avoid confusion regrading the spelling of the word "COLOUR", "CLR" will be used instead.

#Frame Rate / Delta Calculation
- GEL uses performance.now() to get accurate timestamps at the beginning of every render cycle
- DELTA (all caps) denotes actual delta 
  between the timestamp at the beginning of the previous frame and the timestamp at the beginning of the current frame
- delta denotes delta modified by dilation factor 


#Initialisation
- GEL.Init() takes in 2 function parameters: preInit() and callback()
- preInit()  : Used for initialising custom configuration 
               Initialise loading scene animation here
- callback() : Called once GEL is initialised 
               Begin loding external resources (images/sounds) here
               Begin constructing scenes 
- 

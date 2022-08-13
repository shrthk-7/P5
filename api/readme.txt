js is async i.e several functions run at the same time
in p5, preload() always runs first then setup and draw
    >>json, images, audio etc should be loaded in preload() to avoid errors
    >>preload is the sync way of loading data, but doesnt work on changing data

in p5, use loadJSON to callback when data is received 

closure i.e function defined within a fn can be used to setup multiple setInterval fns

when arguments are passed to a function theyre stored in 'arguments' array, which can used to access the arguments even if parameters are not declared in the fn definition

instanceof can be used to check data type of passed arg

to get color info about individual pixels, first loadpixels() then the rgba info can be accessed by 
pixel[(i + j*width)*4 + x]
    >>x = 0 for r, 1 for g, 2 for b and 3 for a
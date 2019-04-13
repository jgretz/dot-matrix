# dot-matrix

## Backstory

A while ago I came across a toy that fascinated me - the [Kano Pixel](https://kano.me/store/us/products/pixel-kit). Although it may appear to just be a simple kid's toy, it actually has a lot of fun applications for coders. These are made possible by the fact that Kano has kindly exposed a JS SDK.

I started out hacking through directly connecting to the Kano Pixel directly through the USB connection. Once I got that working I quickly realized that I had started down quite the rabbit trail. This is project is currently my side hack that I return to mainly at conferences when I get an urge to code. Below I'll lay out the pieces of the app as they appear in my head ... realize that that there might not be much more to them than that picture depending on when you check :)

### Kano

This is the interface to the Kano Pixel device.

### Command

This is a site which displays the status of the overall system and allows the user to control what is displayed.

### Conductor

This is the backend controller of the entire system. It's a node app that maintains the list of devices (real or virtual) that are registered and passes along the commands.

### Emulator

This is a virtual "pixel" that I wrote to allow me to continue hack on this when I am not in a location that allows me to connect the physical device. Also it's a lot cheaper to create N virtual devices than it is buying an array of Kano Pixels :)

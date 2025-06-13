# About my plugins

This is a short tutorial on the general structure of my plugins.

My plugins are generally embedded,  with very minimal information in the `embed` box,  or `small` box in mobile.   

The `embed` box is in the lower right of the screen in the desktop rendition and the `small` box is right at the bottom in mobile devices.

I provide a button to open an information window,  which is larger,  and contains information and settings and so on.   This info window can be resized,  by dragging the top left and bottom right corners.   

Closing the `embed box` or `small box`,  closes the plugin completely,  and removes all listeners and map elements.   Closing the info window,  just hides it.

You can open a number of embedded plugins,  though it is advisable not to open more than 2 or 3,  else the screen becomes cluttered.   

I also made a custom-picker.  This looks nearly identical to the desktop picker.  It has a slightly squarer buttons,  to differentiate it from the internal windy picker.  With the custom picker,  info and buttons can be added to the picker.  

In the past I attached stuff directly to the internal windy picker,  but Ivo asked that I <b>NOT</b> do that,  and rather make a clone of the picker,  so that when the DOM is changed,  it does not break this picker.  

More on the custom picker here:   [https://github.com/rittels-windy-plugins/custom-windy-picker](https://github.com/rittels-windy-plugins/custom-windy-picker) .
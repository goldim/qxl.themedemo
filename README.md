# qxl.themedemo
Theme Demo Browser is a extended version of Widgetbrowser.
This application has next subapplications:
 - Calculator
 - Color Picker
 - Web Browser
 - Audio and Video players
 - Table Demo

# Decorator Demo reserved names
There is a common appearance of some widgets in the application but you may redefine them via decorators:
 - theme-demo-title-separator
 - input

# Icons
There are default Oxygen icons for buttons but you also may redefine them too.

# Theme information
There is a theme description which could be shown in About window. The window will be opened on application start.
Create html page and put it into resource folder. Pass the link in constructor of Application class via options.about_url argument.

## TODO

 - Fix `showDialog` method of table window
 - Fix WebBrowser buttons (they don't work)
 - Make optional icons and use default case if there is no icon
 - Make special decorator names
 - Make default case if decorator doesn't exist in child class
 - Stop media players after closing windows
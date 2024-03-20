# ThemeDemo
Theme Demo Browser is a extended version of Widgetbrowser. Initially it was developed by Norbert Schröder.
This application has next subapplications:
 - Calculator
 - Color Picker
 - Web Browser
 - Audio and Video players
 - Table Demo

# Custom Decorators
There is a common appearance of some widgets in the application but you may redefine them via decorators:
 - theme-demo-title-separator
 - theme-demo-input

# Custom Icons
By default there are used a set of Oxygen icons. You can replace them all or some of them.
To do it you have to override `_getCustomIcons` method of `Application` class.
The method has to return object of Class with has method `getIcons(name)` which returns a icon URL by name.

# Theme information
There is a theme description which could be shown in About window. The window will be opened on application start.
Create html page and put it into resource folder. Pass the link in constructor of `Application` class via options.about_url argument.

## TODO

 - Fix WebBrowser buttons (they don't work)
 - Stop media players after closing windows
 - Add a game (Minesweeper for example)
 - Change audio list source
 - Move media player to separate package and include as dependency
 - Fix audio player knob (broken for some themes)
 - Refactor toolbar buttons: exclude not required arguments
#### storybook-photoshop-jsx notes
Notes and relevant, helpful links.

#### repo
- https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast

#### tutorial
- https://www.youtube.com/watch?v=LxxqxEVYfVc
- 

#### json2.js
- https://github.com/douglascrockford/JSON-js/blob/master/json2.js

#### ScriptingListenerplugin
- https://helpx.adobe.com/photoshop/kb/downloadable-plugins-and-content.html#ScriptingListenerplugin

#### estk
- https://forums.adobe.com/thread/1924640
- https://vibhug.wordpress.com/2014/10/15/hello-world-via-photoshop-script/

#### adobe extendscript sdk docs
- http://estk.aenhancers.com/4%20-%20User-Interface%20Tools/code-examples-for-scriptui.html#

#### reference
- https://www.youtube.com/watch?v=iQQsZ7aLg40
- https://graphicdesign.stackexchange.com/questions/22325/how-to-convert-paths-into-shape-in-photoshop-cs6
- https://www.codepunker.com/blog/how-to-save-your-PSD-paths-or-shapes-as-SVG-files
- https://avocode.com/tutorials/photoshop/exporting-images-from-psd/svg
- http://cssdk.s3-website-us-east-1.amazonaws.com/sdk/1.0/docs/WebHelp/app_notes/ps_selections.htm
- http://cssdk.s3-website-us-east-1.amazonaws.com/sdk/1.0/docs/WebHelp/app_notes/ps_scripting.htm
- https://stackoverflow.com/questions/8544382/function-to-show-hide-layer-with-photoshop-script-jsx
- https://stackoverflow.com/questions/10701445/is-there-an-equivalent-of-settimeout-in-adobes-extendscript

#### svg
- http://www.tonton-pixel.com/scripts/utility-scripts/convert-custom-shapes-file-to-svg-set/
- https://graphicdesign.stackexchange.com/questions/85518/photoshop-to-svg-path
- https://graphicdesign.stackexchange.com/questions/73629/create-2-morphable-svgs/73636#73636

### paths to shapes
- https://superuser.com/questions/612425/javascript-to-automate-paths-to-layers-in-photoshop

#### bounding box
- https://stackoverflow.com/questions/43492853/adobe-photoshop-scripting-how-to-select-bounding-box-around-current-selection

#### photoshop custom UI
- https://medium.com/adobetech/how-to-create-your-first-adobe-panel-in-6-easy-steps-f8bd4ed5778
- https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-folders
- https://github.com/tahoedesigner/ExtendScript/blob/master/Hello%20World.jsx
- https://www.creativebloq.com/photoshop/scripts-4132441
- https://stackoverflow.com/questions/38701446/photoshop-scriptui-show-a-dialog-window-close-it-show-it-again-gives-an-empty
- https://graphicdesign.stackexchange.com/questions/117082/scriptui-photoshop-palettes

#### adobe bezier data model
- https://illustrator-scripting-guide.readthedocs.io/scriptingApplescript/creatingPathsShapes/
- http://jongware.mit.edu/pscs5js_html/psjscs5/pc_PathPointInfo.html

```
A point on a path, expressed as an array of three coordinate arrays: the anchor point, left direction point, and right direction point. For paths that are straight segments (not curved), the coordinates of all three points are the same. For curved segements, the coordinates are different. The difference between the anchor point and the left or right direction points determines the arc of the curve. You use the left direction point to bend the curve "outward" or make it convex; you use the right direction point to bend the curve "inward" or make it concave.
```
- https://www.adobe.com/content/dam/acom/en/devnet/illustrator/pdf/IllustratorCS3_Scripting_Guide.pdf
- https://helpx.adobe.com/photoshop/using/editing-paths.html
- https://www.elated.com/articles/photoshop-paths-explained/


#### storybook export sequence
- open file
- get FILENAME
- select all
- crop
- create JSON_DATA
- make an array of BG_ layers (should only be 1)
- make an array of FG_ layers
- make an array of OBJ_ layers
- make an array of GUIDE_ layers
- hide all GUIDE_ layers
- hide all FG_ layers
- hide all OBJ_ layers
- show all BG_ layers
- resize file to 1024x768
- save as jpeg with name FILENAME + "-" + LAYER_NAME + ".jpg"
- hide all BG_ layers
- for each OBJ_ layer
  - show OBJ_ layer
  - select all
  - get tight selection
  - get bounding box -> JSON_DATA
  - create work path
  - convert work path to new path shape
  - export path shape (svg) to FILENAME + "-" + LAYER_NAME + ".svg"
  - add svg path to JSON_DATA
  - add bezier path data to JSON_DATA
  - delete path shape
  - delete work path
- save JSON_DATA to FILENAME + ".json"

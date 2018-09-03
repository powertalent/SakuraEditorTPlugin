//-------------------------------------------------------------------------------
// oracle_comment_align.js
//-------------------------------------------------------------------------------
//
// Copyright(c) 2018 powertalent All rights reserved.
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
//-------------------------------------------------------------------------------

(function(){

	Editor.SetDrawSwitch(0);	

	var text = Editor.GetSelectedString(0);
	// If not selected 
	if (Editor.IsTextSelected() == 0){
		Editor.SelectAll;
		text = Editor.GetSelectedString(0);
	}

	var isBoxSelected = 2 == Editor.IsTextSelected();
	var tabWidth = Editor.ChangeTabWidth(0);

	var lineContents = text.split(/[\r\n]+/);
	var lineFeeds    = text.split(/[^\r\n]+/);

	var cells, cellWidth = [], cellSpace = [];

	for (var i = 0, lineContent; lineContent = lineContents[i]; ++i ) {
		cells = lineContent.split(/\s(?=\/\*)/);
		for (var j = 0, cell; cell = cells[j]; ++j) {
			cellWidth[j] = Math.max(cellWidth[j] || 0, cell.length);
		}
  	}
  
	for (var i = 0, lineContent; lineContent = lineContents[i]; ++i) {
		// If line only contains Comment -> next line
		if (lineContent.match(/^\s+\/\*/)){
			lineContents[i] = lineContent;
			continue;
		}
		cells = lineContent.split(/\s(?=\/\*)/);
		tmp = '';
		for (var j = 0, cell; cell = cells[j]; ++j) {
		    if (cells.length > 1 && j === 0 ){
		      tmp += cell + new Array(cellWidth[j]-cells[j].length+2).join(' ');
		    } else {
		      tmp += cell;
		    }			
		}
		lineContents[i] = tmp;
	}

	if (!isBoxSelected) {
		text = '';
		for(var i = 0, num = Math.max(lineContents.length, lineFeeds.length); i < num; ++i) {
			text += (undefined == lineContents[i] ? '' : lineContents[i])
			      + (undefined == lineFeeds[i]    ? '' : lineFeeds[i]);
		}
	}

	Editor.AddRefUndoBuffer();
	if (!isBoxSelected) {
		Editor.InsText(text);
	}
	else {
		Editor.Delete();
		for(var i = 0, num = Math.max(lineContents.length, lineFeeds.length); i < num; ++i) {
			Editor.InsText((undefined == lineContents[i] ? '' : lineContents[i]));
			Editor.Down();
		}
	}
	Editor.CommitUndoBuffer();

	Editor.SetDrawSwitch(1);
	Editor.ReDraw();

})();

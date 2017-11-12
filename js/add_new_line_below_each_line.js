/*  Author : PowerTalent
    Description : Add Blank Line Below Each Line
*/
Editor.ReplaceAll('(\\r\\n|\\n)', '$1$1', 172);	// Replace All
Editor.ReDraw(0);	// Redraw

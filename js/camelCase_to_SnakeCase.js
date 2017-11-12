/*  Author : PowerTalent
    Description : Convert camelCase to SNAKE_CASE
*/
(function(){
    Editor.SetDrawSwitch(0);
    
    // Get selected Text in Editor
    var selectedText = Editor.GetSelectedString(0);

    // Add underscore char to before Uppercase char
    // Ex : camelCaseTest => camel_Case_Test
    selectedText = selectedText.replace(/[A-Z][a-z]*/g, function(v){ return '_'+v;})
                               .replace(/^_+/g,'');
    // Convert selected Text to UPPER CASE
    // Ex : camel_Case_Test => 
    selectedText = selectedText.toUpperCase();

    // Insert formated text to Editor
    Editor.InsText(selectedText);

    Editor.SetDrawSwitch(1);
    Editor.ReDraw();

})();

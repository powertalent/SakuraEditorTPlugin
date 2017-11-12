/*  Author : PowerTalent
    Description : Convert SNAKE_CASE to camelCase
*/

(function(){
    Editor.SetDrawSwitch(0);
    // Get selected Text in Editor
    var selectedText = Editor.GetSelectedString(0);
    // Convert selectedText to lowerCase
    // Ex : SNAKE_CASE_TEST => snake_case_test
    selectedText = selectedText.toLowerCase();  
    // Remove underscore and UpperCase letter after underscore
    // Ex : snake_case_text => snakeCaseTest
    selectedText = selectedText.replace(/_\w/g, function(m){
                                    return m.charAt(1).toUpperCase();
                                    });
    // Insert formated text to Editor
    Editor.InsText(selectedText);
    Editor.SetDrawSwitch(1);
    Editor.ReDraw();
})();

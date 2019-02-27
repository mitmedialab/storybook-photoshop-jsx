function copyTextToClipboard( txt )
{
    const keyTextData         = app.charIDToTypeID('TxtD');
    const ktextToClipboardStr = app.stringIDToTypeID( "textToClipboard" );

    var textStrDesc = new ActionDescriptor();

    textStrDesc.putString( keyTextData, txt );
    executeAction( ktextToClipboardStr, textStrDesc, DialogModes.NO );
}
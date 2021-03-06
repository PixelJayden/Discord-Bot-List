function submit() {
    if (!document.getElementById('botid').value)
        return flash(document.getElementById('botid'))
    if (!document.getElementById('prefix').value)
        return flash(document.getElementById('prefix'))
    if (!document.getElementById('description').value)
        return flash(document.getElementById('description'))

    let data = {
        id: document.getElementById('botid').value,
        prefix: document.getElementById('prefix').value,
        description: document.getElementById('description').value,
        invite: document.getElementById('invite').value,
        owners: document.getElementById('owners').value,
        long: CKEDITOR.instances.longdesc.getData()
    };


    fetch(`${window.location.origin}/api/bots/modify`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(body => body.json()).then(body => {
        location.href = body.url;
    })
}

function flash(element) {
    element.scrollIntoView();
    element.style.border = "2px solid #ff0000";
    element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    setTimeout(() => {
        element.style.backgroundColor = "rgba(0, 0, 0, 0)";
        element.style.border = "1px solid #888";
    }, 600)
}

$( document ).ready(async function() {
    let botId = location.href.split(location.host)[1].replace('/bots/edit/', '').replace('/', '');
    $('#auth').click(() => {
        fetch(`/api/auth/${botId}`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Your authorisation token',
                    icon: 'success',
                    html:
                      `Your authorisation token is <code>${data.auth}</code>`,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Close',
                    confirmButtonAriaLabel: 'close',
                  })
            } else {
                Swal.fire({
                    title: 'Your authorisation token',
                    icon: 'error',
                    html:
                      `There was an error with your authorisation token.`,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Close',
                    confirmButtonAriaLabel: 'close',
                  })
            }
        });
    })
    $('#reset').click(() => {
        fetch(`/api/auth/reset/${botId}`)
        .then(res => res.json())
        .then(data => {
            
            if (data.success) {
                Swal.fire({
                    title: 'Your new authorisation token',
                    icon: 'success',
                    html:
                      `Your new authorisation token is <code>${data.auth}</code>`,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Close',
                    confirmButtonAriaLabel: 'close',
                  })
            } else {
                Swal.fire({
                    title: 'Your new authorisation token',
                    icon: 'error',
                    html:
                      `There was an error with your authorisation token.`,
                    showCloseButton: true,
                    focusConfirm: false,
                    confirmButtonText: 'Close',
                    confirmButtonAriaLabel: 'close',
                  })
            }
        });
    });
    CKEDITOR.replace('longdesc', {
        toolbarGroups: [
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others', groups: [ 'others' ] },
            { name: 'about', groups: [ 'about' ] }
        ],
        removeButtons: 'Save,Templates,Cut,Find,SelectAll,Scayt,Form,Checkbox,Replace,NewPage,Preview,Print,Paste,Copy,PasteText,PasteFromWord,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Superscript,Subscript,Outdent,Indent,CreateDiv,Language,BidiRtl,BidiLtr,Unlink,Anchor,Flash,Font,Smiley,PageBreak,SpecialChar,Iframe,FontSize,ShowBlocks,Maximize,About,Format,Styles'
    });
})
CKEDITOR.disableAutoInline = true;
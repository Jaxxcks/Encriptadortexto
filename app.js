document.addEventListener('DOMContentLoaded', () => {
    const inputTexto = document.getElementById('inputTexto');
    const outputTexto = document.getElementById('outputTexto');
    const encriptadoBtn = document.getElementById('encriptadoBtn');
    const desencriptadoBtn = document.getElementById('desencriptadoBtn');
    const BtnCopiar = document.getElementById('BtnCopiar');
    const contenidoDeNoMensajes = document.getElementById('contenidoDeNoMensajes');

    const encryptionRules = {
        'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat'
    };

    const decryptionRules = Object.fromEntries(
        Object.entries(encryptionRules).map(([key, value]) => [value, key])
    );

    function encrypt(text) {
        return text.replace(/[aeiou]/g, letter => encryptionRules[letter]);
    }

    function decrypt(text) {
        return Object.entries(decryptionRules).reduce(
            (acc, [key, value]) => acc.replace(new RegExp(key, 'g'), value),
            text
        );
    }

    function showOutput(text) {
        contenidoDeNoMensajes.style.display = 'none';
        outputTexto.style.display = 'block';
        BtnCopiar.style.display = 'block';
        outputTexto.value = text;
    }

    function showNoMessage() {
        contenidoDeNoMensajes.style.display = 'flex';
        outputTexto.style.display = 'none';
        BtnCopiar.style.display = 'none';
    }

    function processText(operation) {
        const text = inputTexto.value.trim().toLowerCase();
        if (text) {
            const processedText = operation === 'encrypt' ? encrypt(text) : decrypt(text);
            showOutput(processedText);
        } else {
            showNoMessage();
        }
    }

    encriptadoBtn.addEventListener('click', () => processText('encrypt'));
    desencriptadoBtn.addEventListener('click', () => processText('decrypt'));

    BtnCopiar.addEventListener('click', () => {
        outputTexto.select();
        document.execCommand('copy');
    });

    inputTexto.addEventListener('input', () => {
        if (inputTexto.value.trim() === '') {
            showNoMessage();
        }
    });

    showNoMessage();
});

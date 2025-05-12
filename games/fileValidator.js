function validateFileName(fileName) {
    // Правила для проверки имени файла
    const rules = {
        // Нет пробелов в имени
        noSpaces: /^\S+$/,
        // Только разрешенные символы (буквы, цифры, дефис, нижнее подчеркивание)
        allowedChars: /^[a-zA-Z0-9\-_]+\.([a-zA-Z0-9]+)$/,
        // Правильное расширение файла
        validExtensions: ['html', 'css', 'js', 'jpg', 'png', 'webp']
    };

    // Получаем расширение файла
    const extension = fileName.split('.').pop().toLowerCase();

    // Проверяем все правила
    const validations = {
        hasNoSpaces: rules.noSpaces.test(fileName),
        hasValidChars: rules.allowedChars.test(fileName),
        hasValidExtension: rules.validExtensions.includes(extension)
    };

    // Формируем сообщение об ошибках
    const errors = [];
    if (!validations.hasNoSpaces) errors.push('Имя файла не должно содержать пробелы');
    if (!validations.hasValidChars) errors.push('Имя файла содержит недопустимые символы');
    if (!validations.hasValidExtension) errors.push('Недопустимое расширение файла');

    return {
        isValid: Object.values(validations).every(v => v),
        errors: errors,
        fileName: fileName
    };
}

// Пример использования
const testFiles = [
    'index.html',
    'my page.html',
    'script.js',
    'style.css',
    'image.webp',
    'неправильное_имя.exe',
    'valid-name_123.html'
];

testFiles.forEach(file => {
    const result = validateFileName(file);
    console.log(`\nПроверка файла: ${file}`);
    console.log(`Валидный: ${result.isValid}`);
    if (!result.isValid) {
        console.log('Ошибки:', result.errors.join(', '));
    }
});

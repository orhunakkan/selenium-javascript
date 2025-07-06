function formatLogEntry(type, message, timestamp = new Date()) {
    return `[${timestamp.toISOString()}] ${type}: ${message}`;
}

function logToConsole(type, message) {
    const formattedMessage = formatLogEntry(type, message);
    console.log(formattedMessage);
}

export function logConsoleError(driver, testName = 'Unknown Test') {
    return driver.manage().logs().get('browser').then(logs => {
        const errors = logs.filter(log => log.level.name === 'SEVERE');

        if (errors.length > 0) {
            errors.forEach(error => {
                logToConsole(
                    'CONSOLE_ERROR',
                    `Test: ${testName} | Message: ${error.message} | Timestamp: ${error.timestamp}`
                );
            });
        }

        return errors;
    }).catch(error => {
        logToConsole(
            'CONSOLE_ERROR_RETRIEVAL_FAILED',
            `Test: ${testName} | Error: ${error.message}`
        );
        return [];
    });
}

export function logNetworkError(driver, testName = 'Unknown Test') {
    return driver.executeScript(`
        return window.performance.getEntriesByType('navigation').concat(
            window.performance.getEntriesByType('resource')
        ).filter(entry => {
            return entry.transferSize === 0 && entry.decodedBodySize === 0 && entry.duration > 0;
        }).map(entry => ({
            name: entry.name,
            startTime: entry.startTime,
            duration: entry.duration,
            type: entry.entryType
        }));
    `).then(networkErrors => {
        if (networkErrors && networkErrors.length > 0) {
            networkErrors.forEach(error => {
                logToConsole(
                    'NETWORK_ERROR',
                    `Test: ${testName} | Failed Resource: ${error.name} | Duration: ${error.duration}ms | Type: ${error.type}`
                );
            });
        }

        return networkErrors || [];
    }).catch(error => {
        logToConsole(
            'NETWORK_ERROR_RETRIEVAL_FAILED',
            `Test: ${testName} | Error: ${error.message}`
        );
        return [];
    });
}

export function logPageError(driver, testName = 'Unknown Test', customError = null) {
    const promises = [];

    if (customError) {
        logToConsole(
            'PAGE_ERROR',
            `Test: ${testName} | Custom Error: ${customError.message || customError} | Stack: ${customError.stack || 'N/A'}`
        );
    }

    promises.push(
        driver.executeScript(`
            return {
                url: window.location.href,
                title: document.title,
                readyState: document.readyState,
                hasErrors: window.onerror !== null || window.addEventListener !== undefined
            };
        `).then(pageInfo => {
            logToConsole(
                'PAGE_INFO',
                `Test: ${testName} | URL: ${pageInfo.url} | Title: ${pageInfo.title} | Ready State: ${pageInfo.readyState}`
            );
            return pageInfo;
        }).catch(error => {
            logToConsole(
                'PAGE_ERROR_INFO_FAILED',
                `Test: ${testName} | Error: ${error.message}`
            );
            return { error: error.message };
        })
    );

    promises.push(
        driver.executeScript(`
            const errors = [];
            if (window.__pageErrors) {
                errors.push(...window.__pageErrors);
            }
            return errors;
        `).then(jsErrors => {
            if (jsErrors && jsErrors.length > 0) {
                jsErrors.forEach(error => {
                    logToConsole(
                        'PAGE_JS_ERROR',
                        `Test: ${testName} | Error: ${error.message || error} | Line: ${error.lineno || 'N/A'} | Column: ${error.colno || 'N/A'} | Source: ${error.filename || 'N/A'}`
                    );
                });
            }
            return jsErrors || [];
        }).catch(error => {
            logToConsole(
                'PAGE_JS_ERROR_RETRIEVAL_FAILED',
                `Test: ${testName} | Error: ${error.message}`
            );
            return [];
        })
    );

    return Promise.all(promises).then(results => {
        return {
            pageInfo: results[0],
            jsErrors: results[1],
            customError: customError
        };
    });
}

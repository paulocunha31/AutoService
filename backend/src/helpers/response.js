export function success(res, data = null, message = 'Operação realizada com sucesso.', status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
}

export function error(res, message = 'Ocorreu um erro.', status = 400, errors = null) {
    return res.status(status).json({
        success: false,
        message,
        errors,
    });
}
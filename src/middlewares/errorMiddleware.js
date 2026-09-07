function tratarErro(erro, req, res, next) {
    console.error(
      `[ERRO] ${req.method} ${req.originalUrl} - ${erro.message}`
    );
  
    res.status(400).json({
      erro: erro.message
    });
  }
  
  module.exports = {
    tratarErro
  };
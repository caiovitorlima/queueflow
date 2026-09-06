function validarTokenSecretaria(req, res, next) {
    const tokenRecebido = req.headers["x-secretary-token"];
  
    if (!tokenRecebido || tokenRecebido !== process.env.SECRETARY_TOKEN) {
      return res.status(401).json({
        erro: "Acesso não autorizado"
      });
    }
  
    next();
  }
  
  module.exports = {
    validarTokenSecretaria
  };
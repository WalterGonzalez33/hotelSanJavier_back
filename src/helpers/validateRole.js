const authorizeRole = (rolesPermitidos) => {
    return (req, res, next) => {
      if (!rolesPermitidos.includes(req.roll)) {
        return res.status(403).json({ mensaje: 'No tienes permisos para acceder a esta ruta' });
      }
      next();
    };
  };

  export default authorizeRole
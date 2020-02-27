const routes = require('next-routes')

module.exports = routes()
.add('index')
.add('articulos', 'Articulos')
.add('albumes', 'components/Albumes/Albumes')
//.add('detalles', '/:slugPlato.:id', 'PlatoDetalle/PlatoDetalle')
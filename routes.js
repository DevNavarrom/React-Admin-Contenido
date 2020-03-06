const routes = require('next-routes')

module.exports = routes()
.add('index')
.add('articulos', 'Articulos')
.add('albumes', 'components/Albumes/Albumes')
.add('articulo', '/:slugArticulo.:id', 'DetallesArticulo')
.add('album', '/:slugAlbum.:id', 'DetallesAlbum')
//.add('detalles', '/:slugPlato.:id', 'PlatoDetalle/PlatoDetalle')
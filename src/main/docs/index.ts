import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Kanastra C;ean Billing System',
    description: '',
    version: '1.0.0',
    contact: {
      name: 'Rafael Guimarães',
      email: 'rafael.guimaraens@gmail.com',
      url: 'https://www.linkedin.com/in/brodinho'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [
    {
      name: 'Debt',
      description: 'APIs de gerenciamento de inscrições em dívidas ativa'
    }
  ],
  paths,
  schemas,
  components
}

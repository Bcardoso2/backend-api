import Pedido from './Pedido.js';
import PedidoProduto from './PedidoProduto.js';
import Produto from './ProdutoModels.js';
import Cliente from './Cliente.js';
import Funcionario from './Funcionario.js';

export default function configureAssociations() {
  // Associações de Pedido
  Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
  Pedido.belongsTo(Funcionario, { foreignKey: 'funcionario_id', as: 'funcionario' });
  Pedido.hasMany(PedidoProduto, { foreignKey: 'pedido_id', as: 'produtosRelacionados' });

  // Associações de PedidoProduto
  PedidoProduto.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedidoDetalhes' });
  PedidoProduto.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
}

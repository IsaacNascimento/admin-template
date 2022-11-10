import React from 'react';
import { Badge } from 'reactstrap';

const BadgeProdutoColor = {
  agendado: 'secondary',
  ativo: 'success',
  inativo: 'danger',
  'venda encerrada': 'warning',
};

const BadgeProduto = ({ status }) => (
  <Badge color={BadgeProdutoColor[status]}>{status}</Badge>
);

const BadgeSituacaoPropostaColor = {
  criada: 'success',
  'nao criada': 'danger',
};

const BadgeProposta = ({ status }) => (
  <Badge color={BadgeSituacaoPropostaColor[status]}>{status}</Badge>
);

const BadgeSituacaoParceiroColor = {
  ativo: 'success',
  inativo: 'danger',
};

const BadgeParceiro = ({ ativo }) => (
  <Badge color={BadgeSituacaoParceiroColor[ativo]}>{ativo}</Badge>
);

const BadgePropostaPosVendaColor = {
  concluído: 'success',
  erro: 'danger',
  solicitado: 'secondary',
  'em execução': 'warning',
};

const BadgePropostaPosVenda = ({ status }) => (
  <Badge color={BadgePropostaPosVendaColor[status]}>{status}</Badge>
);

export { BadgeProduto, BadgeParceiro, BadgeProposta, BadgePropostaPosVenda };

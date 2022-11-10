import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { priceFormatter } from '../../../utils/helpers';

export const OpenModal = ({ propostaPosVenda }) => {
  console.log('[AQUI]: ', propostaPosVenda.beneficios);
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const gerarLista = () => {
    const arr = propostaPosVenda.beneficios;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].contratos.length > 0) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  };
  return (
    <>
      <Button className="btn-sm mb-0" onClick={handleModal}>
        Abrir
      </Button>
      <Modal size="lg" isOpen={isOpen} toggle={handleModal}>
        <ModalHeader>Benefícios do Cliente</ModalHeader>
        <ModalBody>
          {gerarLista()}
          {propostaPosVenda.beneficios.map((beneficio) => (
            <>
              <div key={beneficio.numeroBeneficio}>
                <p className="text-left">
                  <strong>Benefício: </strong>
                  {beneficio.numeroBeneficio}
                </p>
                {(beneficio.contratosCartao?.length === 0 && (
                  <>
                    <p className="text-left text-sem-contratos-modal">
                      Não há contratos para o número de benefício{' '}
                      {beneficio.numeroBeneficio}
                    </p>
                    <hr />
                  </>
                )) || (
                  <Table striped hover responsive className="tabela-jogos">
                    <thead className="bg-accent text-white">
                      <tr>
                        <th scope="row">Número</th>
                        <th>Banco</th>
                        <th>Prazo</th>
                        <th>Parcela</th>
                        <th>Valor Liberado</th>
                      </tr>
                    </thead>
                    {beneficio.contratos.map((contrato, key) => (
                      <Fragment key={key}>
                        <tbody>
                          <tr>
                            <th scope="row">{key + 1}</th>
                            <td>{contrato.banco?.nome}</td>
                            <td>
                              {contrato.quantidadeParcelas -
                                contrato.quantidadeParcelasEmAberto}
                              /{contrato.quantidadeParcelas}
                            </td>
                            <td>{priceFormatter(contrato.valorParcela)}</td>
                            <td>{priceFormatter(contrato.valorEmprestado)}</td>
                          </tr>
                        </tbody>
                      </Fragment>
                    ))}
                  </Table>
                )}
              </div>
            </>
          ))}
        </ModalBody>
      </Modal>
    </>
  );
};

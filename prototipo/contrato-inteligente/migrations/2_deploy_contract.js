const { ethers } = require("ethers");
const Moeda = artifacts.require("Moeda");

const { EventEmitter } = require("events");

EventEmitter.defaultMaxListeners = 25;

const Federal = artifacts.require("Federal");
const Estadual = artifacts.require("Estadual");
const Municipal = artifacts.require("Municipal");

const TipoOrgao = {
  FEDERAL: 0,
  ESTADUAL: 1,
  MUNICIPAL: 2,
};

module.exports = async function (
  deployer,
  network,
  [admin, orgaoFederal, orgaoEstadual, orgaoMunicipal, fornecedor, ...rest]
) {
  await deployer.deploy(Moeda);
  const moeda = await Moeda.deployed();

  await deployer.deploy(Federal, moeda.address);
  const federal = await Federal.deployed();

  await deployer.deploy(Estadual, moeda.address);
  const estadual = await Estadual.deployed();

  await deployer.deploy(Municipal, moeda.address);
  const municipal = await Municipal.deployed();

  await federal.adicionarPermissaoOrgao(orgaoFederal);
  await federal.adicionarPermissaoFornecedor(fornecedor);

  await estadual.adicionarPermissaoOrgao(orgaoEstadual);
  await estadual.adicionarPermissaoFornecedor(fornecedor);

  await municipal.adicionarPermissaoOrgao(orgaoMunicipal);
  await municipal.adicionarPermissaoFornecedor(fornecedor);

  await federal.setContrato(TipoOrgao.ESTADUAL, federal.address);
  await federal.setContrato(TipoOrgao.MUNICIPAL, municipal.address);

  await estadual.setContrato(municipal.address);

  await moeda.transfer(federal.address, ethers.parseEther("1000000000"));
  await moeda.transfer(estadual.address, ethers.parseEther("1000000000"));
  await moeda.transfer(municipal.address, ethers.parseEther("1000000000"));

  await federal.setValorArrecadado();
  await estadual.setValorArrecadado();
  await municipal.setValorArrecadado();

  // await federal.distribuir(ethers.parseEther("10000000000"), 1, "Teste", { from: orgao });
};
